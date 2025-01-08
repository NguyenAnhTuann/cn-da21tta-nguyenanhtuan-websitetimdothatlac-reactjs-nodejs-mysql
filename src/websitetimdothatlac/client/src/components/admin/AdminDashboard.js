import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/image/logotvu.png';
import { FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo và Tiêu đề */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center">
              <img
                src={logo}
                alt="Logo"
              />
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 p-6">
        {/* User Management Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">QUẢN LÝ NGƯỜI DÙNG</h2>
          <p className="text-gray-600 mb-4">
            Xem và quản lý tất cả thông tin người dùng trong hệ thống.
          </p>
          <button
            onClick={() => navigate('/admin/users')}
            className="bg-gray-100 text-black px-6 py-2 border-2 rounded-2xl hover:bg-gray-400 transition"
          >
            👤 Xem danh sách người dùng
          </button>
        </div>

        {/* Post Management Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">QUẢN LÝ BÀI ĐĂNG</h2>
          <p className="text-gray-600 mb-4">
            Xem và quản lý tất cả bài đăng được tạo bởi người dùng.
          </p>
          <button
            onClick={() => navigate('/admin/posts')}
            className="bg-gray-100 text-black px-6 py-2 border-2 rounded-2xl hover:bg-gray-400 transition"
          >
            📝 Xem danh sách bài đăng
          </button>
        </div>

        {/* Post Management Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">QUẢN LÝ BÀI ĐĂNG ĐÃ CÓ CHỦ SỞ HỮU</h2>
          <p className="text-gray-600 mb-4">
            Xem và quản lý tất cả bài đăng đã có chủ sở hữu.
          </p>
          <button
            onClick={() => navigate('/admin/owned-posts')}
            className="bg-gray-100 text-black px-6 py-2 border-2 rounded-2xl hover:bg-gray-400 transition"
          >
             📋🔑 Xem danh sách bài đăng
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Copyright */}
          <div className="text-sm">
            Copyright © 2024 Website Tìm Đồ Thất Lạc - Admin Dashboard - Nguyễn Anh Tuấn - 110121123 - DA21TTA - TVU
          </div>

          {/* Logo */}
          <div>
            <img
              src={logo}
              alt="Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
      </footer>
    </div >
  );
};

export default AdminDashboard;
