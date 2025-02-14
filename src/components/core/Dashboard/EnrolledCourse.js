import React, { useEffect, useState } from 'react';
import { getUserEnrolledCourses } from '../../Services/operations/profileAPI';
import { useSelector } from 'react-redux';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourse = () => {

const {token} = useSelector((state)=>state.auth);
const navigate = useNavigate()
const [enrolledCourses, setEnrolledCourses ]= useState(null);

const getEnrolledCourses = async() =>{
    try{
       const response = await getUserEnrolledCourses(token);
      //  console.log(response);
       setEnrolledCourses(response);
    }
    catch(error)
    {
        console.log("Unable to Fetch Enrolled courses")
    }
}

useEffect(()=>{
  getEnrolledCourses();
},[])

  return (
  <div className='text-white mx-auto w-11/12 flex flex-col ml-60 gap-6'>
    <div className='text-3xl font-semibold leading-[2.375rem] text-slate-50 mb-7 ml-7'>Enrolled Courses</div>
    {
      !enrolledCourses ? (
          <div>
          Loading...</div>
      ) :  !enrolledCourses.length ? (<p className="grid h-[10vh] w-full place-content-center text-slate-50"> You have not enrolled in any course yet</p>) :
      
      (
          <div className="my-8 text-slate-50">
              <div className="flex rounded-t-lg bg-slate-500 ">
                 <p className="w-[45%] px-5 py-3">Course Name</p>
                 <p className="w-1/4 px-2 py-3">Duration</p>
                 <p className="flex-1 px-2 py-3">Progress</p>
              </div>
              {
                  enrolledCourses.map((Course, i, arr)=>(
                      <div  className={`flex items-center border border-slate-700 ${
                            i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                            }`}
                             key={i}>
                          <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                             onClick={() => {
                                navigate(
                                  `/view-course/${Course?._id}/section/${Course.courseContent?.[0]?._id}/sub-section/${Course.courseContent?.[0]?.subSection?.[0]?._id}`
                                )
                              }}>
                              <img src={Course.thumbnail}  className="h-16 w-16 rounded-lg object-cover"/>
                              <div className="flex max-w-xs flex-col gap-2">
                                    <p className="font-semibold">{Course.courseName}</p>
                                    <p className="text-xs text-slate-300">
                                        {Course.courseDescription.length > 50
                                        ? `${Course.courseDescription.slice(0, 50)}...`
                                        : Course.courseDescription}
                                    </p>
                             </div>
                          </div>

                          <div className="w-1/4 px-2 py-3">
                             8 hrs
                          </div>

                          <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                            <p>Progress : {Course.progressPercentage || 0}%</p>
                            <ProgressBar 
                             completed={Course.progressPercentage || 0}
                             height="8px"
                             isLabelVisible={false}/>
                          </div>
                      </div>
                  ))
              }
          </div>
      )    
    } 
  </div>
 )
}

export default EnrolledCourse
