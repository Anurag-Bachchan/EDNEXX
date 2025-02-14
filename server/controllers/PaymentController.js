const { default: mongoose } = require("mongoose");
const {instance}= require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const {mailSender} = require("../utils/mailSender");
const crypto= require("crypto");
const CourseProgress = require("../models/CourseProgress");

// capture the payment and initiate the razorpay order
exports.capturePayment = async(req,res)=>{
    // get courseID and UserID
    const {courses}= req.body;
    // console.log(courses,"ran")
    const userId= req.user.id;
    // validation
    // valid courseID
    if(courses.length==0){
        return res.json({
            success:false,
            message:"Please provide valid coursre ID"
        })
    }
    
    let totalAmount=0;

    for(const course_id of courses){
        let course;
        try{
            course= await Course.findById(course_id);
            if(!course){
                return res.status(404).json({
                    success:false,
                    message:"Could not find the course"
                })
            }
            console.log(course,"ram")
        
        // user already pay for the same course
        const uid= new mongoose.Types.ObjectId(userId);// conversion of uid from string to object
        if (course.studentsEnrolled.includes(uid)) // checking that user or student is already involved or not 
        {
            return res.status(403).json({
            success:false,
            message:"Student is already enrolled"
            })
        }
            
            totalAmount+=course.price;
            // console.log(totalAmount,"joo")
        }
    
        catch(error){
            console.error(error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
    // order create
    const currency ="INR"

    const options= {
        amount:totalAmount*100,
        currency,
        receipt: Math.random(Date.now()).toString(),  // creating a receipt number
        // notes:{
        //     courseId:course_id,
        //     userId,
        // }
    }

    try{
        // initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        // console.log(paymentResponse,"hii");
        // return response
        return res.status(200).json({
            success:true,
            // courseName:course.courseName,
            // courseDescription: course.courseDescription,
            // thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount:paymentResponse.amount
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
          })
    }
  }

//verify the payment 
exports.verifyPayment= async(req,res)=>{
    const razorpay_order_id= req.body?.razorpay_order_id;
    const razorpay_payment_id= req.body?.razorpay_payment_id;
    const razorpay_signature= req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId= req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || ! courses || !userId){
        return res.status(200).json({
            success:false,
            message:"Payment Failed"
        })
    }

    let body= razorpay_order_id+"|"+ razorpay_payment_id;
    const expectedSignature= crypto
          .createHmac("sha256",process.env.RAZORPAY_SECRET)
          .update(body.toString())
          .digest("hex");

        if(expectedSignature === razorpay_signature){
            //enroll karwao student ko
            await enrollStudents(courses,userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }

        return res.status(200).json({success:"False",
             message:"Payment Failed"
        })
}

const enrollStudents= async(courses,userId, res)=>{

    try{
    
    if(!courses || !userId){
            return res.status(400).json({
               success:false,
               message:"Please provide data for courses or UserID"
            })
       }
       
    for(const courseId of courses){
        //find the course and enroll the student in it
        const enrolledCourse= await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true}
        )

        if(!enrolledCourse){
            return res.status(500).json({
                success:false,
                message:"Course not found"
            });
        }
        
        const courseProgress = await CourseProgress.create({
            courseID:courseId,
            userId:userId,
            completedVideos:[]
        })
        //find the student and add the course to their list of enrolledcourses
        const enrolledStudent=await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId,
                courseProgress: courseProgress._id
            }},
            {new:true}
        )

        // bache ko mail send kardo
        const emailResponse= await mailSender(
            enrollStudents.email,
            `Sucessfully Enrolled into ${enrolledCourse.courseName}`,
            // courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
        )

        // console.log("Email Sent Successfully", emailResponse.response);
    }
    
}
    catch(error){
      console.log(error);
      return res.status(500).json({
        success:false,
        message:error.message
      })
}
}

exports.sendPaymentSuccessEmail= async(req,res)=>{
    const {orderId, paymentId, amount} =req.body;

    const userId= req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
         return res.status(400).json({
            success:false,
            message:"Please provide all the fields"
         });
    }

    try{
       //student ko dhundh
       const enrolledStudent= await User.findById(userId);
       await mailSender(
         enrolledStudent.email,"Regarding Purchase of the Course from Ednexx",
         `Payment Recieved of ${enrolledStudent.firstName} of ${amount/100}. So the Order Id is ${orderId} and Payment Id is ${paymentId}`
       )
    }
    catch(error){
       console.log("error in sending mail", error)
       return res.status(500).json({
          success:false,
          message:"Could not send email"
       })
    }
}

// use kia webhook for course and for multiple course we use above code
// // verify signature of Razorpay and Server
// // payment toh hogya ab yh authorise kna ka liya k shi mh hogya hai hmlog ka webhook jo h active knga verify signature api ko and yh verify knga ki
// // jo razorpay ka secret tha and jo server par secret tha woh match kar rha hai ki nhi 
// exports.verifySignature= async(req,res)=>{
//    const webhookSecret="12345678"; // yh mera server wala secret hai

//    const signature = req.headers("x-razorpay-signature");// yh mera secret jo hai woh hai jo ki bheja gaya hai razorpay k through aur yh mera header mh rhta hai

//    const shasum = crypto.createHmac("sha256", webhookSecret); // Hmko jo hai woh mer hashing algo hai jo algo type leta hai ki kaun sa algo use kna hai and secret key lta hai saath mh for encryption
//    shasum.update(JSON.stringify(req.body)); // converting into string
//    const digest = shasum.digest("hex")// dekh encryption k baad jo mera term aata hai usko hum digest bolta hai aur woh hexa mh terms hota hai

//    if(signature === digest){// yh mera compare kar rha hai secrets ko aur yh ho jana matlab ki mera payment authorize hona ki complete ho gya hai payment and uska baad mera action hoga ki ab enroll kna hai uss student ko uss course mh
//       console.log("Payment is Authorised");

//       const {courseId, userId}= req.body.payload.payment.entity.notes; // dekh yh mera jo req hai woh frontend s nh aa kar razorpay se aaya hai aur woh hit kiya hai verify signature wala route ko isliy humlog ek notes bnaye tha upar ussi mh se course and user id nikalenge

//       try{
//         // fulfill the action

//         // find the course and enroll the student in it
//         const enrolledCourse = await Course.findOneAndUpdate(
//             {_id:courseId},
//             {$push:{studentsEnrolled: userId}},
//             {new:true}
//         )

//         if(!enrolledCourse){
//             return res.status(500).json({
//                 success:false,
//                 message:'Course not Found',
//             })
//         }

//         console.log(enrolledCourse);

//         // find the student and add the course to their list enrolled courses mh
//         const enrolledStudent = await User.findOneAndUpdate(
//             {_id:userId},
//             {$push:{courses: courseId}},
//             {new:true}
//         )

//         console.log(enrolledStudent);

//         // mail send kar doh confirmation wala using template type kar lena tempelate and add kr dna tempelate ko**
//         const emailResponse= await mailSender(
//             enrolledStudent.email,
//             "Congratulation from StudyNotion",
//             " congratulations, you are onboarded into new Course"
//         )

//         console.log(emailResponse);
//         return res.status(200).json({
//             success:true,
//             message:"Signature verified and Course Added"
//         })
//       }
//       catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message
//           })
//       }
//    }
//    else{
//      return res.status(400).json({
//         success:false,
//         message:"Invalid Request"
//      })
//    }
// };