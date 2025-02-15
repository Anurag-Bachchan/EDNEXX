import { combineReducers } from "@reduxjs/toolkit";// dekh bhai yha par hm saara slices ko lh kar combine karenge and yh final rootreducer ko bhej dnga index.js and fir load kra dnga store mh
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice"
import courseSlice from "../slices/courseSlice";
import viewCourseSlice from "../slices/viewCourseSlice";

const rootReducer = combineReducers({
   auth:authReducer,
   profile:profileReducer,
   cart:cartReducer,
   course:courseSlice,
   viewCourse:viewCourseSlice

})

export default rootReducer;