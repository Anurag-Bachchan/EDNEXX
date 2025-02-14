const express = require("express");
const router = express.Router();

const {createRating, getAverageRating, getAllratingAndReview } = require("../controllers/ratingAndReview");
const {createSection, updateSection, deleteSection} = require("../controllers/Section");
const {categoryPageDetails, createCategory, showAllCategory} = require("../controllers/Category");
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/Subsection");
const { auth, isStudent, isInstructor, isAdmin } = require("../middlewares/auth");
const { updateCourseProgress } =require("../controllers/courseProgress")
const { createCourse, showAllCourses, getCourseDetails, editCourse, getInstructorCourses, deleteCourse, getFullCourseDetails} = require("../controllers/Course");

//ROUTES FOR COURSE

//COURSES CAN BE CREATED ONLY BY THE INSTRUCTORS
router.post("/createCourse", auth, isInstructor, createCourse)
//edit a course
router.post("/editCourse", auth, isInstructor, editCourse);
//get instructor course
router.get("/getInstructorCourses",auth,isInstructor, getInstructorCourses);
//delete a course 
router.post("/deleteCourse",auth,isInstructor, deleteCourse)
//add a section to the Course
router.post("/addSection", auth, isInstructor, createSection);
//update a section
router.post("/updateSection", auth, isInstructor, updateSection);
//Delete a section
router.post("/deleteSection",auth, isInstructor, deleteSection);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Get Details for a Specific Courses
router.post("/getFullCourseDetails",auth,getFullCourseDetails);
// getFullCourseDetails
// INSTRUCTOR ONLY WILL CREATE THE SUBSECTION
router.post("/addSubSection",auth, isInstructor, createSubSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

//ROUTES FOR CATEGORY
router.post("/createCategory",createCategory);
router.get("/showAllCategories", showAllCategory);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ROUTES FOR RATING AND REVIEW
router.post("/createRating" ,auth, isStudent, createRating );
router.get("/getAverageRating", getAverageRating);
router.get("/getAllratingAndReview", getAllratingAndReview);

module.exports = router;