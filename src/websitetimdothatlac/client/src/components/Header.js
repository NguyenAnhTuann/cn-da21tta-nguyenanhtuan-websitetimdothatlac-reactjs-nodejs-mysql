import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaEdit, FaFileAlt, FaSignOutAlt } from 'react-icons/fa'; // Import biểu tượng từ React Icons
import { IoIosLogIn } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import logo from '../assets/image/logo.png';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, []);

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center bg-white p-4 border-b-2 shadow-sm">
      {/* Logo */}
      <div onClick={() => navigate('/')} className="cursor-pointer">
        <img src={logo} alt="Logo" className="w-[400px] h-auto" />
      </div>

      {/* Nút điều hướng */}
      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            <span className="text-gray-800 font-medium">Xin chào, {userName}!</span>

            {/* Chỉnh sửa thông tin */}
            <button
              className="flex items-center gap-1 text-black hover:bg-gray-200 hover:rounded-xl px-3 py-2 transition-all duration-300"
              onClick={() => navigate('/edit-profile')}
            >
              <FaEdit size={20} />
              Chỉnh sửa thông tin
            </button>

            {/* Đăng tin mới */}
            <button
              className="flex items-center gap-1 text-white bg-blue-500 hover:bg-blue-700 rounded-xl px-3 py-2 transition-all duration-300"
              onClick={() => navigate('/new-post')}
            >
              <FaFileAlt size={20} />
              Đăng tin
            </button>

            {/* Chỉnh sửa bài đăng */}
            <button
              className="flex items-center gap-1 text-black hover:bg-gray-200 hover:rounded-xl px-3 py-2 transition-all duration-300"
              onClick={() => navigate('/my-posts')}
            >
              <CiEdit size={25} />
              Chỉnh sửa bài đăng
            </button>

            {/* Đăng xuất */}
            <button
              className="flex items-center gap-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              onClick={handleLogout}
            >
              <FaSignOutAlt size={20} />
              Đăng xuất
            </button>
          </>
        ) : (
          <>

            {/* Đăng nhập */}
            <button
              className="flex items-center gap-1 text-gray-700 hover:bg-gray-200 hover:rounded-xl px-3 py-2 transition-all duration-300"
              onClick={() => navigate('/login')}
            >
              <IoIosLogIn size={25} />
              Đăng nhập
            </button>

            {/* Đăng ký */}
            <button
              className="flex items-center gap-1 text-gray-700 hover:bg-gray-200 hover:rounded-xl px-3 py-2 transition-all duration-300"
              onClick={() => navigate('/register')}
            >
              <FaUserPlus size={20} />
              Đăng ký
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
