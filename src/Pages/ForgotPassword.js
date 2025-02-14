import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../components/Services/operations/authAPI';

const ForgotPassword = () => {
  
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] =useState("");
  const {loading} =useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) =>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  }

  return (
    <div className='text-white flex justify-center items-center mx-auto w-11/12 max-w-maxContent gap-4 mt-32 max-w-[600px]'>
      {
        loading ? (
            <div> Loading... </div>
        ) : (
            <div>
                <h1 className='text-2xl font-semibold leading-[2.375rem] text-slate-50 '>
                    {
                        !emailSent ? "Reset Your Password" : "Check Your Email"
                    }
                </h1>

                <p className='font-sans font-semibold mt-3 text-base text-blue-300'>
                    {
                        !emailSent ? "Have no fear. We'll email you instructions to rest your password. If you don't have access to your email we can try account recovery " :
                        `We have sent the reset email to ${email}`
                    }
                </p>

                <form onSubmit={handleOnSubmit}>
                  {
                    !emailSent && 
                    <label>
                      <p className='mb-1 mt-6 text-[0.875 rem leading-[1.375rem] text-white'>Email Address<sup className='text-pink-400'>*</sup></p>
                      <input 
                         required
                         type='email'
                         name='email'
                         value={email}
                         onChange={(e)=> setEmail(e.target.value)}
                         style={{
                          boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                         placeholder='Enter Your Email Address'
                         className='w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-slate-50'
                        />
                    </label>
                  }

                  <button type="submit" className='mt-6 rounded-[8px] bg-yellow-200 py-[8px] px-[12px] font-medium text-slate-900'>
                    {
                      !emailSent ? "Reset Password" : "Resend Email"
                    }
                  </button>

                  <div>
                    <Link to="/login">
                      <p className='mt-1 ml-auto max-w-max text-sm text-blue-200'>Back to Login</p>
                    </Link>
                  </div>

                </form>
            </div>
        )
      }
    </div>
  )
}

export default ForgotPassword
