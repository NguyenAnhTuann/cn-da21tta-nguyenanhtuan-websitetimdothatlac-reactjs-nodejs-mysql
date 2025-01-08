import React from 'react';
import logo from '../../assets/image/logotvu.png';
import { FaSignOutAlt } from 'react-icons/fa';


const AdminLayout = ({ children, handleLogout }) => {
  return (
    <div className="min-h-fit flex flex-col bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo và Tiêu đề */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center">
              <img src={logo} alt="Logo" />
            </div>
            <h1 className="text-3xl font-bold tracking-wider drop-shadow-md">
              Trang Quản Trị - Website Tìm Đồ Thất Lạc
            </h1>
          </div>

          {/* Nút Đăng Xuất */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaSignOutAlt size={20} />
            Đăng Xuất
          </button>
        </div>
      </header>


      {/* Main Content */}
      <main className="flex-1 container mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Copyright */}
          <div className="text-sm">
            Copyright © 2024 Website Tìm Đồ Thất Lạc - Admin Dashboard - Nguyễn Anh Tuấn - 110121123 - DA21TTA - TVU
          </div>

          {/* Logo */}
          <div>
            <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
