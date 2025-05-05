import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaMapMarkerAlt, FaCalendarAlt, FaUpload, FaHome } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

// Fix icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Đồ thất lạc");
  const [address, setAddress] = useState("");
  const [created, setCreated] = useState("");
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState({ lat: 10.762622, lng: 106.660172 });
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false); // Thêm state loading
  const navigate = useNavigate();

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
          if (data?.display_name) setAddress(data.display_name);
        } catch (error) {
          console.error("Lỗi lấy địa chỉ:", error);
        }
      },
    });
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("created", created);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("lat", position.lat);
    formData.append("lng", position.lng);

    setLoading(true); // Kích hoạt trạng thái loading

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Phản hồi từ server:", data);
        setLoading(false);
        if (data.message.includes("thành công")) {
          setNotification({ message: "🎉 " + data.message, type: "success" });
          setTimeout(() => navigate("/"), 2000);
        } else {
          throw new Error(data.message || "Lỗi tạo bài viết, vui lòng thử lại.");
        }
      })
      .catch((err) => {
        console.error("Lỗi:", err.message);
        setLoading(false);
        setNotification({
          message: "❌ Đã xảy ra lỗi: " + err.message,
          type: "error",
        });
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border-2 my-10">
      {/* Nút quay về trang chủ */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition flex items-center"
        >
          <FaHome className="mr-2" />
          Quay về trang chủ
        </button>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-white mb-6"></div>
          <p className="text-white text-2xl font-bold">Đang xử lý, vui lòng đợi...</p>
        </div>
      )}
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
          </div>
        </div>
      )}

      {/* Làm mờ nội dung khi loading hoặc có thông báo */}
      <div
        className={`${loading || notification.message ? "opacity-50 pointer-events-none" : ""
          }`}
      >
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-6 flex items-center justify-center gap-2">
          <FaEdit /> Đăng Tin Mới
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {/* Upload hình ảnh */}
          <div className="flex items-center gap-3">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border border-gray-300 rounded-lg w-full px-4 py-2"
              required
            />
          </div>

          {/* Tiêu đề */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tiêu đề bài đăng"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              required
            />
            <FaEdit className="absolute left-3 top-3 text-black" />
          </div>

          {/* Thể loại */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            >
              <option value="Đồ thất lạc">Đồ thất lạc</option>
              <option value="Đồ nhặt được">Đồ nhặt được</option>
            </select>
            <FaMapMarkerAlt className="absolute left-3 top-3 text-black" />
          </div>

          {/* Ngày */}
          <div className="relative">
            <input
              type="date"
              value={created}
              onChange={(e) => setCreated(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              required
            />
            <FaCalendarAlt className="absolute left-3 top-3 text-black" />
          </div>

          {/* Địa chỉ */}
          <div className="relative">
            <input
              type="text"
              placeholder="Địa chỉ hoặc tên địa điểm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <FaMapMarkerAlt className="absolute left-3 top-3 text-black" />
          </div>

          {/* Bản đồ */}
          <div className="w-full h-80 rounded-lg overflow-hidden">
            <MapContainer center={position} zoom={15} style={{ width: "100%", height: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position} />
              <MapClickHandler />
            </MapContainer>
          </div>

          {/* Mô tả */}
          <textarea
            placeholder="Mô tả chi tiết"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            rows="5"
            required
          ></textarea>

          {/* Nút Submit */}
          <button
            type="submit"
            className="flex items-center gap-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            <FaUpload size={18} /> Đăng tin
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
