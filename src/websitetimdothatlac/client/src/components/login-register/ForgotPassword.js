import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      const res = await axios.post(`https://cn-da21tta-nguyenanhtuan.onrender.com/api/auth/forgot-password`, { email });
      setMessage(res.data.message);
      setTimeout(() => {
        navigate(`/reset-password?email=${email}`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-6">
      {/* Loading hiệu ứng */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 mb-6"></div>
          <p className="text-white text-2xl font-bold animate-pulse">
            📧 Đang gửi mã OTP...
          </p>
        </div>
      )}

      {/* Form quên mật khẩu */}
      <div className="relative bg-white shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17a1 1 0 11-2 0v-.07A7.003 7.003 0 015 10a1 1 0 012 0 5 5 0 105 5 1 1 0 010 2zm0-4.43a3.002 3.002 0 01-2-5.65 1 1 0 112 0 3 3 0 010 5.65z"></path>
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-center text-gray-700 mb-6">
          Quên Mật Khẩu
        </h2>

        {message && (
          <div className="mb-4 text-center text-green-600 font-semibold animate-pulse">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 text-center text-red-500 font-semibold animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSendOtp} className="space-y-6">
          {/* Input Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <span className="absolute left-4 top-3 text-gray-400">📧</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
          >
            🚀 Gửi Mã OTP
          </button>
        </form>

        {/* Quay lại đăng nhập */}
        <div className="mt-6 text-center text-gray-500">
          <p>
            Đã nhớ mật khẩu?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>

      {/* Hiệu ứng nền */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900 opacity-20 rounded-3xl filter blur-3xl"></div>
    </div>
  );
};

export default ForgotPassword;
