import React from 'react';
import HighlightText from '../components/core/HomePage/HighlightText';
import study1 from "../study1.jpg";
import study2 from "../study2.jpg";
import study3 from "../study3.jpg";
import Quote from '../components/core/About/Quote';
import about from "../about1.jpg";
import Stats from '../components/core/About/Stats';
import LearningGrid from '../components/core/About/LearningGrid';
import ContactForm from '../components/core/About/ContactForm';
import Footer from './Footer';

const About = () => {
  return (
    <>
    <div className='mx-auto mt-[30px] text-white w-11/12 max-w-maxContent'>
       <section>
        <div  className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-5 text-center text-white">
            <header className="mx-auto py-5 text-xl  lg:w-[70%]">
                Driving Innnovation in Online Education for a
                <HighlightText text={"Brighter Future"}/>
                <p >Ednexx is at the forefront for driving innovation in online education. We're passionate about creating a 
                brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </header>
            <div className='flex mx-auto gap-x-8 items-center justify-center mt-8 mb-8'>
                <img src={study1} alt="study1" className='w-[400px] h-[260px] shadow-[0_0_20px_0] shadow-[#c8ab68]'/>
                <img src={study2} alt="study2" className='w-[400px] h-[260px] shadow-[0_0_20px_0] shadow-[#c8ab68]'/>
                <img src={study3} alt="study3" className='w-[400px] h-[260px] shadow-[0_0_20px_0] shadow-[#c8ab68]'/>
            </div>
        </div>
       </section>

       <section className="border-b border-slate-400">
        <div  className="mx-auto flex w-11/12 max-w-maxContent flex-col text-xl text-center justify-between gap-10 mb-10 mt-5">
            <Quote/>
        </div>
       </section>

       <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10">
            <div className="flex flex-col items-center mt-14 lg:flex-row justify-between">
                <div>
                   <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] mb-5">Our Founding Story</h1>
                   <p className="text-base font-medium lg:w-[95%] leading-relaxed">In the spring of 2021, a group of passionate educators and technologists came together with a shared vision: to make quality education accessible to everyone, regardless of their geographical location or socio-economic background. 
                    Frustrated by the limitations of traditional education systems and inspired by the potential of digital technology, they decided to create a platform that would revolutionize the way people learn.</p>

                    <p>Ednexx was born out of a small garage office, where the founding team spent countless hours brainstorming, coding, and testing their ideas.
                     They faced numerous challenges, from limited funding to technical setbacks, but their determination and belief in their mission kept them going. 
                     Slowly but surely, they built a platform that combined the best of interactive learning, personalized education, and community engagement.</p>
                </div>
                <div>
                    <img src={about} alt="about" className='w-[1600px] h-[260px] shadow-[0_0_20px_0] shadow-[#FC6767] ml-10'/>
                </div>
            </div>
            <div className='flex gap-5 mt-5'>
                <div>
                   <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl mb-5 font-semibold text-transparent lg:w-[70%] ">Our Vision</h1>
                   <p>Our mission at Ednexx is to democratize education by providing a high-quality, affordable, and accessible learning platform for students around the world. 
                    We aim to empower learners with the tools and resources they need to achieve their academic and professional goals. 
                    By leveraging innovative technology and fostering a collaborative learning environment, we strive to create an educational experience that is both engaging and effective.
                    </p>
                </div>
                <div>
                  <h1 className="bg-gradient-to-b mb-5 from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">Our Mission</h1> 
                  <p>
                  Our vision is to become the global leader in online education, transforming the lives of millions of learners by making knowledge accessible and empowering. We envision a world where anyone, anywhere, can access the highest quality education and unlock their full potential. 
                  We aim to continuously innovate and adapt to the changing needs of learners, ensuring that Ednexx remains at the forefront of the education revolution.
                  Through our efforts, we hope to build a more informed, skilled, and connected global community.
                  </p>
                </div>
            </div>
        </div>
       </section>

       <div className='flex justify-center items-center mt-10 mb-10 bg-slate-900 p-4 w-auto'>
       <Stats/>
       </div>

       <section className='flex mx-auto flex-col items-center justify-between gap-5'>
        <LearningGrid/>
        <ContactForm/>
       </section>
        

    </div>
    <Footer/>
    </>  
  )
}

export default About
