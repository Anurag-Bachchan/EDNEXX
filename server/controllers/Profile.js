const User= require("../models/User");
const Profile = require("../models/Profile");
const CourseProgress= require("../models/CourseProgress")
const Course = require("../models/Course");
const { convertSecondsToDuration } =require("../utils/sec")

exports.updateProfile =async(req,res)=>{
    try{
       // get data
       const {gender, dateOfBirth, about, contactNumber}= req.body;
       // get userId from the req body which is included during login in authentication process
       const id = req.user.id;
       // validation
       if(!contactNumber || !gender || !id){
         return res.status(400).json({
            success:false,
            message:"All fields are required"
         });
       }
       //find profile
       const userDetails= await User.findById(id);// sabse pehle user nikal liya 
       const profileId = userDetails.additionalDetails; //dekh bhai phir maine jo hai profile id nikal liya user mh se kyunki user mh profile k id stored hai
       const profileDetails = await Profile.findById(profileId);

       // update Profile
       profileDetails.dateOfBirth=dateOfBirth;
       profileDetails.about= about;
       profileDetails.gender=gender;
       profileDetails.contactNumber=contactNumber;
       await profileDetails.save();// dekh yh skeleton pehle se created tha isliye iss mh save kiya hai create nhi kiya hai

       // return response
       return res.status(200).json({
        success:true,
        message:"Profile Updated Successfully",
        profileDetails
       })
    }
    catch(error){
     console.log(error)
     return res.status(500).json({
     success:false,
     message:"Profile Updation Failed"
   })
    }
}

// delete Account
// find how can we delete the profile after 5 days ?? 
exports.deleteAccount= async(req,res)=>{
   try{
    //get id 
    const id =req.user.id;
    //validation
    console.log("userId:",id);
    const userDetails = await User.findById({id});
    if(!userDetails){
        return res.status(400).json({
            success:false,
            message:"User Not Found"
        })
    }

    // delete profile
    await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
    // TODO : unenroll user from all enrolled Courses ?? 
    // Ans: humlog k hai nh user k id lh kar User ko nikalenge then User mh jitna bhi courses hai user mh unsab course k id nikal kar humlog jo hai uss id k basis par Course k db mh search karke unn sabhi courses se uss user ko unenroll kna padega
    // delete user
    await User.findByIdAndDelete({_id:id});

    // return response
    return res.status(200).json({
        success:true,
        message:"Profile Deleted Successfully"
       })
   }
   catch(error){
    console.log(error)
    return res.status(500).json({
    success:false,
    message:"Profile Deletion Failed"
  })
   }
}

exports.getAllUserDetails = async(req,res)=>{
    try{
      // fetched id 
      const id= req.user.id;
      // validation and get user details
      const userDetails = await User.findById(id).populate("additionalDetails").exec();
      // return response
      return res.status(200).json({
        success:true,
        message:"User Data Fetched Successfullly",
        userDetails
      })
    }
    catch(error){
       return res.status(500).json({
        success:false,
        message:"User Data don't get Fetched"
       })
    }
}

// write controller to update profile pic
exports.getEnrolledCourses = async (req,res)=>{
  try{
    // console.log(req.user)
    const userId = req.user.id;

    const userDetails = await User.findOne({_id:userId}).populate({
      path:"courses",
      populate:{
        path:"courseContent",
        populate:{
          path:"subSection"
        }
      }}).exec();
    // console.log(userDetails,"hhhh")
    // userDetails = userDetails.toObject()
    // console.log(userDetails,"jjjj")
    
  var SubsectionLength = 0;
  for (var i = 0; i < userDetails.courses.length; i++) {
  let totalDurationInSeconds = 0;
  SubsectionLength = 0;

  // Calculate total duration and subsection length
  for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
    totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce(
      (acc, curr) => acc + parseInt(curr.timeDuration),
      0
    );
    SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length;
  }

  // Update total duration
  userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);

  // Fetch course progress
  let courseProgressCount;
  try {
    const progress = await CourseProgress.findOne({
      courseID: userDetails.courses[i]._id,
      userId: userId,
    });
    courseProgressCount = progress?.completedVideos.length || 0;
  } catch (error) {
    console.error("Error fetching course progress:", error);
    courseProgressCount = 0;
  }

  // Calculate progress percentage
  if (SubsectionLength === 0) {
    userDetails.courses[i].progressPercentage = 100;
  } else {
    const multiplier = Math.pow(10, 2);
    userDetails.courses[i].progressPercentage =
      Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) / multiplier;
  }
}

    if(!userDetails){
      return res.status(400).json({
        success:false,
        message:"Could Not Find User with this UserId"
      })
    }

    return res.status(200).json({
      success:true,
      data:userDetails.courses
    })
  }
  catch(error)
  {
    return res.status(500).json({
      success:false,
      message:error.message
     })
  }
}

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
      
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.instructorDashboard = async (req,res) =>{
  try{
    const courseDetails = await Course.find({instructor:req.user.id});
    
    const courseData = courseDetails.map((course)=>{
      const totalStudentsEnrolled= course.studentsEnrolled.length;
      const totalAmountGenerated =totalStudentsEnrolled * course.price;

      //create a new object with the additional fields
      const courseDataWithStats={
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated
      }

      return courseDataWithStats
    })

    res.status(200).json({
      courses:courseData
    })
  }
  catch(error){
    console.log(error);
    res.status(500).json({message:"Internal Server Error"});
  }
}