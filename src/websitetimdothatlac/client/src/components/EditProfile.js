import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHome, FaUser, FaEnvelope, FaPhone, FaFacebook, FaMobileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zalo, setZalo] = useState('');
  const [fbUrl, setFbUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, email, phone, zalo, fbUrl } = response.data;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setZalo(zalo || '');
        setFbUrl(fbUrl || '');
      } catch (error) {
        const message = error.response?.data?.message || 'Không thể tải thông tin người dùng.';
        setErrorMessage(message);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/auth/update',
        { name, email, phone, zalo, fbUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage(response.data.message);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      const message = error.response?.data?.message || 'Cập nhật thất bại. Vui lòng thử lại.';
      setErrorMessage(message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 relative">

      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 text-black py-2 px-4 rounded-lg bg-gray-300 hover:bg-gray-400 transition flex items-center"
        >
          <FaHome className="mr-2" />
          Quay về trang chủ
        </button>
      </div>

      {/* Form chỉnh sửa thông tin */}
      <div className="relative bg-white shadow-2xl rounded-lg px-8 py-8 w-full max-w-lg mt-16">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-black">
          Chỉnh sửa thông tin cá nhân
        </h2>

        {/* Thông báo thành công */}
        {successMessage && (
          <div className="mb-4 bg-green-100 text-green-700 p-3 rounded-md shadow-md">
            {successMessage}
          </div>
        )}

        {/* Thông báo lỗi */}
        {errorMessage && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-md shadow-md">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Tên */}
          <div>
            <label className="text-gray-700 font-medium mb-2 flex items-center">
              <FaUser className="mr-2 text-black" /> Tên:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium mb-2 flex items-center">
              <FaEnvelope className="mr-2 text-black" /> Email:
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="text-gray-700 font-medium mb-2 flex items-center">
              <FaPhone className="mr-2 text-black" /> Số điện thoại:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Zalo */}
          <div>
            <label className="text-gray-700 font-medium mb-2 flex items-center">
              <FaMobileAlt className="mr-2 text-black" /> Zalo:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={zalo}
              onChange={(e) => setZalo(e.target.value)}
            />
          </div>

          {/* Facebook URL */}
          <div>
            <label className="text-gray-700 font-medium mb-2 flex items-center">
              <FaFacebook className="mr-2 text-black" /> Facebook URL:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={fbUrl}
              onChange={(e) => setFbUrl(e.target.value)}
            />
          </div>

          {/* Nút cập nhật */}
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
