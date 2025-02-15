import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../Services/apiConnector';
import { auth } from '../Services/apis';
import toast from "react-hot-toast";

const ContactUsForm = () => {
  
 const [loading,setLoading] = useState(false);
 const {
   register,
   handleSubmit,
   reset,
   formState: {errors , isSubmitSuccessful}
  } = useForm();

   const countrycode = [
    {
        code:"+91",
        country:"India"
    },
    {
        code:"+1",
        country:"USA"
    },
   ]
 
   const submitContactForm = async(data)=>{
      console.log("Submit Data",data);
      try{
        setLoading(true);
        const response = await apiConnector("POST", auth.CONTACT_API, data);
        console.log(response);
        toast.success("Message Sent Successfully");
        setLoading(false);
      }
      catch(error){
         console.error("CONTACT US API ERROR :",error.response ? error.response.data : error.message)
         setLoading("false");
      }
   }
    
  useEffect(()=> {
    if(isSubmitSuccessful){
        reset({
            email:"",
            firstname:"",
            lastname:"",
            message:"",
            phoneNo:""
        })
    }
  }, [reset, isSubmitSuccessful])

  return (
   <form  className="flex flex-col gap-4 p-6 bg-gray-900 text-white rounded-lg shadow-lg "
   onSubmit={handleSubmit(submitContactForm)}>
    <div className='flex flex-col gap-6'>
    <div className='flex gap-4'>
        <div className='flex flex-col gap-2'>
            <label htmlFor='firstname'>First Name<span className="text-red-500">*</span></label>
            <input
             type='text'
             name='firstname'
             id='firstname'
             placeholder='Enter first name'
              className="shadow-sm shadow-white bg-gray-800 text-white bg-richblack-600 placeholder-gray-500 rounded-md p-2"
             {...register("firstname", {required:true})}/>
             {
               errors.firstname && (
                <span className="text-yellow-100 text-sm">
                   Please enter your firstname
                </span>
               )}
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor='lastname'>Last Name<span className="text-red-500">*</span></label>
            <input
             type='text'
             name='lastname'
             id='lastname'
             placeholder='Enter last name'
             className="shadow-sm shadow-white  bg-gray-800 text-white placeholder-gray-500 rounded-md p-2"
             {...register("lastname")}/>
        </div>
     </div>
     <div className='flex flex-col gap-2'>
            <label htmlFor='email'>Email Address <span className="text-red-500">*</span></label>
            <input
             type='email'
             name='email'
             id='email'
             placeholder='Enter first name'
             className="shadow-sm shadow-white bg-gray-800 text-white  placeholder-gray-500 rounded-md p-2"
             {...register("email", {required:true})}/>
             {
               errors.email && (
                <span>
                   Please enter Email Address 
                </span>
               )}
     </div>
     <div className='flex flex-col gap-2'>
       <label htmlFor='phoneNo'>Phone Number <span className="text-red-500">*</span></label>
       <div className='flex gap-5'>
            <select name='dropdown' id="dropdown" className="shadow-sm shadow-white bg-gray-800 text-white placeholder-gray-500 rounded-md p-2 w-1/6" {...register("countrycode", {required:true})}>
            {
                countrycode.map((element,index)=>(
                   <option key={index} value={element.code}>
                     {element.code} - {element.country}
                   </option>
                ))
            }
            </select>
            <input 
            type="number"
            name="phoneNo"
            id="phoneNo"
            placeholder='Enter Number'
             className="shadow-sm shadow-white bg-gray-800 text-white placeholder-gray-500 rounded-md p-2 flex-grow"
            {...register("phoneNo", 
                {
                    required:{value:true, message :"Please Enter your phoneNo"},
                    maxLength:{value:10, message :"Invalid Phone Number"},
                    minLength:{value:8, message :"Invalid Phone Number"}
                }
            )}/>
        </div>
     </div>
     <div className='flex flex-col gap-2'>
            <label htmlFor='message'>Message<span className=" text-red-500 ">*</span></label>
            <textarea
             name='message'
             id='message'
             cols='30'
             rows='7'
             placeholder='Enter your message here..'
             className="shadow-sm shadow-white bg-gray-800 text-white bg-richblack-600 placeholder-gray-500 rounded-md p-2"
             {...register("message", {required:true})}/>
             {
               errors.message && (
                <span>
                   Please enter your message
                </span>
               )}
     </div>
     <button type="submit" 
     className='text-center text-black text-[16px] px-3 py-3 rounded-md font-semibold bg-yellow-400 hover:scale-95 transition-all duration-200'>
         Send Message
     </button>
    </div>
   </form>
  )
}

export default ContactUsForm
