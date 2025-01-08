import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../assets/image/logotvu.png';
// import logo2 from '../assets/image/logotet.png';
// import caymai from '../assets/image/caymai.png';
// import caymaiphai from '../assets/image/caymaiphai.png';


const Footer = () => {
  return (
    <footer className="bg-gradient-to-r bg-white text-black py-12 px-6 border-2">
      {/* Testimonial Section */}
      <section className="bg-gray-100 py-10 px-4 text-center border-2 rounded-2xl max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Phản hồi từ người dùng</h2>
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-gray-700 mb-4 italic">"Website này thật tuyệt vời! Tôi đã tìm lại được ví tiền chỉ trong vài giờ sau khi đăng tin."</p>
            <p className="text-sm font-bold text-gray-800 whitespace-nowrap">Anh Nguyễn Văn Tùng - Hồ Chí Minh</p>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-gray-700 mb-4 italic">"Cộng đồng rất thân thiện và hỗ trợ nhau rất nhiệt tình. Đây là nơi đáng tin cậy."</p>
            <p className="text-sm font-bold text-gray-800 whitespace-nowrap">Chị Kim Thị Quế Trân - Quãng Ngãi</p>
          </div>
          {/* Testimonial 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-gray-700 mb-4 italic">"Dịch vụ rất nhanh chóng và tiện lợi. Tôi rất biết ơn đội ngũ phát triển!"</p>
            <p className="text-sm font-bold text-gray-800 whitespace-nowrap">Anh Nguyễn Thanh Tùng - Thái Bình</p>
          </div>
        </div>
      </section>

      {/* Đường ngang */}
      {/* <hr className="border-t border-gray-400 my-8 w-1/2 mx-auto" /> */}

      {/* Logo bổ sung phía dưới */}
      {/* <div className="flex justify-between items-center mt-8 w-full"> */}
        {/* Cành mai bên trái */}
        {/* <img
          src={caymai}
          alt="Cành mai bên phải"
          className="w-[500px] h-auto object-contain absolute left-0"
        /> */}
        {/* Logo chính giữa */}
        {/* <img
          src={logo2}
          alt="Logo Bổ Sung"
          className="w-[750px] h-auto object-contain mx-auto z-10"
        /> */}

        {/* Cành mai bên phải */}
        {/* <img
          src={caymaiphai}
          alt="Cành mai bên phải"
          className="w-[500px] h-auto object-contain absolute right-0"
        />
      </div> */}


      {/* Đường ngang */}
      <hr className="border-t border-gray-400 my-8" />

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
              Copyright &copy; 2025 Website Tìm Đồ Thất Lạc - Nguyễn Anh Tuấn - 110121123 - DA21TTA - TVU
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
      
    </footer>
  );
};

export default Footer;
