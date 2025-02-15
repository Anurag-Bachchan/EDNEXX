import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { course, courseEndpoints } from "../apis";

const {
  COURSE_DETAILS_API, COURSE_CATEGORIES_API, GET_ALL_COURSE_API, EDIT_COURSE_API, CREATE_SECTION_API,
  CREATE_SUBSECTION_API, UPDATE_SECTION_API, UPDATE_SUBSECTION_API, DELETE_SECTION_API, DELETE_SUBSECTION_API, GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API, GET_FULL_COURSE_DETAILS_AUTHENTICATED, CREATE_RATING_API, LECTURE_COMPLETION_API
} = courseEndpoints

// get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  // console.log(courseId)
  // console.log("ho")
    // dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorisation: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
    // console.log(result)
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

export async  function fetchCourseCategory () {
  let result = []
  try{
    const response = await apiConnector("GET", course.FETCH_COURSE);
    console.log("FETCH COURSE API...", response);
    
    if(!response.data.success){
        throw new Error(response.data.message)
    }

    result=response.data.allTags;
  }
  catch(error){
     console.log(error.message);
     toast.error("Error in fetching the courses");
    }
   return result;
}

export async  function editCourseDetails (formData, token) {
    let result = null
    const toastId = toast.loading("Loading..")
    try{
      const response = await apiConnector("POST", courseEndpoints.EDIT_COURSE_API, formData,{
        "Content-Type": "multipart/form-data",
        Authorisation: `Bearer ${token}`     
      });
      
      console.log("ADD COURSE API...", response);
      
      if(!response.data.success){
          throw new Error(response.data.message)
      }
  
      result=response?.data?.data;
    }
    catch(error){
       console.log(error.message);
       toast.error("Error in Adding the Course");
      }
     toast.dismiss(toastId)
     return result;
  }

  export async  function addCourseDetails (formData, token) {
    let result = null
    const toastId = toast.loading("Loading..")
    try{
      const response = await apiConnector("POST", course.ADD_COURSE , formData,{
        "Content-Type": "multipart/form-data",
        Authorisation: `Bearer ${token}`     
      });

      console.log("ADD COURSE API...", response);
      
      if(!response.data.success){
          throw new Error(response.data.message)
      }
      result=response;
      toast.success("Course Added Successfully");
    }
    catch(error){
       console.log(error.message);
       toast.error("Error in Adding the Course");
      }
     toast.dismiss(toastId)
     return result;
  }

  export async function deleteCourse(data,token) {
    // console.log(data);
    // console.log(token);
    const toastId = toast.loading("Loading..")
    try{
      const response = await apiConnector("POST", course.DELETE_COURSE ,data, {
        Authorisation: `Bearer ${token}`     
      });

      console.log("DELETE COURSE API...", response);
      
      if(!response.data.success){
          throw new Error(response.data.message)
      }
      toast.success("Course deleted Successfully");
    }
    catch(error){
       console.log(error.message);
       toast.error("Error in deleting the Course");
      }
     toast.dismiss(toastId)
  }

  export async function fetchInstructorCourses(token){
    let result = []
    const toastId = toast.loading("Loading..")
    try{
      const response = await apiConnector("GET", courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API ,null, {
        "Content-Type": "multipart/form-data",
        Authorisation: `Bearer ${token}`     
      });

      console.log("FETCH INSTRUCTOR COURSE API...", response);
      
      if(!response.data.success){
          throw new Error(response.data.message)
      }

      result=response?.data?.data;
    }
    catch(error){
       console.log(error.message);
       toast.error("Error in Fetching Instructor Course");
      }
     toast.dismiss(toastId)
     return result;
  }

  export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
      const response = await apiConnector("POST", COURSE_DETAILS_API, {
        courseId,
      })
      console.log("COURSE_DETAILS_API_RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data
    } catch (error) {
      console.log("COURSE_DETAILS_API_ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    return result;
  }

  // create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}
  
// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}

// create a section
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.updatedCourseDetails
    // console.log(result);
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a section
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a section
export const deleteSection = async (data) => {
  // console.log(data);
  // console.log(data.token)
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorisation: `Bearer ${data.token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
// delete a subsection
export const deleteSubSection = async (data) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorisation: `Bearer ${data.token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a subsection
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a subsection
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorisation: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
