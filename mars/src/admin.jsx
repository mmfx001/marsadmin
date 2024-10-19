import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Foydalanuvchi ikonasi uchun

const Admin = ({ setLoggedInUser }) => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const userInfoRef = useRef(null);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleUserInfoClick = () => {
    setShowUserInfo((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    setShowUserInfo(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userInfoRef.current && !userInfoRef.current.contains(event.target)) {
        setShowUserInfo(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center p-4 shadow-md">
      {/* Logo yoki Admin nomi */}
      <div className="text-2xl font-bold">
        <Link to="/">Admin</Link>
      </div>

      {/* Navigatsiya havolalari */}
      <div className="hidden md:flex items-center space-x-6">
        <Link className="hover:text-gray-300 transition duration-300" to="/">Users Edit</Link>
        <Link className="hover:text-gray-300 transition duration-300" to="/shop">Shop</Link>
        <Link className="hover:text-gray-300 transition duration-300" to="/detail">Detail</Link>
        <Link className="hover:text-gray-300 transition duration-300" to="/adminr">AdminReating</Link>
        <Link className="hover:text-gray-300 transition duration-300" to="/teacher">Teacher</Link>
        <Link className="hover:text-gray-300 transition duration-300" to="/admin">Check</Link>
      </div>

      {/* Foydalanuvchi profilining qismini ko'rsatish */}
   

      {/* Mobil menyu uchun */}
      <div className="md:hidden">
        <button onClick={() => setShowUserInfo(!showUserInfo)} className="text-white focus:outline-none">
          {/* Hamburger menyu ikonasini qo'shish */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
 
          <div className="absolute top-16 right-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-2 p-4 md:hidden">
            <Link className="hover:text-gray-300 transition duration-300" to="/">Users Edit</Link>
            <Link className="hover:text-gray-300 transition duration-300" to="/shop">Shop</Link>
            <Link className="hover:text-gray-300 transition duration-300" to="/teacher">Teacher</Link>
            <Link className="hover:text-gray-300 transition duration-300" to="/admin">Check</Link>
    
          </div>
   
      </div>
    </nav>
  );
};

export default Admin;
