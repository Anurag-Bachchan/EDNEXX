const RatingAndReviews = require("../models/RatingAndReview");
const Course= require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

//createRating
exports.createRating = async(req,res)=>{
    try{
      // get userID
      const userId = req.user.id;
      // fetch data from req body
      const{rating , review,courseId} = req.body;
      // check if user is enrolled or not 
      const courseDetails = await Course.findOne(
        {_id:courseId,
          studentsEnrolled:{$elemMatch:{$eq:userId}}}
      )
      if(!courseDetails){
        return res.status(404).json({
            success:false,
            message:"Student is not enrolled in the Course"
        })
      }
      // check if user already reviewed the course

      const alreadyReviewed = await RatingAndReview.findOne({
         user:userId,
         course:courseId
      })

      if(alreadyReviewed){
        return res.status(403).json({
            success:false,
            message:"Course is already reviewed by the User"
        })
      }
      // create rating and review
      const ratingReview = await RatingAndReview.create({
            rating,review,
            course: courseId,
            user:userId
      })
      // update course with rating
      await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingReview._id
                }
            },
            {new:true},
      )
      // return response 
      return res.status(200).json({
        success:true,
        message:"Rating and Review created Successfully",
        ratingReview
      })
    }
    catch(error){
       console.log(error)
       return res.status(500).json({
        success:false,
        message:"Problem in Rating And Review"
    })
    }
}

//GetAverageRating
exports.getAverageRating = async(req,res)=>{
    try{
      //get courseID
      const courseId= req.body.courseId;
      // calculate the rating

      const result = await RatingAndReview.aggregate([// function used to find the avg
         {
            $match:{
                coourse: new mongoose.Types.ObjectId(courseId),// converting string into object and finding all rating using this courseId
            },
         }, 
         {
            $group:{
                _id:null, // grouping all rating so used id as null
                averageRating: {$avg: "$rating"}
            }
         }
       ])

       // return rating
       if(result.length > 0){
          return res.status(200).json({
            success:true,
            averageRating: result[0].averageRating,
          })
       }

       // if no rating/review exist
       return res.status(200).json({
        success:true,
        message:"Average rating is 0, no ratings given till now",
        averageRating:0
       })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
         success:false,
         message:error.message,
    })
}
}

// getAllratingAndReview
exports.getAllratingAndReview= async(req,res)=>{
    try{
      const allReviews = await RatingAndReview.find({}).sort({rating:"desc"})
                                             .populate({
                                                path:"user",
                                                select:"firstName lastName email image"// selecting all these items to get there data
                                             })
                                             .populate({
                                                path:"course",
                                                select:"courseName"// selecting all these items using true also and by select
                                             }).exec();
      // return res
      return res.status(200).json({
        success:true,
        meassage:"All reviews fetched Successfully",
        data:allReviews
      })
    } 
    catch(error){
        console.log(error)
        return res.status(500).json({
         success:false,
         message:error.message,
    })
}}