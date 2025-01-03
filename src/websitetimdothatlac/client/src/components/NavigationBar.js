import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false); // Theo dõi trạng thái dính


  const isActive = (path) => location.pathname === path;

  // Theo dõi sự kiện cuộn
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${isSticky
        ? "fixed top-0 left-0 w-full bg-white shadow-md z-40"
        : "relative bg-white shadow-md z-50"
        } transition-all duration-300 py-4`}
    >
      <div className="container mx-auto flex justify-center gap-4">
        {/* Nút Trang Chủ */}
        <button
          onClick={() => navigate("/")}
          className={`px-8 py-4 font-semibold transition-all duration-300 border-2 ${isActive("/")
              ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow-md scale-105"
              : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 hover:text-black border-gray-200 shadow"
            } rounded-2xl`}
        >
          🏠 HOME
        </button>

        {/* Nút Đồ Thất Lạc */}
        <button
          onClick={() => navigate("/lost-items")}
          className={`px-8 py-4 font-semibold transition-all duration-300 border-2 ${isActive("/lost-items")
              ? "bg-gradient-to-r from-red-400 to-pink-300 text-white shadow-md scale-105"
              : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:to-red-50 hover:text-black border-gray-200 shadow"
            } rounded-2xl`}
        >
          📦 ĐỒ THẤT LẠC
        </button>

        {/* Nút Đồ Nhặt Được */}
        <button
          onClick={() => navigate("/found-items")}
          className={`px-8 py-4 font-semibold transition-all duration-300 border-2 ${isActive("/found-items")
              ? "bg-gradient-to-r from-green-400 to-teal-300 text-white shadow-md scale-105"
              : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-green-100 hover:to-teal-50 hover:text-black border-gray-200 shadow"
            } rounded-2xl`}
        >
          🎒 ĐỒ NHẶT ĐƯỢC
        </button>

        {/* Nút Đã Sở Hữu */}
        <button
          onClick={() => navigate("/owned-items")}
          className={`px-8 py-4 font-semibold transition-all duration-300 border-2 ${isActive("/owned-items")
              ? "bg-gradient-to-r from-yellow-400 to-orange-300 text-white shadow-md scale-105"
              : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-50 hover:text-black border-gray-200 shadow"
            } rounded-2xl`}
        >
          🛒 ĐÃ SỞ HỮU
        </button>
      </div>

    </nav>
  );
};

export default NavigationBar;
