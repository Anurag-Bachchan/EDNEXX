const mongoose= require("mongoose");

const SectionSchema= new mongoose.Schema({
    sectionName:{
        type:String,
    },
    subSection:[// can have multiple subsections so we have used array for that 
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SubSection"
        }
    ]
});

module.exports = mongoose.model("Section",SectionSchema);