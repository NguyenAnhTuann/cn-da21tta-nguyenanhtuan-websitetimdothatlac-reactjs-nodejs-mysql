import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { FaHome, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import "leaflet/dist/leaflet.css";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [position, setPosition] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!response.ok) throw new Error("Không thể tải chi tiết bài đăng.");
        const data = await response.json();
        setPost(data);

        if (data.lat && data.lng) {
          setPosition({ lat: data.lat, lng: data.lng });
        } else {
          const geoResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              data.address
            )}&format=json`
          );
          const geoData = await geoResponse.json();
          if (geoData && geoData.length > 0) {
            const { lat, lon } = geoData[0];
            setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
          }
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchPostDetails();
  }, [id]);

  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;
  if (!post) return <p>Đang tải...</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const getCategoryStyle = (category) => {
    return category === "Đồ nhặt được"
      ? "text-green-800 bg-green-200 px-4 py-2 rounded-full font-semibold uppercase tracking-wide"
      : "text-red-800 bg-red-200 px-4 py-2 rounded-full font-semibold uppercase tracking-wide";
  };

  return (
    <div
      className="bg-contain bg-no-repeat bg-center min-h-screen flex justify-center bg-white border-b-2 shadow-sm"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/duk8odqun/image/upload/v1735644020/Logotimdothatlac_1_qdrlei.png')`,
      }}
    >
      <div className="w-full max-w-[1200px] flex justify-between items-center px-4 py-4">
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border-2 my-10">
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition flex items-center"
            >
              <FaHome className="mr-2" />
              Quay về trang chủ
            </button>
          </div>

          {/* Thông tin chi tiết bài đăng */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Hình ảnh bài đăng */}
              <div className="flex-shrink-0">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full md:w-96 h-auto object-cover rounded-lg shadow-md border border-gray-300"
                  onError={(e) => {
                    e.target.src = "https://www.hoteljob.vn/files/Dung/do%20that%20lac.png";
                    e.target.alt = "Hình ảnh không tồn tại";
                  }}
                />
              </div>
              {/* Nội dung chi tiết */}
              <div className="flex-1">
                {/* Tiêu đề */}
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  {post.title}
                </h2>

                {/* Loại bài đăng */}
                <p className={`inline-block ${getCategoryStyle(post.category)} px-3 py-1 rounded-full text-sm font-medium`}>
                  {post.category}
                </p>

                {/* Thông tin bài đăng */}
                <div className="mt-6 space-y-4">
                  <p className="text-gray-600">
                    <strong className="text-gray-800">📅 Ngày:</strong> {formatDate(post.created)}
                  </p>
                  <p className="text-gray-600">
                    <strong className="text-gray-800">📍 Địa chỉ:</strong> {post.address}
                  </p>
                  <p className="text-gray-600">
                    <strong className="text-gray-800">📝 Mô tả:</strong> {post.description}
                  </p>
                  <p className="text-gray-600">
                    <strong className="text-gray-800">👤 Người đăng:</strong> {post.name}
                  </p>
                  <p className="text-gray-600">
                    <strong className="text-gray-800">📞 Điện thoại:</strong> {post.phone}
                  </p>
                  <p className="text-gray-600">
                    <strong className="text-gray-800">📱 Zalo:</strong> {post.zalo}
                  </p>
                  <p className="text-gray-600">
                    <strong className="text-gray-800">🔗 Facebook:</strong>{" "}
                    {post.fbUrl ? (
                      <a
                        href={post.fbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {post.fbUrl}
                      </a>
                    ) : (
                      "Không có"
                    )}
                  </p>
                  {/* Nút liên hệ nhanh */}
                  <div className="mt-6 flex gap-4">
                    <a
                      href={`tel:${post.phone}`}
                      className="flex items-center gap-2 text-black border-2 py-2 px-4 rounded-2xl hover:bg-gray-200 transition"
                    >
                      <FaPhoneAlt />
                      Gọi điện
                    </a>
                    <a
                      href={`https://zalo.me/${post.zalo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-600 text-white hover:text-white border-2 py-2 px-4 rounded-2xl hover:bg-blue-800 transition"
                    >
                      <FaWhatsapp />
                      Nhắn Zalo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Bản đồ */}
          {position && (
            <div className="mt-6 relative z-10">
              <h3 className="text-xl font-bold mb-4">Vị trí trên bản đồ</h3>
              <div className="w-full h-[400px] relative z-0">
                <MapContainer
                  center={position}
                  zoom={15}
                  style={{ width: "100%", height: "100%" }}
                  className="relative z-0"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position} />
                </MapContainer>
              </div>
            </div>

          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
