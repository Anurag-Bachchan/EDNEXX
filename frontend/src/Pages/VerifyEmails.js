import React, { useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendotp , signUp } from '../components/Services/operations/authAPI';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {

  const[otp, setotp]= useState("");
  const {signupData, loading} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(signupData)
     if(!signupData){
        navigate("/signup");
     }
  },[])

  const resendOtp = ()=>{
     dispatch(sendotp(signupData.email ,navigate));
  }

  const handleOnSubmit = (e) =>{
    e.preventDefault();

    const {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    } = signupData;

    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));

  }

  return (
    <div className='flex text-white justify-center items-center mt-[120px] '>
        {
           loading ? <div> Loading.. </div> :
           <div>
             <h1 className='text-2xl font-semibold leading-[2.375rem] text-slate-50'>Verify Email</h1>
             <p className='font-sans font-semibold mt-3 text-base text-blue-300 mb-5'>A verification code has been sent to you. Enter the code below.</p>
             <form onSubmit={handleOnSubmit}>
                <OTPInput
                value={otp}
                onChange={setotp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} className='bg-slate-700 text-white text-3xl rounded-md p-1 '/>}/>
                
                <button type='submit' className='mt-6 rounded-[8px] bg-yellow-200 py-[8px] px-[12px] font-medium text-slate-900'>
                    Verify Email
                </button>

             </form>

             <div>
                <div>
                    <Link to="/login">
                      <p className='mt-1 ml-auto max-w-max text-sm text-blue-200'>Back to Login</p>
                    </Link>
                </div>

                <button onClick={resendOtp} className='mt-6 rounded-[8px] bg-yellow-200 py-[8px] px-[12px] font-medium text-slate-900'>
                    Resend it
                </button>

             </div>

            </div>
        }
    </div>
  )
}

export default VerifyEmail
