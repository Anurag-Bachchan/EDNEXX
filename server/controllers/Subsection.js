const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../models/Section");
                                     
require("dotenv").config(); 

// create Subsection
exports.createSubSection = async(req,res)=>{
    try{
      // fetch data from req body
      const {sectionId, title, description }= req.body;
      // extract file/video
      const video = req.files.video;
      // console.log(req.body);
      // console.log(req.files);

      // validation
      if(!sectionId || !title  || !description){
         return res.status(400).json({
            success:false,
            message:"All fields are required"
         })
      }

      // upload video on cloudinary
      const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
      // cnsole.log(uploadDetails);o

      // create a subsection
      const SubSectionDetails = await SubSection.create({
        title:title,
        timeDuration: `${uploadDetails.duration}`,
        description:description,
        videoUrl:uploadDetails.secure_url,
      })

      // update section with this subsection id
      const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
         {
            $push:{
               subSection:SubSectionDetails._id 
            }
         },
         {new:true}
      ).populate("subSection");

      // return response
        return res.status(200).json({
        success:true,
        message:"SubSection Creation Is Successfull",
        data:updatedSection
       })
    }
    catch(error){
      console.log(error)
      return res.status(500).json({
      success:false,
      message:"SOME PROBLEM CREATED WHILE CREATING A NEW SUBSECTION",
      error:error.message,
    })
}}

exports.updateSubSection = async (req, res) => {
   try {
     const { sectionId, subSectionId, title, description } = req.body
     const subSection = await SubSection.findById(subSectionId)
 
     if (!subSection) {
       return res.status(404).json({
         success: false,
         message: "SubSection not found",
       })
     }
 
     if (title !== undefined) {
       subSection.title = title
     }
 
     if (description !== undefined) {
       subSection.description = description
     }
     if (req.files && req.files.video !== undefined) {
       const video = req.files.video
       const uploadDetails = await uploadImageToCloudinary(
         video,
         process.env.FOLDER_NAME
       )
       subSection.videoUrl = uploadDetails.secure_url
       subSection.timeDuration = `${uploadDetails.duration}`
     }
 
     await subSection.save()
 
     // find updated section and return it
     const updatedSection = await Section.findById(sectionId).populate(
       "subSection"
     )
 
     console.log("updated section", updatedSection)
 
     return res.json({
       success: true,
       message: "Section updated successfully",
       data: updatedSection,
     })
   } catch (error) {
     console.error(error)
     return res.status(500).json({
       success: false,
       message: "An error occurred while updating the section",
     })
   }
 }
 
 exports.deleteSubSection = async (req, res) => {
   try {
     const { subSectionId, sectionId } = req.body
     await Section.findByIdAndUpdate(
       { _id: sectionId },
       {
         $pull: {
           subSection: subSectionId,
         },
       }
     )
     const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
 
     if (!subSection) {
       return res
         .status(404)
         .json({ success: false, message: "SubSection not found" })
     }
 
     // find updated section and return it
     const updatedSection = await Section.findById(sectionId).populate(
       "subSection"
     )
 
     return res.json({
       success: true,
       message: "SubSection deleted successfully",
       data: updatedSection,
     })
   } catch (error) {
     console.error(error)
     return res.status(500).json({
       success: false,
       message: "An error occurred while deleting the SubSection",
     })
   }
 }