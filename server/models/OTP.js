const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");
const OTPSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*90000,
    }
});

//function to send mail just before running the code of OTP.create mtlb ki db mh save hona se pehle jo hai humlog otp bheja mail par phir mera otp 
// save hua db mh then humlog jo hai mail mh se otp dekh kar otp daale aur woh otp ko coMPARE kiya gya mera db mh jo sabved otp hai usmh se..

async function sendVerificationEmail(email,otp){ 
    try{
      const mailResponse = await mailSender(email, "Verification email from Ednexx", otp);
      console.log("Email sent successfully", mailResponse);
    }
    catch(error){
      console.log("error occured while sending mail",error);
      throw error;
    }
}

OTPSchema.pre("save",async function(next){
   await sendVerificationEmail(this.email,this.otp);// otp ko db mh save kna se phle hmlog verify knga mail ko then hi hmlog otp ko db mh save knga ..
   next();// next is used to go to the next middleware
});

module.exports= mongoose.model("OTP",OTPSchema);