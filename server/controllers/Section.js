const Section = require("../models/Section");
const Course= require("../models/Course");
const { findByIdAndUpdate, findByIdAndDelete } = require("../models/User");

// controller to create section
exports.createSection= async(req,res)=>{
    try{
       // data fetch
       const {sectionName, courseId}= req.body;
       // validation
       if(!sectionName || !courseId){
        return res.status(400).json({
            success:false,
            message:"Missing Properties"
        })
        
       }
       // create section
       const newSection = await Section.create({sectionName});
       // update course with section ObjectID
       const updatedCourseDetails= await Course.findByIdAndUpdate(courseId,
           {
             $push:{
                courseContent:newSection._id,
             }
           },
           {new:true}
       ).populate({path:"tag"}).populate({
        path: "courseContent",
        populate:{
            path:"subSection",
        }
       }).exec();

       // use populate to replace sesctions/sub-sections both in the updatedCourseDetails ??


       //return res
       return res.status(200).json({
         success:true,
         message:"NEW SECTION CREATED SUCCESSFULLY",
         updatedCourseDetails
       })
    }
    catch(error){
     console.log(error)
     return res.status(500).json({
      success:false,
      message:"SOME PROBLEM CREATED WHILE CREATING A NEW SECTION",
      error:error.message,
   })
    }
}

exports.updateSection= async(req,res)=>{
    try{
       const{sectionName, sectionId, courseID}= req.body;
       // validation
       if(!sectionName || !sectionId || !courseID){
        return res.status(400).json({
            success:false,
            message:"Missing Properties"
        })
       }

       const course= await Course.findById(courseID).populate({
           path:"courseContent",
           populate:{
            path:"subSection",
           },    
       }).exec();

       // updation in the section and no change in course is needed because it contains sectionId
       const section= await findByIdAndUpdate(sectionId,
         {sectionName},
         {new:true},
       )
       
       // return res
       return res.status(200).json({
        success:true,
        message:"Section Updation Is Successfull",
        data:section
       })
    }
    catch(error){
      console.log(error)
      return res.status(500).json({
      success:false,
      message:"SOME PROBLEM CREATED WHILE UPDATING THE SECTION",
      error:error.message,
   })
    }
}

exports.deleteSection = async(req,res)=>{
    try{
      //get ID - assuming that we are sending ID in params
      // cnst {sectionId}= req.params;o
      const {courseId,sectionId} = req.body;
       // delete from the course
       const updatedCourseDetails= await Course.findByIdAndUpdate(courseId,
        {
          $pull:{
             courseContent:sectionId,
          }
        },
        {new:true}
    )
      // use findByIdAndDelete to delete section
      await Section.findByIdAndDelete(sectionId);
      // return response
      return res.status(200).json({
        success:true,
        message:"Section Deletion Is Successfull",
        data:updatedCourseDetails
       })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
        success:false,
        message:"SOME PROBLEM CREATED WHILE DELETING THE SECTION",
        error:error.message,
     })
    }
}