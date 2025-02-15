import React, { useState } from 'react'
import * as Icons from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, matchPath } from 'react-router-dom';

const SidebarLink = ({link, iconName}) => {
  
  const Icon = Icons[iconName];
  const dispatch = useDispatch();
  const location = useLocation();


  const matchRoute = (route)=>{
    return matchPath({path:route}, location.pathname)
  }

  return (
    <NavLink to={link.path} 
    className={` relative px-8 py-2 text-sm font-medium  ${matchRoute(link.path) ? "bg-yellow-700 text-yellow-300" : "bg-opacity-0"}`}>
        <span className={` absolute left-0 top-0 h-full w-[0.4rem] bg-yellow-300 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"} `}></span>
        <div className='flex items-center gap-x-2' >
            <Icon className="text-lg"/>
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLink;

