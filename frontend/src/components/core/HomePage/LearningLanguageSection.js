import HighlightText from "./HighlightText";
import img_1 from "../../../img_1.jpg";
import img_2 from "../../../img_2.jpg";
import Button from "./Button";

const LearningLanguageSection = ()=>{
    return(
        <div className="mt-[130px]">
         <div className="flex flex-col gap-5 items-center">

            <div className="text-4xl font-semibold text-center text-black">
              Your Swiss Knife for
              <HighlightText text={"learning any language"}/>
            </div>

            <div className="text-center text-slate-600 mx-auto text-base font-medium w-[70%]">
              Using spin making learning multiple languages easy. With 20+ languages realistic voice-over, 
              progress tracking, customs schedule and more.
            </div>

            <div className="flex flex-row items-center justify-center mt-5">
                <img 
                  src={img_1}
                  alt="planyourDay"
                  className="object-contain h-[40%] w-[40%]"/>
                <img 
                  src={img_2}
                  alt="planyourDay"
                  className="object-contain  h-[40%] w-[40%]"/>
            </div>

            <div className="w-fit mt-10">
                <Button active={true} linkto={"/signup"}>
                 Learn More
                </Button>
            </div>

         </div>
        </div>
    )
}

export default LearningLanguageSection;