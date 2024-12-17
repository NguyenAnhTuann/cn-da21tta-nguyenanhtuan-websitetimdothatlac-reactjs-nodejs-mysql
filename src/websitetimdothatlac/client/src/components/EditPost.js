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
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [position, setPosition] = useState({ lat: 10.762622, lng: 106.660172 });
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Không thể tải chi tiết bài đăng.");
        const data = await response.json();
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
        }),
      });
      if (!response.ok) throw new Error("Không thể cập nhật bài đăng.");

      alert("Cập nhật bài đăng thành công!");
      navigate("/my-posts");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài đăng này không?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/posts/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Không thể xóa bài đăng.");
      alert("Xóa bài đăng thành công!");
      navigate("/my-posts");
    } catch (error) {
      setErrorMessage(error.message);
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
