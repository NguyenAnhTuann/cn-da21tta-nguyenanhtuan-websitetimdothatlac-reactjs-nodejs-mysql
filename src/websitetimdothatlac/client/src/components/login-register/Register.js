import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zalo, setZalo] = useState('');
  const [fbUrl, setFbUrl] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) {
      return 'Yếu';
    } else if (password.length < 10) {
      return 'Trung bình';
    } else {
      return 'Mạnh';
    }
  };


  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setErrorMessage('❌ Số điện thoại phải bao gồm đúng 10 chữ số!');
      setIsLoading(false);
      return;
    }

    if (zalo && !phoneRegex.test(zalo)) {
      setErrorMessage('❌ Số Zalo phải bao gồm đúng 10 chữ số!');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('❌ Mật khẩu không khớp. Vui lòng nhập lại!');
      setIsLoading(false);
      return;
    }

    const formattedFbUrl = fbUrl.startsWith('facebook.com') ? `https://${fbUrl}` : fbUrl;

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        phone,
        password,
        zalo,
        fbUrl: formattedFbUrl,
      });
      setSuccessMessage('🎉 Đăng ký thành công! Đang chuyển hướng...');
    } catch (error) {
      setErrorMessage('❌ Đăng ký thất bại, vui lòng thử lại.');
      console.error('Đăng ký lỗi:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div
      className="relative min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat p-6"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/duk8odqun/image/upload/v1735644020/Logotimdothatlac_1_qdrlei.png')`,
      }}
    >
      {/* Loading và thông báo thành công */}
      {successMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-white mb-6"></div>
          <p className="text-white text-2xl font-bold animate-pulse">
            {successMessage}
          </p>
        </div>
      )}

      {/* Form đăng ký */}
      <div className="relative bg-white shadow-2xl rounded-2xl px-8 py-10 w-full max-w-lg z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17a1 1 0 11-2 0v-.07A7.003 7.003 0 015 10a1 1 0 012 0 5 5 0 105 5 1 1 0 010 2zm0-4.43a3.002 3.002 0 01-2-5.65 1 1 0 112 0 3 3 0 010 5.65z" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-center text-gray-700 mb-6">
          Đăng ký tài khoản
        </h2>

        {errorMessage && (
          <div className="mb-4 text-center text-red-500 font-semibold animate-pulse">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Tên */}
          <div className="relative">
            <input
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
            <span className="absolute left-4 top-3 text-gray-400">👤</span>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
            <span className="absolute left-4 top-3 text-gray-400">📧</span>
          </div>

          {/* Số điện thoại */}
          <div className="relative">
            <input
              type="text"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))} // Chỉ cho phép nhập số
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />

            <span className="absolute left-4 top-3 text-gray-400">📞</span>
          </div>

          {/* Zalo */}
          <div className="relative">
            <input
              type="text"
              placeholder="Zalo"
              value={zalo}
              onChange={(e) => setZalo(e.target.value.replace(/[^0-9]/g, ''))} // Chỉ cho phép nhập số
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />

            <span className="absolute left-4 top-3 text-gray-400">💬</span>
          </div>

          {/* Facebook URL */}
          <div className="relative">
            <input
              type="text"
              placeholder="Facebook URL"
              value={fbUrl}
              onChange={(e) => setFbUrl(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <span className="absolute left-4 top-3 text-gray-400">🔗</span>
          </div>

          {/* Mật khẩu */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'} // Đổi loại input
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordStrength(evaluatePasswordStrength(e.target.value)); // Đánh giá độ mạnh mật khẩu
              }}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <span className="absolute left-4 top-3 text-gray-400">🔒</span>
            <span
              className="absolute right-4 top-3 text-gray-400 cursor-pointer"
              onMouseEnter={() => setShowPassword(true)} // Hiển thị mật khẩu khi rê chuột vào
              onMouseLeave={() => setShowPassword(false)} // Ẩn mật khẩu khi rời chuột
            >
              👁️
            </span>
          </div>

          {/* Nhập lại mật khẩu */}
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'} // Đổi loại input
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <span className="absolute left-4 top-3 text-gray-400">🔒</span>
            <span
              className="absolute right-4 top-3 text-gray-400 cursor-pointer"
              onMouseEnter={() => setShowConfirmPassword(true)} // Hiển thị mật khẩu khi rê chuột vào
              onMouseLeave={() => setShowConfirmPassword(false)} // Ẩn mật khẩu khi rời chuột
            >
              👁️
            </span>
          </div>



          <div className="w-full h-2 bg-gray-200 rounded mt-2 relative">
            <div
              className={`h-full rounded transition-all duration-300 ${passwordStrength === 'Yếu'
                ? 'bg-red-500 w-1/3' // Yếu: 1/3 thanh
                : passwordStrength === 'Trung bình'
                  ? 'bg-yellow-500 w-2/3' // Trung bình: 2/3 thanh
                  : 'bg-green-500 w-full' // Mạnh: Full thanh
                }`}
            ></div>
          </div>



          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? '⏳ Đang xử lý...' : '🚀 Đăng ký'}
          </button>
        </form>

        {/* Điều hướng đăng nhập */}
        <div className="mt-6 text-center text-gray-500">
          <p>
            Đã có tài khoản?{" "}
            <a
              href="/login"
              className="text-green-600 hover:underline font-medium"
            >
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Register;
