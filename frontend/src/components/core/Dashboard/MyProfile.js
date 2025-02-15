import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { FiEdit } from "react-icons/fi";

const MyProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.profile) ;
  return (
    <div className='text-white mx-auto w-11/12 flex flex-col ml-60 gap-6'>
      
      <h1 className='text-3xl font-semibold leading-[2.375rem] text-slate-50 mb-10'>My Profile</h1>

      <div className='flex gap-48 bg-slate-900 p-7 w-[550px]'>
        <div className=' flex flex-col gap-2'>
            <img src={user.image}
            className='rounded-full aspect-square object-cover w-[78px] mb-2'/>
            <div className='flex flex-col'>
              <p>{user.firstName +" "+ user.lastName}</p>
              <p>{user.email}</p>
            </div>
        </div>

        <div className='flex items-center justify-center'>
        <IconBtn text="Edit" children={<FiEdit/>} onclick={()=>{
            navigate("/dashboard/settings")
        }}/>
        </div>

      </div>

      <div className='flex gap-48 bg-slate-900 p-7 w-[550px]'>
        <div className='p-3'>
            <p className='text-lg font-semibold leading-[2.375rem] text-slate-50 mb-10'>About</p>
            <p>{user.additionalDetails.about ?? "Write Something about Yourself"}</p>
        </div>
        <div className='mr-20 mt-10'>
        <IconBtn text="Edit" children={<FiEdit/>} onclick={()=> {
                navigate("/dashboard/settings")
            }}/>
        </div>
      </div>
       
      <div className='flex flex-col gap-8 bg-slate-900 p-7 w-[550px]'>
        <div className='flex gap-48 '> 
           <p className='text-lg font-semibold leading-[2.375rem] text-slate-50 mb-10'>Personal Details</p>
           <IconBtn text="Edit" children={<FiEdit/>}  onclick={()=> {
                navigate("/dashboard/settings")
            }}/>
        </div>
        <div className='flex  gap-24'>
          <div className='flex flex-col gap-4'>
            <div>
            <p className='text-sm font-semibold leading-[2.375rem] text-slate-50 '>First Name</p>
            <p>{user.firstName}</p>
            </div>
            <div >
            <p  className='text-sm font-semibold leading-[2.375rem] text-slate-50 '>Last Name</p>
            <p>{user.lastName}</p>
            </div>
            <div>
            <p  className='text-sm font-semibold leading-[2.375rem] text-slate-50 '>Gender</p>
            <p>{user.additionalDetails.gender ?? "Add Gender"}</p>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <div>
            <p  className='text-sm font-semibold leading-[2.375rem] text-slate-50 '>Email</p>
            <p>{user.email}</p>
            </div>
            <div>
            <p  className='text-sm font-semibold leading-[2.375rem] text-slate-50 '>Contact Number</p>
            <p>{user.additionalDetails.contactNumber ?? "Add Your Contact Number"}</p>
            </div>
            <div>
            <p  className='text-sm font-semibold leading-[2.375rem] text-slate-50 '>Date of Birth</p>
            <p>{user.additionalDetails.dateOfBirth ?? "Add Your Date of Birth"}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MyProfile
