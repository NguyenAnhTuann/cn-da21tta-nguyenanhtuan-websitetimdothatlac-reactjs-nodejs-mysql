import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUserEdit, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
import { IoLogInOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import logo from '../assets/image/logo.png';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [locationn, setLocationn] = useState('');
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState('');
  const [loadingWeather, setLoadingWeather] = useState(true);
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
  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          // Debug vị trí
          console.log('Latitude:', latitude, 'Longitude:', longitude);

          // Lấy thông tin vị trí
          const locationRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=vi`
          );
          const locationData = await locationRes.json();
          console.log('Location Data:', locationData);

          setLocationn(locationData.city || locationData.locality || 'Không rõ vị trí');

          // Lấy thông tin thời tiết
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
      <div
        className="p-4 shadow-md mb-6 flex justify-center items-center space-x-8 bg-blue-400"
      >
        {loadingWeather ? (
          <p className="text-center text-sm text-gray-500">Đang tải thông tin thời tiết...</p>
        ) : (
          <>
            {/* Vị trí */}
            <div className="flex items-center space-x-2 bg-white p-2 rounded-2xl shadow">
              <span className="text-2xl">🌍</span>
              <span className="font-bold text-gray-700 text-sm">{locationn}</span>
            </div>
            {/* Thời tiết */}
            <div className="flex items-center space-x-2 bg-white p-2 rounded-2xl shadow">
              <span className="text-2xl">🌤️</span>
              <span className="font-bold text-gray-700 text-sm">{weather}</span>
            </div>
            {/* Nhiệt độ */}
            <div className="flex items-center space-x-2 bg-white p-2 rounded-2xl shadow">
              <span className="text-2xl">🌡️</span>
              <span className="font-bold text-gray-700 text-sm">{temperature}°C</span>
            </div>
          </>
        )}
      </div>


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
                className="flex items-center gap-1 text-black hover:bg-gray-200 hover:rounded-xl px-3 py-2 transition-all duration-300 border-2 rounded-2xl"
                onClick={() => navigate('/edit-profile')}
              >
                <FaUserEdit size={20} />
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
                className="flex items-center gap-1 text-black hover:bg-gray-200 hover:rounded-xl px-3 py-2 transition-all duration-300 border-2 rounded-2xl"
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
                className="flex items-center gap-1 text-black hover:bg-gray-200 hover:rounded-xl px-3 py-2 transition-all duration-300 border-2 rounded-2xl"
                onClick={() => navigate('/login')}
              >
                <IoLogInOutline size={25} />
                Đăng nhập
              </button>

              {/* Đăng ký */}
              <button
                className="flex items-center gap-1 text-black hover:bg-gray-200 hover:rounded-xl px-3 py-2 transition-all duration-300 border-2 rounded-2xl"
                onClick={() => navigate('/register')}
              >
                <FaUserPlus size={20} />
                Đăng ký
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
