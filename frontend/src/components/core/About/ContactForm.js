import React from 'react';
import ContactUsForm from '../../common/ContactUsForm';

const ContactForm = () => {
  return (
    <div className='flex mx-auto flex-col mt-8 mb-12'>
       <h1 className="text-center text-4xl font-semibold bg-clip-text bg-gradient-to-b from-[#FF512F] to-[#F09819]  text-transparent">
          Get In Touch
       </h1>
       <p className="text-center text-slate-300 mt-3">
         We'd love to here for you, Please fill out this form.
       </p>
       <div className="mt-12 mx-auto">
          <ContactUsForm/>
       </div>
    </div>
  )
}

export default ContactForm
