import React from 'react'

const stats = [
    {count:"5K", label:"Active Students"},
    {count:"18+", label:"Mentors"},
    {count:"200+", label:"Courses"},
    {count:"50+", label:"Awards"},
]

const Stats = () => {
  return (
    <section>
        <div className='flex gap-x-20 border-r-2 border-slate-600 '>
          {
            stats.map((element, index)=>(
                <div key={index}>
                    <h1 className='text-3xl'>
                        {element.count}
                    </h1>
                    <h2 className='text-lg text-yellow-200'>
                        {element.label}
                    </h2>
                </div>
            ))
          }
        </div>
    </section>
  )
}

export default Stats;
