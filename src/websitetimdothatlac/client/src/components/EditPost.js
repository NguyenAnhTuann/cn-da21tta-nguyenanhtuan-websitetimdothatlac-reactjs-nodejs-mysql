import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

// Fix icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const EditPost = () => {
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [position, setPosition] = useState({ lat: 10.762622, lng: 106.660172 });
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Không thể tải chi tiết bài đăng.");
        const data = await response.json();

        // Gán dữ liệu bài đăng mà không thay đổi giá trị `created`
        setPost(data);
        setAddress(data.address);

        if (data.lat && data.lng) {
          setPosition({ lat: data.lat, lng: data.lng });
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };


    fetchPostDetails();
  }, [id]);


  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/posts/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...post,
          address,
          lat: position.lat,
          lng: position.lng,
          created: post.created, // Không thay đổi giá trị `created`
        }),
      });

      if (!response.ok) throw new Error("Không thể cập nhật bài đăng.");
      setNotification({ message: "🎉 Cập nhật bài đăng thành công!", type: "success" });
    } catch (error) {
      setNotification({ message: `❌ ${error.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };




  const handleDelete = () => {
    setNotification({
      message: "Bạn có chắc chắn muốn xóa bài đăng này không?",
      type: "confirm",
      action: "delete",
    });
  };

  const handleDeleteConfirmed = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/posts/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Không thể xóa bài đăng.");
      setNotification({ message: "🗑 Xóa bài đăng thành công!", type: "success" });
    } catch (error) {
      setNotification({ message: `❌ ${error.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };




  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await response.json();
          if (data && data.display_name) {
            setAddress(data.display_name);
          }
        } catch (error) {
          console.error("Lỗi khi lấy địa chỉ từ tọa độ:", error);
        }
      },
    });
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });

    if (name === "address") {
      setAddress(value);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-white mb-6"></div>
          <p className="text-white text-2xl font-bold">Đang xử lý, vui lòng đợi...</p>
        </div>
      )}

      {/* Thông báo chung */}
      {notification.message && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl text-center max-w-md relative">
            {/* Icon cho từng loại thông báo */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
            {notification.type === "error" && (
              <div className="flex justify-center mb-4">
                <div className="bg-red-500 text-white rounded-full h-12 w-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            )}
            {notification.type === "confirm" && (
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-500 text-white rounded-full h-12 w-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            )}

            {/* Nội dung thông báo */}
            <p className="text-lg font-semibold text-gray-800 mb-6">{notification.message}</p>

            {/* Nút hành động */}
            {notification.type === "confirm" ? (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setNotification({ message: "", type: "" })}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Xác nhận
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setNotification({ message: "", type: "" });
                  if (notification.type === "success") {
                    navigate("/my-posts");
                  }
                }}
                className="text-black px-4 py-2 rounded-md hover:bg-gray-500 transition border-2"
              >
                Đóng
              </button>

            )}
          </div>
        </div>
      )}



      <div className="relative bg-white shadow-2xl rounded-2xl px-8 py-10 w-full max-w-3xl z-10">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Chỉnh Sửa Bài Đăng</h2>
        {errorMessage && (
          <div className="mb-4 text-center text-red-500 font-semibold animate-pulse">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Tiêu đề */}
          <div className="relative">
            <input
              type="text"
              name="title"
              value={post.title || ""}
              onChange={handleChange}
              placeholder="Tiêu đề"
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <span className="absolute left-4 top-3 text-gray-400">📝</span>
          </div>

          {/* Mô tả */}
          <textarea
            name="description"
            value={post.description || ""}
            onChange={handleChange}
            placeholder="Mô tả"
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          ></textarea>

          {/* Thể loại */}
          <select
            name="category"
            value={post.category || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Đồ thất lạc">Đồ thất lạc</option>
            <option value="Đồ nhặt được">Đồ nhặt được</option>
          </select>

          {/* Ngày tạo */}
          <div className="relative">
            <input
              type="date"
              name="created"
              value={post.created || ""} // Giá trị gốc từ cơ sở dữ liệu
              onChange={handleChange}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />

            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              📅
            </span>
          </div>


          {/* Địa chỉ */}
          <div className="relative">
            <input
              type="text"
              placeholder="Địa chỉ hoặc tên địa điểm"
              value={address || ""}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <span className="absolute left-4 top-3 text-gray-400">📍</span>
          </div>


          {/* Bản đồ */}
          <div className="w-full h-[300px] rounded-lg overflow-hidden">
            <MapContainer center={position} zoom={15} style={{ width: "100%", height: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position} />
              <MapClickHandler />
            </MapContainer>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              💾 Cập nhật
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
              onClick={handleDelete}
            >
              🗑 Xóa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
