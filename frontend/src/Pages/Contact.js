import React from 'react';
import ContactForm from '../components/core/About/ContactForm';
import ContactDetails from './ContactDetails';
import Footer from './Footer';
const Contact = () => {
  return (
      <div>
         <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col mb-14 justify-between gap-8 text-white lg:flex-row" >

         <div className="lg:w-[40%]">
          <ContactDetails />
         </div> 

          <section className='flex mx-auto flex-col items-center justify-between gap-3 text-white bg-slate-900 shadow-[0_0_20px_0] shadow-[#c8ab68]'>
            <div  className="border border-slate-400 text-slate-300 rounded-xl p-7 lg:p-12 flex gap-3 flex-col">

            <h1 className="text-4xl leading-10 font-semibold bg-gradient-to-b  from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">
              Got a Idea? We&apos;ve got the skills. Let&apos;s team up
            </h1>
            <p className="text-lg text-yellow-200">
              Tell us more about yourself and what you&apos;re got in mind.
            </p>
                <div>
                  <ContactForm/>
                </div>
            </div>
          </section>
         </div>

         <Footer/>
      </div>
  )
}

export default Contact
