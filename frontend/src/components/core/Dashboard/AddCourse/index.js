import RenderSteps from "./RenderSteps"

export default function AddCourse() {
    return(
        <>
          <div className="text-white mx-auto w-full flex  ml-28 gap-10">
            <div className="w-10/12">
                <h1 className='text-3xl font-semibold leading-[2.375rem] text-slate-50 mb-10 ml-6'>Add Course</h1>
                <div>
                    <RenderSteps />
                </div>
            </div>
            <div className="flex flex-col gap-4 bg-slate-900 p-6 w-[600px] h-96 mt-10 ">
                <p className="mb-2 ml-3 text-xl text-yellow-200 font-semibold"> Course Upload Tips</p>
                <ul className="list-outside list-disc ml-6">
                    <li>Set the course description or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Set the course description or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>
                    Information from the Additional Data section shows up on the
                    course single page.
                    </li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
          </div>
        </>
    )
}