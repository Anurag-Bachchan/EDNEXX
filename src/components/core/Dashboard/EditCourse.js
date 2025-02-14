import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setCourse, setEditCourse } from '../../slices/courseSlice';
import RenderSteps from './AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../Services/operations/courseDetailAPI';

const EditCourse = () => {

  const dispatch = useDispatch();
  const {courseId} =useParams();
  const { course } = useSelector((state) => state.course) 
  const {token} = useSelector((state)=>state.auth)
  const [loading, setLoading] = useState(false);
  // console.log(token)
  // console.log(course)
  useEffect(()=>{
    const populateCourseDetails = async ()=>{
        setLoading(true);
        const result = await getFullDetailsOfCourse(courseId, token);
        if(result.courseDetails){
            dispatch(setEditCourse(true))
            dispatch(setCourse(result.courseDetails))
        }
        setLoading(false);
    }
     
    populateCourseDetails();

    },[])

  

   if(loading){
    return(
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
   }

  return (
    <div className="w-11/12 mx-auto py-10 ml-36 ">
    <h1 className="mb-10 text-4xl font-semibold text-gray-200 text-center">
      Edit Course
    </h1>
    <div className="mx-auto  bg-slate-700 p-6 rounded-xl shadow-lg">
      {course ? (
        <RenderSteps />
      ) : (
        <p className="mt-10 text-center text-2xl font-semibold text-gray-300">
          Course not found
        </p>
      )}
    </div>
  </div>
  
  )
}

export default EditCourse
