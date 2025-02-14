import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import photo from "../ed.webp";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSection from "../components/core/HomePage/ReviewSection";
import { ReviewData } from "../components/core/HomePage/reviewData";
import Footer from "./Footer";

const Home =()=>{

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  
    return(
        <>
        {/* section 1 */}
          <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">
            <Link to={"/signup"}>
              <div className="group mt-16 p-1 mx-auto rounded-full bg-slate-500 font-bold text-right transition-all duration-200 hover:scale-95 w-fit">
                <div className="flex flex-row items-center gap-1 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-slate-600">
                    <p> Become an Instructor </p>
                    <FaArrowRight/>
                </div>
              </div>
            </Link>

            <div className="text-center text-4xl font-semibold mt-7">
              Empower Your Future with
               <HighlightText text={"Coding Skills"}/>
            </div>

            <div className="mt-4 w-[90%] text-center text-sm font-bold text-gray-400">
            Are you ready to take your learning experience to the next level? Whether you're a student, a professional, or a lifelong learner, Ednexx is here to help you achieve your educational goals with ease and excellence.
            </div>

            <div className="flex flex-row gap-7 mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                Learn More 
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
               Book a Demo
              </CTAButton>
            </div>
            <div className="mx-3 my-12 shadow-2xl ">
              <img src={photo} alt="edtech_img" className="shadow-lg shadow-yellow-200"/>
            </div>
   
   {/* codesection 1 */}
            <div>
              <CodeBlocks position={"lg:flex-row"} 
                  heading={
                    <div>
                      Unlock Your <HighlightText text ={"coding potential"}/> with our online courses
                    </div>
                  }
                  subheading={
                    "Our courses are designed and taught by industry experts who have years of experience in coding skills."
                  }
                  ctabtn1={
                    {
                       btnText:"Try it Yourself",
                       linkto:"/signup",
                       active:true
                    }
                  }
                  ctabtn2={
                    {
                       btnText:"Learn More",
                       linkto:"/login",
                       active:false
                    }
                  }
                  codeblock={`<<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<body>\n<div id="root"></div>\n<script type="module" src="./index.js"></script>\n<script src="https://checkout.razorpay.com/v1/checkout.js"></script>\n</body>`}
                  codeColors={"text-yellow-200"}
              />
            </div>
            {/* codesection 2 */}
            <div>
              <CodeBlocks position={"lg:flex-row-reverse"} 
                  heading={
                    <div>
                     Start <HighlightText text ={"coding in seconds"}/> 
                    </div>
                  }
                  subheading={
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                  }
                  ctabtn1={
                    {
                       btnText:"Continue Lesson",
                       linkto:"/signup",
                       active:true
                    }
                  }
                  ctabtn2={
                    {
                       btnText:"Learn more",
                       linkto:"/login",
                       active:false
                    }
                  }
                  codeblock={`<<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<body>\n<div id="root"></div>\n<script type="module" src="./index.js"></script>\n<script src="https://checkout.razorpay.com/v1/checkout.js"></script>\n</body>`}
                  codeColors={"text-yellow-200"}
              />
            </div>

            <ExploreMore/>

          </div>
        {/* section 2 */}
          <div className=" text-slate-200">

            <div className="homepage_bg h-[2025px]">

               <div className="w-11/12  max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between">
               <div className="h-[140px]"></div>
                 <div className="flex flex-row gap-7 text-white">
                     <CTAButton active={true} linkto={"/signup"}>
                       <div className="flex items-center gap-3">
                         Explore Full Catalog
                         <FaArrowRight/>
                       </div>
                     </CTAButton>
                     <CTAButton active={false} linkto={"/signup"}>
                       <div className="flex items-center gap-3">
                         Learn More
                        </div>
                     </CTAButton>
                 </div>
               </div>

               <div className="w-11/12  max-w-maxContent flex flex-col items-center gap-7 mx-auto justify-between">
               <div className="flex flex-row gap-5 mb-10 mt-[145px]">
               <div className="text-4xl text-black font-semibold w-[45%] ">
                 Get the Skills you need for a
                 <HighlightText text={"Job that is in demand"}/>
               </div>

              <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px] text-black">
                The modern Ednexx is the dictates its own terms. Today, to be a competitive
                specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                 <div>
                  Learn More
                 </div>
              </CTAButton>
              </div>
              </div>

              <TimelineSection/>

              <LearningLanguageSection/>

              </div>
               
          
            </div>

          </div>

        {/* section-3 */}
          <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter text-white bg-slate-800">

          <InstructorSection/>
           
          </div>

          <div className="bg-slate-100 h-200px"></div>

          <div className="mt-20">
            <Footer/>
          </div>

        </>
    )
}

export default Home;