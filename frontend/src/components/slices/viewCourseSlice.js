import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData:[],
    completedLectures:[],
    courseEntireData:[],
    totalNoOfLectures:[]

}

const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
     setCourseSectionData(state,value){
        state.courseSectionData= value.payload
     },
     setEntireCourseData(state,value){
        state.courseEntireData = value.payload
     },
     setTotalNoOfLectures(state, value){
        state.totalNoOfLectures=value.payload
     },
     setCompletedLectures(state, value){
        state.completedLectures=value.payload
     },
     updateCompletedLectures(state, value){
        state.completedLectures=[ ...state.completedLectures, value.payload ]
     }
    }
})

export const { setCompletedLectures, setCourseSectionData, setEntireCourseData, updateCompletedLectures, setTotalNoOfLectures } = viewCourseSlice.actions;
export default viewCourseSlice.reducer;
