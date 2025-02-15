import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart(){

    const{total, totalItems}= useSelector((state)=> state.cart);

    return (
       <div className='text-white mx-auto w-11/12 flex flex-col ml-60 gap-6'>
         <h1 className="mb-14 text-4xl font-medium font-semibold text-white">Your Cart</h1>
         <p className="border-b border-b-slate-400 pb-2 font-semibold text-slate-300 text-lg">{totalItems} Courses in Cart</p>

         {
            totalItems>0 ? (
                <div  className="mt-8 flex flex-col items-center gap-7 lg:flex-row lg:items-start">
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                </div>
            ) : (
                <p className="mt-14 text-center text-3xl text-richblack-100">Your cart is Empty</p>
            )
         }
       </div>
    )
}