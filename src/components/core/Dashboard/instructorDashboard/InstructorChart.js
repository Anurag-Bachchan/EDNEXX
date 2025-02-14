import React, { useState } from 'react'
import { Chart,registerables } from 'chart.js'
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

const InstructorChart = ({courses}) => {
    
 const [currChart , setCurrChart]=useState('student')

 //function to genrate random color
 const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  //create data for chart displaying  student info 
 
  const chartDataStudents  = {
    labels:courses.map((course)=>course.courseName),
    datasets: [
        {
          data: courses.map((course) => course.totalStudentsEnrolled),
          backgroundColor: generateRandomColors(courses.length),
        },
      ],
  }


  //create data for chart displaying income info 
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }


  //Create options
  const options = {
    maintainAspectRatio: false,
  }





  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-slate-900 p-6">
    <p className="text-lg font-bold text-slate-50">Visualize</p>
    <div className="space-x-4 font-semibold">
      {/* Button to switch to the "students" chart */}
      <button
        onClick={() => setCurrChart("students")}
        className={`rounded-sm p-1 px-3 transition-all duration-200 ${
          currChart === "students"
            ? "bg-slate-700 text-yellow-50"
            : "text-yellow-400"
        }`}
      >
        Students
      </button>
      {/* Button to switch to the "income" chart */}
      <button
        onClick={() => setCurrChart("income")}
        className={`rounded-sm p-1 px-3 transition-all duration-200 ${
          currChart === "income"
            ? "bg-slate-700 text-yellow-50"
            : "text-yellow-400"
        }`}
      >
        Income
      </button>
    </div>
    <div className="relative mx-auto aspect-square h-full w-full gap-4">
      {/* Render the Pie chart based on the selected chart */}
      <Pie
        data={currChart === "students" ? chartDataStudents : chartIncomeData}
        options={options}
      />
    </div>
  </div>
  )
}

export default InstructorChart