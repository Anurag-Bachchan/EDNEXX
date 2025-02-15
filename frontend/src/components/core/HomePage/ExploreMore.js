import HighlightText from "./HighlightText";
import { HomePageExplore } from "./HomePageExplore";
import { useState } from "react";
import CourseCard from "./CourseCard";

const tabName =[
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths"
];

const ExploreMore =()=>{

    const [currentTab, setCurrentTab]= useState(tabName[0]);// yh jo hai mera set knga ki kon se current tab par click kiya hua h.
    const [courses, setCourses] = useState(HomePageExplore[0].courses);// yh mera set knga ki jiss tab par click kiya hua h usse related mera ko courses dikhayenga and default mh humlog phla wala tab jo select kiya hua ussi ka courses dikhayenga.
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);// yh mera set knga ki jo courses hai usmh se konsa select kia hua h..

    const setMyCards = (value)=>{ // aur yh function mera ek click par jo jo set kna h woh yh function mra set knga ..
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=> course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
      }

    return(
      
      <div>

        <div className="text-4xl font-semibold text-center">
          Unlock the
          <HighlightText text={"Power of Code"}/>
        </div>

        <p className="text-center text-slate-300 text-sm text-[16px] mt-3">
            Learn to build anything you can imagine 
        </p>

        <div className="mt-5 flex flex-row gap-1 rounded-full bg-slate-700 mb-5 border-slate-100 px-1 py-1">
            {
                tabName.map((element,index)=>{
                    return(
                        <div className={`text-[16px] flex flex-row items-center gap-2
                        ${currentTab === element ? "bg-slate-900 text-slate-50 font-medium" : "text-slate-200"} rounded-full transition-all
                        duration-200 cursor-pointer hover:bg-slate-900 hover:text-slate-50 px-5 py-2`}
                        key={index}
                        onClick={()=> setMyCards(element)}>
                          {element}
                        </div>
                    )
                })
            }
        </div>

        <div className="lg:h-[150px]"></div>

        <div className="absolute flex flex-row gap-10 justify-between translate-y-[-50%] translate-x-[-18%]">
            {
              courses.map((element,index)=>{
                return(
                    <CourseCard 
                     key={index}
                     cardData={element}
                     setCurrentCard={setCurrentCard}
                     currentCard={currentCard}/>
                )
              })
            }
        </div>

      </div>
    )
}

export default ExploreMore;