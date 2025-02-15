import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CoursesTable from './CoursesTable';
import { fetchInstructorCourses } from '../../Services/operations/courseDetailAPI';

const MyCourse = () => {

  const {token} = useSelector((state)=>state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(()=>{
    const fetchCourses = async()=>{
        const result = await fetchInstructorCourses(token);
        if(result){
            setCourses(result)
        }
    }
    fetchCourses();
  },[])

  return (
    <div className=' text-white mx-auto w-11/12 flex flex-col ml-60 gap-6'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold leading-[2.375rem] text-slate-50 mb-10'>My Courses</h1>
        <button className='rounded-[8px] bg-yellow-300 py-[8px] px-[12px] h-12 flex items-center justify-center font-medium text-slate-900' onClick={()=>navigate("/dashboard/add-course")}>
            Add Course
        </button>
      </div>

      { courses && <CoursesTable courses={courses} setCourses={setCourses}/>}

    </div>
  )
}

export default MyCourse
