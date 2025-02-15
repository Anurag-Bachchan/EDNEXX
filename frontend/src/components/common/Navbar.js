import React, { useEffect, useState } from 'react';
import { NavbarLinks } from './NavbarLinks';
import  logo  from "../../logo.webp";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../Services/apiConnector';
import { categories } from '../Services/apis';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

const Navbar = () => {
  
  const {token} = useSelector( (state)=> state.auth );
  const {user} = useSelector( (state)=> state.profile );
  const {totalItems} = useSelector( (state)=> state.cart );
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  
  const fetchSublinks = async()=>{
    try{
        const result = await apiConnector("GET",categories.CATEGORIES_API);
        // console.log(result.data.allTags);
        setSubLinks(result.data.allTags);
    }
    catch(error){
        console.log("Could not fetch the category list");
    }
  }

  useEffect ( ()=>{
  //  console.log("ram");
   fetchSublinks();

  },[])

  const matchRoute = (route)=>{
    return matchPath({path:route}, location.pathname)
  }

  return (
    <div className='flex h-16 items-center justify-center border-b-[1px] border-b-slate-600 '>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to="/">
          <img src={logo} width={60} height={20} alt="MainLogo" loading='lazy' className='rounded-lg p-1 ml-8'/>
        </Link>
         <nav>
            <ul className='flex gap-x-8 text-slate-50'> 
                {
                    NavbarLinks.map((link ,index)=>{
                       return(
                         <li key={index}>
                            {
                              link.title === "Catalog" ? (
                                  <div className='relative flex items-center gap-2 group'>
                                    <p>{link?.title}</p>
                                    <IoIosArrowDropdownCircle/>

                                    <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[30%] top-[50%]
                                       flex flex-col rounded-md bg-slate-50 p-3 text-slate-900 opacity-0 transition-all duration-200
                                       group-hover:visible group-hover:opacity-100 lg:w-[300px] gap-2 z-10'>

                                        <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45
                                        rounded bg-slate-50'>
                                        </div>

                                        {
                                            subLinks && subLinks.length ? (
                                                    subLinks.map((subLink, index)=> (
                                                      <Link to={`/catalog/${subLink.name
                                                        .split(" ")
                                                        .join("-")
                                                        .toLowerCase()}`} key={index}>
                                                        <p className='flex items-center p-1 hover:bg-gray-200 hover:text-blue-400 rounded-md'>{subLink.name}</p>
                                                      </Link>
                                                    ))
                                            ) :
                                            (
                                             <div></div>
                                            )
                                        }
                                      
                                    </div>

                                  </div>
                                ) : (
                                <Link to={link?.path}>
                                    <p className={`${matchRoute(link?.path) ? "text-yellow-200" : "text-white"}`}>
                                        {link.title}
                                    </p>
                                </Link>
                              )
                            }
                         </li>
                        )
                    })
                }
            </ul>
         </nav>
         {/* <div className='flex flex-row gap-5 justify-center items-center'>
            <button className='border-slate-400'>
                Login
            </button>
            <button>
               Signup
            </button>
         </div> */}
         <div className='flex gap-x-4 items-center'>
          {
            user && user?.accountType !== "Instructor" && ( // && is used for conditional rendering agar aage wala condition true tabhi mera yh cart wala icon dikhenga and total items
                <Link to="/dashboard/cart" className='relative'>
                    <AiOutlineShoppingCart fontSize={40} fill='#AFB2BF'/>
                    {
                        totalItems > 0 && 
                        (
                            <span className='absolute text-yellow-200 ml-[15px] top-0 bg-slate-900 rounded-full p-1 '>
                                {totalItems}
                            </span>
                        )
                    }
                </Link>
            )
          }
          {
            token === null && (
                <Link to="/login">
                    <button className='border border-slate-600 bg-slate-700 px-[12px] py-[8px] text-slate-100 rounded-md'>
                        Log in
                    </button>
                </Link>
            )
          }
          {
            token === null && (
                <Link to="/signup">
                    <button className='border border-slate-600 bg-slate-700 px-[12px] py-[8px] text-slate-100 rounded-md'>
                        Sign Up
                    </button>
                </Link>
            )
          }
          {
            token !== null && <ProfileDropDown/>
          }
         </div>
      </div>
    </div>
  )
}

export default Navbar;
