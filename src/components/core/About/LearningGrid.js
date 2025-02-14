import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import Button from '../HomePage/Button';

const learningGrid = [
    {
        order:-1,
        heading:"World Class Learning for",
        highlightText:"Anyone, Anywhere",
        description:
        "Ednexx partners with more than 275+ leading universities and companies to bring flexible, affordable, job relevant, online learning to individuals",
        BtnText:"Learn More",
        BtnLink:"/"

    },
    {
        order:1,
        heading:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with the industry needs. "
    },
    {
        order:2,
        heading:"Our Learning Methods",
        description:"Ednexx partners with more than 275+ leading universities and companies to bring"
    },
    {
        order:3,
        heading:"Certifications",
        description:"Ednexx partners with more than 275+ leading universities and companies to bring"
    },
    {
        order:4,
        heading:`Rating "Auto-grading"`,
        description:"Ednexx partners with more than 275+ leading universities and companies to bring"
    },
    {
        order:5,
        heading:"Ready to Work",
        description:"Ednexx partners with more than 275+ leading universities and companies to bring"
    }
]

const LearningGrid = () => {
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit'>
      {
        learningGrid.map((element ,index) => (
            <div key={index}
             className={`${index===0 && "lg:col-span-2 lg:h-[250px] p-5"}
             ${element.order % 2 ===1 ? "bg-slate-900 lg:h-[250px] p-5" : "bg-slate-700 lg:h-[250px] p-5"}
             ${element.order ===3 && "lg:col-start-2"}
             ${element.order < 0 && "bg-transparent"}`} >
             {
                element.order < 0 ?
                (
                  <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                    <div className='text-4xl font-semibold'>
                        {element.heading}
                        <HighlightText text={element.highlightText}/>
                    </div>
                    <p className='font-medium'> 
                        {element.description}
                    </p>
                    <div className='w-fit mt-4'>
                        <Button active={true} linkto={element.BtnLink}>
                            {element.BtnText}
                        </Button>
                    </div>
                  </div>
                ) : 
                (
                  <div className='flex flex-col p-5'>
                    <h1 className='text-lg font-semibold font-sans mb-4'>
                        {element.heading}
                    </h1>
                    <p>
                        {element.description}
                    </p>
                  </div>
                )
             }
            </div>
        ))
      }
    </div>
  )
}

export default LearningGrid;
