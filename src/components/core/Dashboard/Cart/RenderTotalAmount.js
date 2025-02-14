import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { buyCourse } from '../../../../Pages/StudentDetailsAPI';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {

  const {total, cart} =useSelector((state)=>state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () =>{
    const courses = cart.map((course)=>course._id);
    console.log(courses);
    console.log("Bought these courses", courses);
    buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-slate-700 bg-slate-900 p-6">
      
      <p className="mb-1 text-sm font-medium text-slate-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-200">₹ {total}</p>

      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses={"w-full justify-center"}/>

    </div>
  )
}

export default RenderTotalAmount
