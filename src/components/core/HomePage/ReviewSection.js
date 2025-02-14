import React from "react";

const ReviewSection = ({data})=>{
    return(
        <div className="flex flex-col items-center bg-slate-600 p-5 w-72 h-72 gap-4 mb-3 shadow-inner shadow-yellow-300">
            <div className="flex flex-row justify-around ">
                <img src={data.img} alt="Profilepic" className="h-14 w-14 rounded-full -translate-x-9"/>
                <div className="flex flex-col -translate-x-4">
                    <h1 className="text-xl">{data.name}</h1>
                    <p className="text-[14px]">B.tech Student</p>
                </div>
            </div>
            <div className="text-[16px] flex flex-col gap-5">
                <p>{data.review}</p>
                <p>{`Rating : ${data.rating}`}</p>
            </div>
        </div>
    )
}

export default ReviewSection;