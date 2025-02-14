const category = require("../models/category");
const Tag = require("../models/category"); // here Tag is equal to category
const { populate } = require("../models/Course");
const { patch } = require("../routes/courseRoutes");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async(req,res)=>{// tag are those which contains various sections for ex python c++ whereas pyhton tag includes courses related to the python
    try{
     // fetching data from the req body
     const {name,description}= req.body;
     console.log(name);
     // validating the data
     if(!name || !description){
        return res.status(400).json({
            success:false,
            message:"Please fill All the Details"
        })
     }
     // creating entry into the db
     const tagDetails = await Tag.create({
        name:name,
        description:description,
     })
     console.log(tagDetails);
     

     // return response 
     return res.status(200).json({
        success:true,
        message:"Category Created Successfully"
     })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get all tags
exports.showAllCategory = async(req,res)=>{
   try{
    const allTags = await Tag.find({},{name:true},{description:true});// name:true daalne k mtlb ki mera output name and desc. compulsory hai aana
    return res.status(200).json({
        success:true,
        message:"All Tags Are Here",
        allTags
    })
   }
   catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
   }
}

// categoryPageDetails
exports.categoryPageDetails = async(req,res)=>{
    try{
      // get categoryId 
      const {categoryId} = req.body;
      // get courses for specified courseId
      const selectedCategory = await Tag.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec()

    //   console.log(selectedCategory)

      // validation
      if(!selectedCategory){
         return res.status(404).json({
            success:false,
            message:"Data Not Found"
         })
      }
      if(selectedCategory.course.length === 0){
        console.log("No couurse is found related to this category")
        return res.status(404).json({
            success:false,
            message:"No couurse is found related to this category"
         })
      }
      // get course for different categories
      const categoriesExceptSelected = await Tag.find({
        _id:{$ne:categoryId}// ne means not included
      })
    //   console.log(categoriesExceptSelected)
      const differentCategories = await Tag.findOne(categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id).populate({
        path:"course",
        match:{ status: "Published" }
      }).exec();

      //get top selling courses
      const allCategories = await Tag.find().populate({
        path:"course",
        match:{ status: "Published" },
        populate:{
            path:"instructor",
        }
      })

      const allCourses = allCategories.flatMap((category)=>category.courses);
      const mostSellingCourses= allCourses.sort((a,b)=>b.sold -a.sold).slice(0,10);

      //return response
      return res.status(200).json({
         success:true,
         data:{
            selectedCategory,
            differentCategories,
            mostSellingCourses
         },
      })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}