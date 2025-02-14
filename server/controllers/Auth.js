const User= require("../models/User");
const OTP= require("../models/OTP");
const otpgenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
const {mailSender} = require("../utils/mailSender");

require("dotenv").config();

// send otp
exports.sendOTP = async(req,res)=>{
    try{

        // fetch email from the req body
        const {email}= req.body;
        
        // check if user already exist
        const checkUserPresent = await User.findOne({email});

        // if user already exist , then return a response
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already exist"
            })
        }

        // if not registered then generate otp
        var otp = otpgenerator.generate(6,{ // otp 6 length ka 
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
            })
        console.log("OTP generated:",otp);
        
        // check unique otp or not 
        const result = await OTP.findOne({otp:otp});

        // if otp exist then we repetadely create otp until we get the unique otp

        while(result){
            otp = otpgenerator.generate(6,{ // otp 6 length ka 
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = await OTP.findOne({otp:otp});
        }

        const otpPayload ={email, otp};
        
        //now create an entry for otp
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);
                                     
        //return response successful
        res.status(200).json({
            success:true,
            message:"OTP sent successfully"
        })
    
    }
    catch(error){
       console.log(error);
       return res.status(500).json({
         success:false,
         message:error.message,
       })
    }
}

//signup
exports.signup= async(req,res)=>{
try{
       // data fetch from request body
    const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp} = req.body;
    console.log("OTP",otp);
   
    // validate krlo 
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            message:"All fields are required"
        })
    }

    // 2 password match karlo
    if(password !== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password and confirmPassword does not match, please try again"
        })
    }

    // check user already exist or not 
    const userExist= await User.findOne({email});


    if(userExist){
        res.status(400).json({
            success:false,
            message:"User Already Exist",
        })
    }

    //find most recent otp stored for the user 
    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log("recentotp",recentOtp);
    // validate OTP

   // Assume recentOtp and otp are defined and available in the scope
if (recentOtp.length === 0) {
    // OTP not found
    return res.status(400).json({
        success: false,
        message: "OTP NOT FOUND"
    });
} else if (otp !== recentOtp[0].otp) {
    // Invalid OTP
    return res.status(400).json({
        success: false,
        message: "INVALID OTP"
    });
} else {
    // Valid OTP
    console.log("Valid OTP")
}

    //Hash password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);

    const profile= await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null
    })
    //entry create in db
    const user = await User.create({
        firstName, lastName, email, contactNumber, password:hashedPassword, accountType, additionalDetails:profile._id, 
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    });

    // return res
    return res.status(200).json({
        success:true,
        message:"User is registered successfully",
        user,
    })
  }
    catch(error){
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"User cannot be registerd.Please try again"
       })
    }
}

//login
exports.login = async(req,res) =>{
    try{
       // get data from req body
        const {email,password} = req.body;
     
       // validation data
       if(!email || !password){
          return res.status(403).json({
            success:false,
            message:"All fields are required,Please try again"
          })
       }
       // user check exist or not 
       const user= await User.findOne({email});
       if(!user){
         return res.status(400).json({
            success:false,
            message:"First Signup to Login"
         })
       }
       // generate JWT ,after password matching
       if( await bcrypt.compare(password,user.password)){
           const payload = {
            email:user.email,
            id:user._id,
            accountType:user.accountType,
           }
           const token = jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn:"2h", 
           })

           user.token= token;
           user.password = undefined;
    
           // create cookie and send response 
           const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000), // yh bata rha hain ki mera cookie jo hai woh wxpire ho jayega 3 days mh 
            httpOnly:true,
           }
    
           res.cookie("token",token, options).status(200).json({
            success:true,
            token,
            user,
            message:"User loggedin successfully"
           })
       }
       else{
        return res.status(401).json({
            success:false,
            message:"Password is Incorrect"
        })
       }
    }
    catch(error){
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"Login failure, please try again"
       });
    }
}

exports.changePassword = async(req,res)=>{// double check because it's not sure 
   try{
    // get data from req body
    const{ email }= req.body;
    const user = await User.findOne({email});
    // get oldPasssword, newPassword , confirmPassword
    const {oldPassword, newPassword , confirmPassword}= req.body;

    // validation
    if( !oldPassword || !newPassword || !confirmPassword){
        return res.status(400).json({
            success: false,
            message : "All fields are required"
        })
    }

    // checking the passwords
    if( oldPassword !== user.password || newPassword !== confirmPassword){
        return res.status(400).json({
            success: false,
            message : "Passwords are not Matching"
        })
    }

    // update pwd in db
    const updatedPassword = await User.findByIdAndUpdate(
        {_id:user.id},
        {password:confirmPassword},
        {new:true})

    // send mail of password updated
    await mailSender(email,"Regard Password Change","Password Changed Successfully");
     
    // return response
    return res.status(200).json({
        success:false,
        message:"Password Changed Successfully"
    })
   }
   catch(error){
    console.log(error);
       return res.status(500).json({
        success:false,
        message:"Password Change is Unsuccessfull"
       });
    }
}

exports.contactUs= async(req,res)=>{
    try{
      // get data from req body
      const{ email , message }= req.body;

      // validation
      if( !email){
        return res.status(400).json({
            success: false,
            message : "email is required"
        })
        }

       // send mail of contact
       await mailSender(email,"Related Feedback",message);
     
        // return response
        return res.status(200).json({
        success:true,
        message:"Password Changed Successfully"
    })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
         success:false,
         message:error.message

        });
    }
}