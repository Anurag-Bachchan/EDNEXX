import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { profile } from "../apis";

export async function getUserEnrolledCourses (token){
  // console.log(token)
   const toastId = toast.loading("Loading..");
   let result = [] ;
   try{
        const response = await apiConnector("GET", profile.ENROLLED_COURSES ,null, 
            {
                Authorisation: `Bearer ${token}`
            }  
        )

        console.log(response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }

       result = response.data.data; 
      //  console.log(result);

   } catch(error){
      console.error(error.message);
      toast.error("Not getting the Enrolled Courses")
   }

   toast.dismiss(toastId);
   return result;
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
      const response = await apiConnector("GET",profile.GET_INSTRUCTOR_DATA_API, null, 
      {
        Authorisation: `Bearer ${token}`,
      })
  
      console.log("GET_INSTRUCTOR_API_RESPONSE", response);
      result = response?.data?.courses
  
    }
    catch(error) {
      console.log("GET_INSTRUCTOR_API ERROR", error);
      toast.error("Could not Get Instructor Data")
    }
    toast.dismiss(toastId);
    return result;
  }