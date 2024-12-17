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

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        phone,
        password,
        zalo,
        fbUrl,
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
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
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
              onChange={(e) => setPhone(e.target.value)}
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
              onChange={(e) => setZalo(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <span className="absolute left-4 top-3 text-gray-400">💬</span>
          </div>

          {/* Facebook URL */}
          <div className="relative">
            <input
              type="url"
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
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
            <span className="absolute left-4 top-3 text-gray-400">🔒</span>
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

      {/* Hiệu ứng nền */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-500 opacity-30 rounded-3xl filter blur-3xl"></div>
    </div>
  );
};

export default Register;
