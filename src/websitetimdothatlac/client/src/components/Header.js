import React, { useEffect, useState, useRef } from 'react';
import { CiEdit } from "react-icons/ci";
import { FaFileAlt, FaSignOutAlt, FaUserEdit, FaUserPlus } from 'react-icons/fa';
import { IoLogInOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image/logotet.png';


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
  const defaultAvatarUrl = 'https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/454626691_475455135198002_8892504320904839500_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=w7tv1e0va6YQ7kNvgHmENI2&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=A2YC_L5iFrQSzS1iEH690qE&oh=00_AYCOwCeRxnAs0rCCPAeW61xdsL-UGEi8-7f6k49BSYdJnw&oe=677BDD48'; // URL avatar mặc định


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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    navigate('/');
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
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=1eb2d794501b0bd361102afe1b55fd33&lang=vi`
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
      <div className="p-4 shadow-md mb-0 flex flex-col justify-center items-center bg-gradient-to-r from-blue-300 to-yellow-200 text-white">
        {loadingWeather ? (
          <p className="text-center text-sm">Đang tải thông tin thời tiết...</p>
        ) : (
          <>
            <div className="flex justify-center items-center space-x-8 mb-4">
              {/* Vị trí */}
              <div className="flex items-center space-x-2 bg-white text-black p-2 rounded-2xl shadow">
                <span className="text-2xl">🌍</span>
                <span className="font-bold text-sm">{locationn}</span>
              </div>
              {/* Thời tiết */}
              <div className="flex items-center space-x-2 bg-white text-black p-2 rounded-2xl shadow">
                <span className="text-2xl">🌤️</span>
                <span className="font-bold text-sm">{weather}</span>
              </div>
              {/* Nhiệt độ */}
              <div className="flex items-center space-x-2 bg-white text-black p-2 rounded-2xl shadow">
                <span className="text-2xl">🌡️</span>
                <span className="font-bold text-sm">{temperature}°C</span>
              </div>
            </div>
            {/* Dòng chữ bổ sung */}
            <br></br>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-800 mb-4">TÌM ĐỒ THẤT LẠC NHANH CHÓNG!</p>
              <p className="text-lg text-gray-700 mb-6">Hãy tham gia cùng cộng đồng ... </p>
            </div>
          </>
        )}
      </div>

      <header className="bg-white px-4 py-4 border-b-2 shadow-sm">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="Logo"
              className="w-[600px] h-auto cursor-pointer hover:scale-110 transition-transform duration-300"
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
                <span className="text-gray-800 font-semibold">Xin chào, {userName}!</span>

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
                  className="flex items-center gap-1 text-white bg-blue-500 hover:bg-blue-700 rounded-2xl px-3 py-2 transition-all duration-300"
                  onClick={() => navigate('/new-post')}
                >
                  <FaFileAlt size={20} />
                  Đăng tin
                </button>

                {/* Nút Đăng xuất */}
                <button
                  className="flex items-center gap-1 bg-red-600 text-white py-2 px-4 rounded-2xl hover:bg-red-700"
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
                  className="flex items-center gap-1 text-black border-2 rounded-2xl px-3 py-2 hover:bg-gray-100 transition-all duration-300"
                  onClick={() => navigate('/login')}
                >
                  <IoLogInOutline size={25} />
                  Đăng nhập
                </button>

                {/* Đăng ký */}
                <button
                  className="flex items-center gap-1 text-black border-2 rounded-2xl px-3 py-2 hover:bg-gray-100 transition-all duration-300"
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

    </div >
  );
};

export default Header;
