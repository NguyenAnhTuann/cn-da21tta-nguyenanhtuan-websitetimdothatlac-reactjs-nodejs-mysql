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
        setIsSticky(true); // Khi cuộn xuống > 100px
      } else {
        setIsSticky(false); // Khi ở vị trí ban đầu
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`transition-all duration-300 py-4 ${isSticky
          ? "fixed top-0 left-0 w-full bg-white shadow-md z-50 border-b-2 border-gray-300" // Khi dính
          : "relative bg-white z-10 border-b-2" // Khi ở vị trí mặc định (chỉ có border dưới)
        }`}
    >

      <div className="container mx-auto flex justify-center gap-4">
        {/* Nút Trang Chủ */}
        <button
          onClick={() => navigate("/")}
          className={`px-8 py-4 font-semibold transition-all duration-300 border-2 ${isActive("/")
              ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow-md scale-105"
              : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 hover:text-black border-gray-200 shadow hover:scale-110"
            } rounded-2xl`}
        >
          🏠 HOME
        </button>

        {/* Nút Đồ Thất Lạc */}
        <button
          onClick={() => navigate("/lost-items")}
          className={`px-8 py-4 font-semibold transition-all duration-300 border-2 ${isActive("/lost-items")
              ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow-md scale-105"
              : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 hover:text-black border-gray-200 shadow hover:scale-110"
            } rounded-2xl`}
        >
          📦 ĐỒ THẤT LẠC
        </button>

        {/* Nút Đồ Nhặt Được */}
        <button
          onClick={() => navigate("/found-items")}
          className={`px-8 py-4 font-semibold transition-all duration-300 border-2 ${isActive("/found-items")
              ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow-md scale-105"
              : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 hover:text-black border-gray-200 shadow hover:scale-110"
            } rounded-2xl`}
        >
          🎒 ĐỒ NHẶT ĐƯỢC
        </button>

        {/* Nút Đã Sở Hữu */}
        <button
          onClick={() => navigate("/owned-items")}
          className={`px-8 py-4 font-semibold transition-all duration-300 border-2 ${isActive("/owned-items")
              ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow-md scale-105"
              : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 hover:text-black border-gray-200 shadow hover:scale-110"
            } rounded-2xl`}
        >
          🛒 ĐÃ SỞ HỮU
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
