import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarLinks } from './dashboard-links';
import { logout } from '../../Services/operations/authAPI';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../common/ConfirmModal';
import { VscSignOut } from 'react-icons/vsc';


const Sidebar = () => {

  const {loading:authloading} = useSelector((state)=>state.auth);
  const { user, loading:profileloading}= useSelector((state)=>state.profile);
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const [confirmModal, setConfirmModal ] = useState();

  if(profileloading || authloading ){
      return(
        <div className='mt-10'>
          Loading...
        </div>
      )
  }

  return (
    <div className='flex flex-col min-w-[222px] md:h-screen border-r-[1px] border-r-slate-700 bg-slate-900 py-10 text-slate-300 '>
        <div className='flex flex-col'>
          {
            sidebarLinks.map((link,index)=>{
              if( link.type && user.accountType !== link.type) return null;
              return(
                  <SidebarLink key={link.id} link={link} iconName={link.icon}/>
              )
            })
          }
        </div>

        <div className='mx-auto mt-6 mb-6 h-[2px] w-10/12 bg-slate-600'></div>

        <div className='flex flex-col'>
          <SidebarLink link={{name:"Settings", path:"dashboard/Settings"}} iconName="VscSettingsGear"/>

         <button onClick={()=>
          setConfirmModal({
           text1:"Are You Sure ?",
           text2:"You will be logged out of your Account",
           btn1Text:"Logout",
           btn2Text:"Cancel",
           btn1Handler:()=> dispatch(logout(navigate)),
           btn2Handler:()=>setConfirmModal(null)
          })}
           className='text-sm font-medium text-slate-300'
          >
            <div className='flex items-center gap-x-2 ml-8 mt-3'>
              <VscSignOut className='text-lg'/>
              <span>Logout</span>
            </div>
           </button>

          {
             confirmModal && <ConfirmModal modalData={confirmModal}/>
          }

        </div>
        
    </div>
  )
}

export default Sidebar
