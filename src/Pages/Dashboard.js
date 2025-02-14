import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/core/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {

  const {loading:authloading} = useSelector((state)=>state.auth);
  const {loading:profileloading}= useSelector((state)=>state.profile);

  if(profileloading || authloading ){
      return(
        <div className='mt-10'>
          Loading...
        </div>
      )
  }

  return (
    <div  className="relative flex flex-col md:flex-row ">
      <Sidebar/>
      <div >
          <div className='mx-auto w-10/12 max-w-[1100px]  py-10'>
            <Outlet/>
          </div>
      </div>
    </div>
  )
}

export default Dashboard
