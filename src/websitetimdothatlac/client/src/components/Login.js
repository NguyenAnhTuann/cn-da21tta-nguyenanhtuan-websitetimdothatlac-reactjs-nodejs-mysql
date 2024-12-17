import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
    
      const { token, role, name } = response.data;
    
      localStorage.setItem('token', token);
      localStorage.setItem('userName', name);
      localStorage.setItem('role', role);
    
      setSuccessMessage(true);
    
      setTimeout(() => {
        if (role === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/';
        }
      }, 1500);
    } catch (error) {
      setErrorMessage('❌ Sai email hoặc mật khẩu. Vui lòng thử lại!');
      console.error('Đăng nhập lỗi:', error);
    }
  };    

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-6">
      {/* Loading và thông báo thành công */}
      {successMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 mb-6"></div>
          <p className="text-white text-2xl font-bold animate-pulse">
            🎉 Đăng nhập thành công! Đang chuyển hướng...
          </p>
        </div>
      )}

      {/* Form đăng nhập */}
      <div className="relative bg-white shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17a1 1 0 11-2 0v-.07A7.003 7.003 0 015 10a1 1 0 012 0 5 5 0 105 5 1 1 0 010 2zm0-4.43a3.002 3.002 0 01-2-5.65 1 1 0 112 0 3 3 0 010 5.65z"
              ></path>
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-center text-gray-700 mb-6">
          Đăng nhập tài khoản
        </h2>

        {errorMessage && (
          <div className="mb-4 text-center text-red-500 font-semibold animate-pulse">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <span className="absolute left-4 top-3 text-gray-400">
              📧
            </span>
          </div>

          {/* Mật khẩu */}
          <div className="relative">
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <span className="absolute left-4 top-3 text-gray-400">
              🔒
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? '⏳ Đang xử lý...' : '🚀 Đăng nhập'}
          </button>
        </form>

        {/* Đăng ký & Quên mật khẩu */}
        <div className="mt-6 text-center text-gray-500">
          <p>
            Chưa có tài khoản?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Đăng ký ngay
            </a>
          </p>
          <p className="mt-2">
            <a
              href="/forgot-password"
              className="text-blue-600 hover:underline font-medium"
            >
              Quên mật khẩu?
            </a>
          </p>
        </div>
      </div>

      {/* Hiệu ứng nền */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900 opacity-20 rounded-3xl filter blur-3xl"></div>
    </div>
  );
};

export default Login;
