import React, { useEffect, useState, useRef } from 'react';
import { CiEdit } from "react-icons/ci";
import { FaRegFileAlt, FaSignOutAlt, FaUserEdit, FaUserPlus } from 'react-icons/fa';
import { IoLogInOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image/logotick.png';


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [locationn, setLocationn] = useState('');
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState('');
  const [loadingWeather, setLoadingWeather] = useState(true);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatar, setAvatar] = useState('');
  const dropdownRef = useRef(null);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const defaultAvatarUrl = 'https://res.cloudinary.com/duk8odqun/image/upload/v1743125877/476391770_122209043942074558_1767895705772411631_n_npwi6o.jpg';


  // Đóng menu khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Đóng menu nếu nhấp bên ngoài
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    const avatarUrl = localStorage.getItem('avatar'); // Lấy avatar từ localStorage nếu có
    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
      setAvatar(avatarUrl || ''); // Thiết lập avatar nếu có, hoặc để trống
    }
  }, []);

  const handleLogout = async () => {
    setIsLoadingLogout(true); // Hiển thị loading
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      setIsLoggedIn(false);
      navigate('/'); // Điều hướng về trang chủ
      setIsLoadingLogout(false); // Tắt loading
    }, 1500); // Loading giả lập
  };

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          console.log('Latitude:', latitude, 'Longitude:', longitude);

          const locationRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=vi`
          );
          const locationData = await locationRes.json();
          console.log('Location Data:', locationData);

          setLocationn(locationData.city || locationData.locality || 'Không rõ vị trí');

          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=vi`
          );
          const weatherData = await weatherRes.json();
          console.log('Weather Data:', weatherData);

          if (weatherData.weather && weatherData.weather.length > 0) {
            setWeather(weatherData.weather[0].description || 'Không rõ thời tiết');
          } else {
            setWeather('Không rõ thời tiết');
          }

          setTemperature(weatherData.main?.temp || 'Không rõ nhiệt độ');
          setLoadingWeather(false);
        });
      } catch (error) {
        console.error('Lỗi khi lấy thông tin thời tiết:', error);
        setWeather('Không thể tải dữ liệu thời tiết');
        setTemperature('Không rõ nhiệt độ');
        setLoadingWeather(false);
      }
    };

    fetchLocationAndWeather();
  }, []);

  return (
    <div>
      <div className="p-2 shadow-md flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-blue-300 text-white">
        {loadingWeather ? (
          <p className="text-center text-sm">Đang tải thông tin thời tiết...</p>
        ) : (
          <>
            <div className="flex justify-center items-center space-x-8 mb-4">
              {/* Vị trí */}
              <div className="flex items-center space-x-2 bg-white text-black p-2 rounded-full shadow">
                <span className="text-2xl">🌍</span>
                <span className="font-bold text-sm">{locationn}</span>
              </div>
              {/* Thời tiết */}
              <div className="flex items-center space-x-2 bg-white text-black p-2 rounded-full shadow">
                <span className="text-2xl">🌤️</span>
                <span className="font-bold text-sm">{weather}</span>
              </div>
              {/* Nhiệt độ */}
              <div className="flex items-center space-x-2 bg-white text-black p-2 rounded-full shadow">
                <span className="text-2xl">🌡️</span>
                <span className="font-bold text-sm">{temperature}°C</span>
              </div>
            </div>
            {/* Dòng chữ bổ sung */}
            <div className="text-center">
              <p className="text-4xl font-bold text-white mb-4">TÌM ĐỒ THẤT LẠC NHANH CHÓNG!</p>
              <p className="text-lg text-white mb-6">Hãy tham gia cùng cộng đồng ... </p>
            </div>
          </>
        )}
      </div>
      <header className="bg-white px-4 py-4 shadow-sm border-2">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="Logo"
              className="w-[450px] h-auto cursor-pointer hover:scale-110 transition-transform duration-300"
              onClick={() => navigate('/')}
            />
          </div>

          {/* Spacer để cố định khoảng cách */}
          <div className="flex-grow"></div>

          {/* Nút điều hướng */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Xin chào tên người dùng */}
                <span className="text-black font-semibold">Xin chào, {userName}!</span>

                {/* Avatar và menu thả xuống */}
                <div className="relative">
                  <img
                    src={avatar || defaultAvatarUrl}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full cursor-pointer border-2 border-gray-300"
                    onClick={() => setShowDropdown(!showDropdown)}
                  />

                  {/* Menu thả xuống */}
                  {showDropdown && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-2xl z-50 shadow-md"
                    >
                      <button
                        className="flex items-center gap-1 px-4 py-2 w-full text-black hover:bg-gray-100 rounded-2xl transition-all duration-300"
                        onClick={() => {
                          setShowDropdown(false);
                          navigate('/edit-profile');
                        }}
                      >
                        <FaUserEdit size={20} />
                        Chỉnh sửa thông tin
                      </button>

                      <button
                        className="flex items-center gap-1 px-4 py-2 w-full text-black hover:bg-gray-100 rounded-2xl transition-all duration-300"
                        onClick={() => {
                          setShowDropdown(false);
                          navigate('/my-posts');
                        }}
                      >
                        <CiEdit size={25} />
                        Chỉnh sửa bài đăng
                      </button>
                    </div>
                  )}
                </div>


                {/* Nút Đăng tin */}
                <button
                  className="flex items-center gap-1 text-black border-2 hover:scale-110 rounded-full px-5 py-3 transition-all duration-300"
                  onClick={() => navigate('/new-post')}
                >
                  <FaRegFileAlt size={20} className='text-black' />
                  Đăng tin
                </button>

                {/* Nút Đăng xuất */}
                <button
                  className="flex items-center justify-center gap-1 bg-red-600 text-white px-5 py-3 rounded-full hover:bg-red-700"
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
                  className="flex items-center justify-center gap-1 text-black border-2 rounded-full px-5 py-3 hover:scale-110 hover:bg-gray-100 transition-all duration-300"
                  onClick={() => navigate('/login')}
                >
                  <IoLogInOutline size={25} />
                  Đăng nhập
                </button>

                {/* Đăng ký */}
                <button
                  className="flex items-center justify-center gap-1 text-black border-2 rounded-full px-5 py-3 hover:scale-110 hover:bg-gray-100 transition-all duration-300"
                  onClick={() => navigate('/register')}
                >
                  <FaUserPlus size={20} />
                  Đăng ký
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hiệu ứng Loading */}
      {isLoadingLogout && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-white mb-6"></div>
        </div>
      )}
    </div >
  );
};

export default Header;
