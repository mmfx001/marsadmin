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
        <Link to="/display" className="text-blue-600 hover:underline">Display</Link>
        <Link to="/shop" className="text-blue-600 hover:underline">shop</Link>
        <Link to="/admin" className="text-blue-600 hover:underline" >Check</Link>
        {!loggedInUser ? (
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center transition duration-300">
            <img
              src="https://w7.pngwing.com/pngs/339/876/png-transparent-login-computer-icons-password-login-black-symbol-subscription-business-model-thumbnail.png"
              alt="Login"
              className="w-8 h-8"
            />
          </Link>
        ) : (
          <div className="relative">
            <div
              className="cursor-pointer w-10 h-10 bg-white flex items-center justify-center rounded-full"
              onClick={handleUserInfoClick}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                alt="User Info"
                className="w-10 h-10"
              />
            </div>
            {showUserInfo && (
              <div
                ref={userInfoRef}
                className="absolute right-0 mt-1 w-72 bg-white p-4 rounded-lg shadow-lg z-20"
              >
                <p className="font-semibold text-blue-500">Email: {loggedInUser.name}</p>
                <p className="font-semibold text-blue-500">ID: {loggedInUser.id}</p>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-2 w-full transition duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Admin;
