import React from 'react';
import { useSelector } from 'react-redux';

import frameImg from "../../../login2.png";
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const Template = ( {title, description1, description2, formType}) => {

  const {loading} = useSelector((state)=> state.auth)
  return (
    <div className='grid min-h-[calc(100vh-2.5rem) place-items-center]'>
      {
        loading ? (
          <div className='spinner'></div>
        ) :
        (
          <div className='mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-14 py-12 md:flex-row md:gap-y-0 md:gap-x-12 mb-8'>
            <div className='mx-auto w-11/12 max-w-[530px] md:mx-0 mt-14 mr-5'>
              <h1 className='text-3xl font-semibold leading-[2.375rem] text-slate-50 mb-10'>
                {title}
              </h1>
              <p className='mt-4 text-[1.125rem] leading-[1.625rem]'>
                 <span className='text-slate-50'>{description1}</span>{" "}
                 <span className='font-sans font-bold italic text-blue-300'>{description2}</span>
              </p>
              { formType === "signup" ? <SignupForm/> : <LoginForm/>}
            </div>
            <div className='relative mx-auto w-11/12 max-w-[750px] md:mx-0 mt-16'>
              <img 
                src={frameImg}
                alt="Pattern"
                width={580}
                height={600}
                loading='lazy'/>
            </div>
          </div>
        )
      }
      
    </div>
  )
}

export default Template
