import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { login } from '../../Services/operations/authAPI';

// import { login } from "../../Services/operations/authAPI"

const LoginForm = () => {
                                            
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] =useState({ email:"", password:"" })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData ;
  
  const handleOnChange = (e)=> {
    setFormData((prevData) => ({
        ...prevData,
        [e.target.name]:e.target.value
    }))
  }

  const handleOnSubmit = (e)=> {
     e.preventDefault();
     dispatch(login(email, password, navigate));
  }

  return (
    <form 
      onSubmit={handleOnSubmit}
      className='mt-6 flex w-full flex-col gap-y-4'
    >
      <label className='w-full'>
        <p className='mb-2 text-[0.875 rem leading-[1.375rem] text-white'>
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
      <label className='relative'>
        <p className='mb-2 text-[0.875 rem leading-[1.375rem] text-white'>
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
        <Link to="/forgot-password">
         <p className='mt-1 ml-auto max-w-max text-xs text-blue-200'>
                Forgot Password
         </p>
        </Link>
      </label>
      <button type="submit" className='mt-6 rounded-[8px] bg-yellow-200 py-[8px] px-[12px] font-medium text-slate-900'>
        Login
      </button>
    </form>
  )
}

export default LoginForm;
