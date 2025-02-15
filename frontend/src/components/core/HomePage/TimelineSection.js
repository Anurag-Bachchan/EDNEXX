import timelineImage from "../../../laptop.avif";
import Logo from "../../../logo1.avif";

const timeline=[
    {
        Logo:Logo,
        heading:"Leadership",
        Description:"Fully committed to the success company"
    },
    {
        Logo:Logo,
        heading:"Leadership",
        Description:"Fully committed to the success company"
    }, 
    {
        Logo:Logo,
        heading:"Leadership",
        Description:"Fully committed to the success company"
    },
    {
        Logo:Logo,
        heading:"Leadership",
        Description:"Fully committed to the success company"
    },

]

const TimelineSection =()=>{
    return(
        <div>
           <div className="flex flex-row gap-15 items-center">

             <div className='w-[35%] h-[250px] flex flex-col gap-5'>
                {
                    timeline.map((element,index)=>{
                        return(
                            <div className="flex flex-row gap-6" key={index}>

                                <div className="w-[50px] h-[50px] flex items-center my-[-2%] ">
                                    <img src={element.Logo} alt="logo" className="rounded-full"/>
                                </div>

                                <h2 className="font-semibold text-[18px] text-black">{element.heading}</h2>
                                <p className="text-base  text-black">{element.Description}</p>

                            </div>
                        )
                    })
                }
             </div>

             <div className="relative shadow-blue-500">
                <img src={timelineImage} alt="timeLineimage" className="shadow-white object-cover h-fit "/>

                <div className="absolute bg-green-900 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <div className="flex flex-row gap-5 items-center border-r border-green-700 px-7">
                        <p className="text-3xl font-bold">10</p>
                        <p className="text-sm text-green-600">Years of Experience</p>
                    </div>

                    <div className="flex gap-5 items-center px-7">
                      <p className="text-3xl font-bold">250</p>
                      <p className="text-sm text-green-600">Type of Courses</p>
                    </div>
                </div>
             </div>

           </div>
        </div>
    )
}

export default TimelineSection;