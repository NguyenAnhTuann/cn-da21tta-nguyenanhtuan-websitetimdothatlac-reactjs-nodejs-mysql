import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../assets/image/logotvu.png';
import logo2 from '../assets/image/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 text-black py-12 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Thông tin liên hệ và mạng xã hội - Bên trái */}
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold text-blue-600 mb-4 whitespace-nowrap">
            LIÊN HỆ ADMIN HỖ TRỢ ĐĂNG TIN VỀ ĐỒ THẤT LẠC
          </h2>
          <div className="flex flex-col space-y-2 mb-6">
            <a
              href="mailto:nguyenanhtuan.profile@gmail.com"
              className="text-lg hover:text-blue-700 transition-colors duration-300"
            >
              Email: nguyenanhtuan.profile@gmail.com
            </a>
            <a
              href="tel:+84869094929"
              className="text-lg hover:text-blue-700 transition-colors duration-300"
            >
              Phone/Zalo: 0869094929
            </a>
            <p className="text-lg text-gray-600 mt-2">
              Copyright &copy; 2024 Website Tìm Đồ Thất Lạc - Nguyễn Anh Tuấn - 110121123 - DA21TTA - TVU
            </p>
          </div>

          {/* Icon Mạng Xã Hội */}
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/NguyenAnhTuxn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-blue-600 transition-all duration-300"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://x.com/nguyenanhtuan__"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-blue-400 transition-all duration-300"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/ngg-anhtuan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-blue-700 transition-all duration-300"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/NguyenAnhTuann"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-black transition-all duration-300"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>

        {/* Logo lớn - Bên phải */}
        <div className="flex-1 flex justify-end">
          <img
            src={logo}
            alt="Logo"
            className="w-64 h-auto object-contain"
          />
        </div>
      </div>

      {/* Đường ngang */}
      <hr className="border-t border-gray-400 my-8" />

      {/* Logo bổ sung phía dưới */}
      <div className="flex justify-center mt-8">
        <img
          src={logo2}
          alt="Logo Bổ Sung"
          className="w-100 h-auto object-contain"
        />
      </div>
    </footer>
  );
};

export default Footer;
