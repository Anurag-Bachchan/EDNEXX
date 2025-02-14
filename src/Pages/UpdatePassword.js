import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../components/Services/operations/authAPI';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const UpdatePassword = () => {

 const [formData , setFormData]= useState({
    password:"",
    confirmPassword:""
  })
  const dispatch = useDispatch();
  const location = useLocation();
  const [showPassword , setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {loading} = useSelector((state)=>state.auth);

  const{password, confirmPassword} =formData;


  const handleOnChange =(e) =>{
     setFormData(
        (prevData) => (
            {
                ...prevData,
                [e.target.name] : [e.target.value]
            }
        )
     )
  }

  const handleOnSubmit =(e) =>{
    e.preventDefault();
    const token= location.pathname.split("/").at(-1);
    console.log(token);
    dispatch(resetPassword(password ,confirmPassword ,token));
  }

  return (
    <div className='text-white mx-auto flex w-11/12 max-w-maxContent justify-center items-center gap-4 mt-20'>
      {
        loading ? <div> Loading... </div> :
        <div className='flex flex-col gap-2' >
           <h1  className='text-2xl font-semibold leading-[2.375rem] text-slate-50 '>Choose New Password</h1>
           <p className='font-sans font-bold mt-3 text-base text-blue-300'>Almost done. Enter your new password and you're all set.</p>
           <form onSubmit={handleOnSubmit} className='mt-6 flex w-full flex-col gap-y-4'>
              <label className='relative'>
                <p 
                className='mb-1 text-[0.875 rem leading-[1.375rem] text-white'>New Password<sup className='text-pink-400'>*</sup></p>
                <input
                 required
                 type={showPassword ? "text" : "password"}
                 name='password'
                 value={password}
                 style={{
                    boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                 onChange={handleOnChange}
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
              <label className='relative'>
                <p 
                className='mb-1 text-[0.875 rem leading-[1.375rem] text-white'>Confirm New Password<sup className='text-pink-400'>*</sup></p>
                <input
                 required
                 type={showConfirmPassword ? "text" : "password"}
                 name='confirmPassword'
                 value={confirmPassword}
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

              <button type="submit" className='mt-6 rounded-[8px] bg-yellow-200 py-[8px] px-[12px] font-medium text-slate-900'>
                Reset Password
              </button>

           </form>

           <div>
                    <Link to="/login">
                      <p className='mt-1 ml-auto max-w-max text-sm text-blue-200'>Back to Login</p>
                    </Link>
            </div>

        </div>
      }
    </div>
  )
}

export default UpdatePassword
