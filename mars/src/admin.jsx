import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <nav className="bg-transparent  flex justify-between p-3 w-full">
      <div className="text-2xl font-bold">Admin</div>
      <div className="flex items-center gap-4">
      <Link className="text-blue-600 hover:underline" to="/usersedith">Users Edit</Link>
        <Link to="/shop" className="text-blue-600 hover:underline">shop</Link>
        <Link to="/admin" className="text-blue-600 hover:underline" >Check</Link>
        
      </div>
    </nav>
  );
};

export default Admin;
