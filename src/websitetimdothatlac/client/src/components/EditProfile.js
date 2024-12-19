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
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, email, phone, zalo, fbUrl } = response.data;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setZalo(zalo || "");
        setFbUrl(fbUrl || "");
      } catch (error) {
        const message =
          error.response?.data?.message || "Không thể tải thông tin người dùng.";
        setNotification({ message: `❌ ${message}`, type: "error" }); // Thay thế setErrorMessage
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu trạng thái loading
  
    // Kiểm tra phone và zalo
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      setNotification({ message: "❌ Số điện thoại phải có đúng 10 số.", type: "error" });
      setLoading(false);
      return;
    }
  
    if (zalo.length !== 0 && (!/^\d{10}$/.test(zalo) || zalo.length !== 10)) {
      setNotification({ message: "❌ Zalo phải có đúng 10 số nếu bạn nhập.", type: "error" });
      setLoading(false);
      return;
    }
  
    setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          "http://localhost:5000/api/auth/update",
          { name, email, phone, zalo, fbUrl },
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        setNotification({ message: "Cập nhật thông tin cá nhân thành công!", type: "success" });
      } catch (error) {
        const message =
          error.response?.data?.message || "Cập nhật thất bại. Vui lòng thử lại.";
        setNotification({ message: `❌ ${message}`, type: "error" });
      } finally {
        setLoading(false); // Kết thúc loading
      }
    }, 2000); // Thêm delay 2 giây
  };
  



  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 relative">
      {/* Thông báo */}
      {notification.message && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl text-center max-w-md relative">
            {/* Dấu check màu xanh */}
            {notification.type === "success" && (
              <div className="flex justify-center mb-4">
                <div className="bg-green-500 text-white rounded-full h-12 w-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* Nội dung thông báo */}
            <p className="text-lg font-semibold text-gray-800 mb-4">
              {notification.message}
            </p>

            {/* Nút đóng thông báo */}
            <button
              onClick={() => setNotification({ message: "", type: "" })}
              className="mt-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}


      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-white mb-6"></div>
          <p className="text-white text-2xl font-bold">Đang xử lý, vui lòng đợi...</p>
        </div>
      )}

      {/* Nút quay về trang chủ */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
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
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  setPhone(value);
                }
              }}
              placeholder="Nhập đúng 10 số"
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
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  setZalo(value);
                }
              }}
              placeholder="Nhập đúng 10 số"
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
