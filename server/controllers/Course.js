const Course = require("../models/Course")
const Category = require ("../models/category")
const User = require("../models/User")
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const {convertSecondsToDuration} =require("../utils/sec")
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const CourseProgress = require("../models/CourseProgress")

require("dotenv").config();

//createCourse Handler function
exports.createCourse= async(req,res)=>{
    try{
     // fetch the data
     const {courseName, courseDescription, whatYouWillLearn, price, tag, category, status} = req.body;
    //  console.log(courseName, courseDescription, whatYouWillLearn, price, tag, category);

     //get thumbnailImage
     const thumbnailImage=  req.files.thumbnailImage;
     //validation
     if(!courseName|| !courseDescription|| !whatYouWillLearn || !price || !tag || !thumbnailImage || !category){
        return res.status(400).json({
            success:false,
            message:"Please Fill the All Details"
        })
     }

     // check for instructor after in middleware because course schema has instructor 
     // aur humlog instructor k details nikalenge using decode jo ki pass kiya tha auth middleware mh 
     const userId = req.user.id;
     const instructorDetails = await User.findById(userId);
    //  console.log("Instructor Details:",instructorDetails);

     if(!instructorDetails){
        return res.status(404).json({
            success:false,
            message:"Instructor Details not found"
        });
     }

     //check given tag is valid or not 
     const tagDetails = await Category.findById(category);
     if(!tagDetails){
        return res.status(404).json({
            success:false,
            message:"Tag Details not found"
        });
     }

     // upload Image to cloudinary
     const thumbnailImageImage = await uploadImageToCloudinary(thumbnailImage,process.env.FOLDER_NAME);

     // create an entry for new Course
     const newCourse= await Course.create({
        courseName,
        courseDescription,
        status,
        instructor:instructorDetails._id,
        whatYouWillLearn:whatYouWillLearn,
        price,
        tag,
        category:tagDetails._id,
        thumbnail:thumbnailImageImage.secure_url,
      })

      // update user by adding the new course to the instructor
      await User.findByIdAndUpdate(
        {_id: instructorDetails._id},
        {
            $push:{
                courses:newCourse._id,
            }
        },
        {new:true},
      )

      // update the tag ka schema
      await Category.findByIdAndUpdate(
        {_id:tagDetails._id},
        {
            $push:{
                course:newCourse._id, 
            }
        },
        {new:true},
      )

      // return response
      return res.status(200).json({
        success:true,
        message:"NewCourse created successfully",
        data:newCourse
    })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
         success:false,
         message:"NewCourse does not get added",
         error:error.message
        })
    }
}

//getallcourses handler function
exports.showAllCourses= async(req,res)=>{
    try{
       const allCourses = await Course.find({},
          {
            courseName:true,
            price:true,
            thumbnailImage:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true,
          }
       ).populate("instructor").exec();

        // return response
        return res.status(200).json({
        success:true,
        message:"Data for all courses fetched successfully",
        data:allCourses
    })
    }
    catch(error){
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"Cannot fetch course Data",
        error:error.message
       })

    }
}

exports.getCourseDetails = async(req,res)=>{
    try{
       //get id
       const {courseId}= req.body;
       // find course Details
       const courseDetails = await Course.find(
        {_id:courseId})//populate kra rha hai saaare ko jaise section k andar subsection ko dono ko saath mh populate kra doh
        .populate({
           path:"instructor",
           populate:{
            path:"additionalDetails"// yh jo hai User ka andar tha toh isko aisa populate kraye hai
           }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        // validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Could not find the Course with this ID"
            })
        }

        // return res
        return res.status(200).json({
            success:true,
            message:"Course data fetched successfully",
            data:courseDetails
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
          success:false,
          message:error.message
        })
    }
}

exports.editCourse = async (req,res)=>{
    try{
        const { courseId, thumbnailImage } = req.body;
        const updates = req.body;
        const course = await Course.findById(courseId);
  
        if(!course){
            return res.status(404).json({
                error:"Course not Found"
            })
        }

        // If thumbnailImage Image is found update it
        // if(thumbnailImage){
        //     // console.log("thumbnailImage Update");
        //     const thumbnailImages = thumbnailImage;
        //     const thumbnailImageImage = await uploadImageToCloudinary(
        //         thumbnailImages,
        //         process.env.FOLDER_NAME
        //     )
        //     console.log(thumbnailImageImage)
        //     course.thumbnail = thumbnailImageImage.secure_url;
        // }

        // update only the fields present in the req body
        for ( const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === "tag" || key === "instructions"){
                    course[key]= JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }

        await course.save();

        const UpdatedCourse = await Course.findOne({
            _id: courseId
        }).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            }
        }).populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate:{
                path:"subSection",
            }
        }).exec();

        res.json({
            success: true,
            message:"Course updated Successfully",
            data: UpdatedCourse
        })
    } catch(error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:"Internal Server error",
            error:error.message,
        })
    }
}

exports.getInstructorCourses = async(req,res)=>{
    try{
     // first we will get the instructor id using the user data which is stored after authentication
     const instructorID =  req.user.id;

     // getting data of all tge courses of that particular instructor
     const instructorCourse = await Course.find({instructor: instructorID}).sort({createdAt:-1});
    //  console.log(instructorCourse,"ram")

     return res.status(200).json({
        success: true,
        message:"Course updated Successfully",
        data: instructorCourse
     })
    } catch (error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server error",
            error:error.message,
        })
    }
}

exports.deleteCourse = async(req,res)=>{
    try{
      const {courseId} = req.body;
      console.log(req.body,"ram")

      // find the course
      const course = await Course.findById(courseId)
      if(!course){
        return res.status(404).json({
            message:"Course not Found"
        })
      }

      //enrolled students from the course
      const studentsEnrolled = course.studentsEnrolled;
      for(const studentsId of studentsEnrolled){
        await User.findByIdAndUpdate(studentsId ,{
            $pull: {courses : courseId}
        })
      }

      //Delete sections and subsections
      const courseSections = course.courseContent;
      for(const sectionId of courseSections){
        //delte subsection of the section
        const section = await Section.findById(sectionId)
        if(section){
            const subSections = section.subSection
            for( const subSectionId of subSections){
                await SubSection.findByIdAndDelete(subSectionId);
            }
        }

        //DELETE SECTION
        await Section.findByIdAndDelete(sectionId)
      }

      //delete the course
      await Course.findByIdAndDelete(sectionId)

      
     return res.status(200).json({
        success: true,
        message:"Course deleted Successfully",
     })

    } catch (error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server error",
            error:error.message,
        })
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
    //  console.log(req.body) 
      const userId = req.user.id
      // console.log(userId,"kooo")
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        // .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      // console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }