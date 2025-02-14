import { FaArrowRight } from "react-icons/fa";
import Button from "./Button";
import HighlightText from "./HighlightText";
import Instructor from "../../../instructor.jpg"

const InstructorSection =()=>{
    return(
        <div className="mt-16 p-6">
            <div className="flex flex-row items-center ">

              <div className="w-[50%] mx-24">
                <img 
                  src={Instructor}
                  alt="instructor"
                  className="shadow-white"/>
              </div>

              <div className="w-[50%] flex flex-col gap-10">
                <div className="text-4xl font-semibold w-[50%]">
                    Become an
                    <HighlightText text={"Instructor"}/>
                </div>

                <p className="font-medium text-[16px] w-[80%] text-slate-300">
                    Instructors from around the world teach million of students on SciNotion.We provide the tools and skills to teach what you love.
                </p>
                
                <div className="w-fit">
                <Button active={true} linkto={"/signup"} >
                  <div className="flex flex-row gap-2 ">
                    Start Learning Today
                    <FaArrowRight/>
                  </div>
                </Button>
                </div>

              </div>
              
            </div>
        </div>
    )
}

export default InstructorSection;