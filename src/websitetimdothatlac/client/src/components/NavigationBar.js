import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white text-white py-4 shadow-md relative">
      <div className="container mx-auto flex justify-center">
        {/* Nút Trang Chủ */}
        <button
          onClick={() => navigate("/")}
          className={`px-6 py-3 font-medium transition border ${
            isActive("/")
              ? "bg-blue-500 text-white"
              : "bg-white text-black hover:bg-gray-100 border-gray-300"
          } rounded-l-md`}
        >
          HOME
        </button>

        {/* Nút Đồ Thất Lạc */}
        <button
          onClick={() => navigate("/lost-items")}
          className={`px-6 py-3 font-medium transition border ${
            isActive("/lost-items")
              ? "bg-red-600 text-white"
              : "bg-white text-black hover:bg-gray-100 border-gray-300"
          }`}
        >
          ĐỒ THẤT LẠC
        </button>

        {/* Nút Đồ Nhặt Được */}
        <button
          onClick={() => navigate("/found-items")}
          className={`px-6 py-3 font-medium transition border ${
            isActive("/found-items")
              ? "bg-green-600 text-white"
              : "bg-white text-black hover:bg-gray-100 border-gray-300"
          } rounded-r-md`}
        >
          ĐỒ NHẶT ĐƯỢC
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
