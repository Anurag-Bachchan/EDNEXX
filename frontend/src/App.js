import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from './components/core/Auth/OpenRoute';
import ForgotPassword from './Pages/ForgotPassword';
import Login from './Pages/Login';       
import Signup from './Pages/Signup';
import Catalog from './Pages/Catalog';
import UpdatePassword from './Pages/UpdatePassword';
import VerifyEmail from './Pages/VerifyEmails';
import About from './Pages/About';
import MyProfile from './components/core/Dashboard/MyProfile';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import PurchaseHistory from './components/core/Dashboard/PurchaseHistory';
import EnrolledCourse from './components/core/Dashboard/EnrolledCourse';
import Settings from './components/core/Dashboard/Settings/index'
import { useSelector } from 'react-redux';
import Cart from './components/core/Dashboard/Cart/main';
import AddCourse from './components/core/Dashboard/AddCourse';
import MyCourse from './components/core/Dashboard/MyCourse';
import Contact from './Pages/Contact';
import CourseDetails from './Pages/CourseDetails';
import ViewCourse from './Pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import Instructor from './components/core/Dashboard/instructorDashboard/Instructor';
import EditCourse from './components/core/Dashboard/EditCourse';

function App() {

  const {user} = useSelector((state)=>state.profile);
  // console.log(user);
   
  return (
    <div className="w-screen min-h-screen bg-slate-800 flex flex-col font-serif">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='courses/:courseId' element={<CourseDetails/>} />
        <Route
           path='signup'
           element = {
            <OpenRoute>
              <Signup/>
            </OpenRoute>
           } />
        <Route
           path='login'
           element = {
            <OpenRoute>
              <Login/>
            </OpenRoute>
           } /> 
        <Route
           path='Forgot-password'
           element = {
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
           } /> 
        <Route
           path='update-password/:id'
           element = {
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
           } /> 
        <Route
           path='signup/verify-email'
           element = {
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
           } /> 
        <Route
           path='about'
           element = {
            <OpenRoute>
              <About/>
            </OpenRoute>
           } /> 

        <Route
           path='contact'
           element = {
            <OpenRoute>
              <Contact/>
            </OpenRoute>
           } /> 

        <Route
           element = {
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
           } > 

            <Route path="dashboard/my-profile" element={<MyProfile/>} />
            <Route path="dashboard/purchase-history" element={<PurchaseHistory/>} />
            <Route path="dashboard/Settings" element={<Settings/>} />
            <Route path='catalog/:catalogName' element={<Catalog/>} />

            

            {
              user && user.accountType === "Student" && 
              (
                <>
                  <Route path="dashboard/enrolled-courses" element={<EnrolledCourse/>} />
                  <Route path="dashboard/cart" element={<Cart/>} />
                </>
              )
            }

            {
              user && user.accountType === "Instructor" && 
              (
                <>
                  <Route path="dashboard/add-course" element={<AddCourse/>} />
                  <Route path="dashboard/instructor" element={<Instructor/>} />
                  <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
                  <Route path="dashboard/my-courses" element={<MyCourse/>} />
                </>
              )
            }

        </Route>

  

        <Route element={
            <PrivateRoute>
              <ViewCourse/>
            </PrivateRoute>
        }>

        {
           user?.accountType==="Student" && (
            <>
                 <Route
                    path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                    element={<VideoDetails/>}
                  />
            </>)  
        }

        </Route>

       </Routes>
    </div>
  );
}

export default App;
