import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Services/operations/authAPI';
import { useNavigate } from 'react-router-dom';


const ProfileDropDown = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {user} = useSelector((state)=> state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const handleDashboard = () => {
    navigate("/dashboard/my-profile");
  };

  return (
    <nav className=" flex items-center justify-between p-4 text-white">
      <div className="relative">
        <button onClick={toggleDropdown} >
          <img src={user.image} alt="Profile" className="w-9 h-9 rounded-full" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 border border-gray-300 rounded-md shadow-lg z-10">
            <div className="p-2 cursor-pointer hover:bg-gray-200 hover:text-blue-400 rounded-md" onClick={handleDashboard}>Dashboard</div>
            <div className="p-2 cursor-pointer hover:bg-gray-200 hover:text-blue-400 rounded-md" onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>
    </nav>
  );
};


export default ProfileDropDown;
