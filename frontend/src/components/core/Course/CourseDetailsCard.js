import React from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../slices/cartSlice";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  if (loading || !course) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  const { thumbnail: ThumbnailImage, price: CurrentPrice, _id: courseId } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === "Instructor") {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <div className={`flex flex-col gap-4 rounded-md bg-slate-700 p-4 text-white`}>
      {/* Course Image */}
      <img
        src={ThumbnailImage}
        alt={course?.courseName}
        className="max-h-[300px] min-h-[180px] w-full object-cover rounded-2xl"
      />

      <div className="px-4">
        <div className="space-x-3 pb-4 text-3xl font-semibold">
          Rs. {CurrentPrice}
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="bg-yellow-200 p-2 font-bold rounded-md text-black"
            onClick={
              user && course?.studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && course?.studentsEnrolled.includes(user?._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>
          {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
            <button onClick={handleAddToCart} className="bg-slate-900 p-2 font-bold rounded-md w-full">
              Add to Cart
            </button>
          )}
        </div>
        <div>
          <p className="pb-3 pt-6 text-center text-sm text-white">
            30-Day Money-Back Guarantee
          </p>
        </div>

        <div className={`my-2 text-xl font-semibold`}>
           Course Instructions :
          <div className="flex flex-col gap-3 text-sm text-green-300 ">
            {/* {course?.instructions?.map((item, i) => {
              return (
                <p className={`flex gap-2`} key={i}>
                  <BsFillCaretRightFill />
                  <span>{item}</span>
                </p>
              );
            })} */}
            <p className={`flex gap-2 mt-4`} >
                  <BsFillCaretRightFill />
                  <span>Understand the Basics</span>
            </p>
            <p className={`flex gap-2`} >
                  <BsFillCaretRightFill />
                  <span>Practice Regularly</span>
            </p>
            <p className={`flex gap-2`} >
                  <BsFillCaretRightFill />
                  <span>Stay Consistent</span>
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            className="mx-auto flex items-center gap-2 py-6 text-yellow-200 w-full"
            onClick={handleShare}
          >
            <FaShareSquare size={15} /> Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsCard;