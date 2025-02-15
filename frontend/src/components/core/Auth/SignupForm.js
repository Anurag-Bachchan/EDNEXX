import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { sendotp } from '../../Services/operations/authAPI';
import { setSignupData } from '../../slices/authSlice';


const SignupForm = () => {

  const tabName =[
    "Student",
    "Instructor"
];
                                            
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers]= useState("Student");
  const [formData, setFormData] =useState({ accountType:users,firstName:"", lastName:"", email:"", password:"", confirmPassword:"" });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {accountType, firstName, lastName, email, password, confirmPassword} = formData ;



  
  const handleOnChange = (e)=> {
    setFormData((prevData) => ({
        ...prevData,
        [e.target.name]:e.target.value
    }))
  }

  const handleOnSubmit = (e)=> {
     e.preventDefault();
     formData.accountType=users;
     dispatch(sendotp (email, navigate));
     dispatch(setSignupData(formData));
  }

  return (
    <form 
      onSubmit={handleOnSubmit}
      className='mt-6 flex w-full flex-col gap-y-4'
    >
      <div className="mt-2 flex flex-row gap-1 rounded-full bg-slate-700 mb-5 border-slate-100 px-2 py-2 w-[227px]">
        {
          tabName.map((element,index)=>(
            <div className={`text-[16px] flex flex-row items-center gap-2 ${users === element ? "bg-slate-900 text-slate-50 font-medium" : "text-slate-200"} 
            rounded-full transition-all duration-200 cursor-pointer hover:bg-slate-900 hover:text-slate-50 px-5 py-2`} 
            onClick={()=>setUsers(element)}>
              {element}
            </div>
          ))
        }
       </div>
      {
          users === "Student" && (
       <div className='flex flex-col gap-4'>
       <div className=' flex gap-6'>
       <label className='w-full'>
        <p className='mb-2 text-[0.875 rem leading-[1.375rem] text-white ml-1'>
           First Name<sup className='text-pink-400'>*</sup>
        </p>
        <input 
          required
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleOnChange}
          placeholder='First Name'
          style={{
            boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className='w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50'/>
      </label>
      <label className='w-full'>
        <p className='mb-2 text-[0.875 rem leading-[1.375rem] text-white ml-1'>
           Last Name<sup className='text-pink-400'>*</sup>
        </p>
        <input 
          required
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleOnChange}
          placeholder='Last Name'
          style={{
            boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className='w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50'/>
      </label>
       </div>
      <label className='w-full'>
        <p className='mb-2 text-[0.875 rem leading-[1.375rem] text-white ml-1'>
            Email Address <sup className='text-pink-400'>*</sup>
        </p>
        <input 
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder='Enter email address'
          style={{
            boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className='w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50'/>
      </label>
      <div className='flex gap-8'>
      <label className='relative w-full'>
        <p className='mb-2 text-[0.875 rem leading-[1.375rem] text-white ml-1'>
            Password <sup className='text-pink-400'>*</sup>
        </p>
        <input 
          required
          type={showPassword ? "text" : "password" }
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder='Enter Password'
          style={{
            boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className='w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50'/>
        <span onClick={()=> setShowPassword((prev) => !prev)} className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
            {
                showPassword ? (
                    <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                ) :
                (
                    <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                )
            }
        </span>
      </label>
      <label className='relative w-full'>
                <p 
                className='mb-2 text-[0.875 rem leading-[1.375rem] text-white ml-1'>Confirm Password<sup className='text-pink-400'>*</sup></p>
                <input
                 required
                 type={showConfirmPassword ? "text" : "password"}
                 name='confirmPassword'
                 value={confirmPassword}
                 placeholder='Enter Confirm Password'
                 style={{
                    boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                 onChange={handleOnChange}
                 className='w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50'/>
                 
                <span onClick={()=> setShowConfirmPassword((prev) => !prev)} className='absolute right-3 top-[38px] z-[10] cursor-pointer' >
                {
                showConfirmPassword ? (
                    <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                ) :
                (
                    <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                )
                }
                </span>
               </label>
              </div>
             </div>
          ) 
  
         
        }
        {
          users === "Instructor" && (

       <div className='flex flex-col gap-4'>
       <div className=' flex gap-6'>
       <label className='w-full'>
        <p className='mb-2 text-[0.875 rem leading-[1.375rem] text-white ml-1'>
           First Name<sup className='text-pink-400'>*</sup>
        </p>
        <input 
          required
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleOnChange}
          placeholder='First Name'
          style={{
            boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className='w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50'/>
      </label>
      <label className='w-full'>
        <p className='mb-2 text-[0.875 rem leading-[1.375rem] text-white ml-1'>
           Last Name<sup className='text-pink-400'>*</sup>
        </p>
        <input 
          required
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleOnChange}
          placeholder='Last Name'
          style={{
            boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className='w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50'/>
      </label>
       </div>
      <label className='w-full'>
        <p className='mb-2 text-[0.875 rem leading-[1.375rem] text-white ml-1'>
            Email Address <sup className='text-pink-400'>*</sup>
        </p>
        <input 
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder='Enter email address'
          style={{
            boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className='w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50'/>
      </label>
      <div className='flex gap-8'>
      <label className='relative w-full'>
        <p className='mb-2 text-[0.875 rem leading-[1.375rem] text-white ml-1'>
            Password <sup className='text-pink-400'>*</sup>
        </p>
        <input 
          required
          type={showPassword ? "text" : "password" }
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder='Enter Password'
          style={{
            boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className='w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50'/>
        <span onClick={()=> setShowPassword((prev) => !prev)} className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
            {
                showPassword ? (
                    <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                ) :
                (
                    <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                )
            }
        </span>
      </label>
      <label className='relative w-full'>
                <p 
                className='mb-2 text-[0.875 rem leading-[1.375rem] text-white ml-1'>Confirm Password<sup className='text-pink-400'>*</sup></p>
                <input
                 required
                 type={showConfirmPassword ? "text" : "password"}
                 name='confirmPassword'
                 value={confirmPassword}
                 placeholder='Enter Confirm Password'
                 style={{
                    boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                 onChange={handleOnChange}
                 className='w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50'/>
                 
                <span onClick={()=> setShowConfirmPassword((prev) => !prev)} className='absolute right-3 top-[38px] z-[10] cursor-pointer' >
                {
                showConfirmPassword ? (
                    <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                ) :
                (
                    <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                )
                }
                </span>
               </label>
              </div>
             </div>
          ) 
         
        }
      <button type="submit" className='mt-6 rounded-[8px] bg-yellow-200 py-[8px] px-[12px] font-medium text-slate-900'>
        Sign in
      </button>
    </form>
  )
}

export default SignupForm;
