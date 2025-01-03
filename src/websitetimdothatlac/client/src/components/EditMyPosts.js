import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EditMyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [categoryFilter, setCategoryFilter] = useState('Đồ thất lạc');
  const [statusFilter, setStatusFilter] = useState('Chưa sở hữu');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  // Hàm để đóng thông báo
  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };

  // Hàm xác nhận cho thông báo xác nhận (nếu cần)
  const confirmAction = async () => {
    if (notification.action === 'delete') {
      await handleDeleteConfirmed(notification.postId);
    }
    closeNotification();
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    const fetchMyPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/posts/my-posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Không thể tải danh sách bài đăng.');

        const data = await response.json();
        setPosts(data);
        setFilteredPosts(
          data.filter(
            (post) =>
              post.category === categoryFilter &&
              (statusFilter === '' || post.status === statusFilter)
          )
        );
      } catch (error) {
        setNotification({ message: error.message || 'Lỗi không xác định.', type: 'error' });
      }
    };

    fetchMyPosts();
  }, [categoryFilter, statusFilter]);



  const handleToggleStatus = async (postId, currentStatus) => {
    const newStatus = currentStatus === 'Chưa sở hữu' ? 'Đã sở hữu' : 'Chưa sở hữu';

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/posts/mark-as-owned/${postId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Không thể cập nhật trạng thái bài đăng.');

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.post_id === postId ? { ...post, status: newStatus } : post
        )
      );

      setNotification({
        message:
          newStatus === 'Đã sở hữu'
            ? 'Đã đánh dấu bài đăng là "Đã sở hữu".'
            : 'Đã thay đổi trạng thái bài đăng thành "Chưa sở hữu".',
        type: 'success',
      });
    } catch (error) {
      setNotification({ message: error.message || 'Lỗi không xác định.', type: 'error' });
    }
  };



  const handleDelete = async (postId) => {
    setNotification({
      message: 'Bạn có chắc chắn muốn xóa bài đăng này không?',
      type: 'confirm',
      action: 'delete',
      postId,
    });
  };

  const handleDeleteConfirmed = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/posts/delete/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Không thể xóa bài đăng.');

      setPosts((prevPosts) => prevPosts.filter((post) => post.post_id !== postId));
      setNotification({ message: '🗑 Xóa bài đăng thành công!', type: 'success' });
    } catch (error) {
      setNotification({ message: `❌ ${error.message}`, type: 'error' });
    }
  };


  // Hàm định dạng ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Search functionality
  useEffect(() => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const lowerCaseAddress = searchAddress.toLowerCase();
    const searchDateInput = searchDate.trim();

    const results = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(lowerCaseTerm);
      const addressMatch = post.address.toLowerCase().includes(lowerCaseAddress);
      const dateMatch = searchDateInput
        ? formatDate(post.created).includes(searchDateInput)
        : true;

      // Lọc theo trạng thái và loại
      const categoryMatch =
        categoryFilter && statusFilter === ''
          ? post.category === categoryFilter && post.status !== 'Đã sở hữu'
          : true;

      const statusMatch = statusFilter ? post.status === statusFilter : true;

      return titleMatch && addressMatch && dateMatch && categoryMatch && statusMatch;
    });

    setFilteredPosts(results);
    setCurrentPage(1); // Reset về trang đầu tiên
  }, [searchTerm, searchDate, searchAddress, posts, categoryFilter, statusFilter]);






  // Reset Filters
  const handleReset = () => {
    setResetLoading(true);
    setTimeout(() => {
      setSearchTerm('');
      setSearchDate('');
      setSearchAddress('');
      setFilteredPosts(posts);
      setCurrentPage(1);
      setResetLoading(false);
    }, 1000);
  };

  const highlightMatch = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<span class="bg-yellow-300">$1</span>');
  };

  // Phân trang: Tính toán chỉ số đầu và cuối của các bài đăng trên trang hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);


  // Hàm chuyển trang
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Phân loại hiển thị màu sắc
  const getCategoryStyle = (category) => {
    return category === 'Đồ nhặt được'
      ? 'text-green-600 bg-green-100 px-2 py-1 rounded'
      : 'text-red-600 bg-red-100 px-2 py-1 rounded';
  };


  return (
    <div className="p-6">
      {notification.message && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl text-center max-w-md relative">
            {/* Icon cho từng loại thông báo */}
            {notification.type === 'success' && (
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
            {notification.type === 'error' && (
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
            {notification.type === 'confirm' && (
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
            {notification.type === 'confirm' ? (
              <div className="flex justify-center gap-4">
                <button
                  onClick={closeNotification}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmAction}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Xác nhận
                </button>
              </div>
            ) : (
              <button
                onClick={closeNotification}
                className="text-black px-4 py-2 rounded-md hover:bg-gray-500 transition border-2"
              >
                Đóng
              </button>
            )}
          </div>
        </div>
      )}


      <h1 className="max-w-4xl mx-auto text-2xl font-bold mb-4 bg-gray-200 text-gray-800 py-4 rounded-md text-center shadow">
        DANH SÁCH BÀI ĐĂNG CỦA BẠN
      </h1>

      {/* Search Filters */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-slate-300 shadow-lg rounded-lg p-6 border-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên đồ vật"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border rounded-lg"
          />
          <span className="absolute left-4 top-3 text-gray-400 text-xl">🔍</span>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm theo ngày (dd/mm/yyyy)"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="w-full px-4 py-3 pl-12 border rounded-lg"
          />
          <span className="absolute left-4 top-3 text-gray-400 text-xl">📅</span>
        </div>

        <div className="flex gap-2">
          {/* Ô tìm kiếm địa điểm */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Tìm kiếm theo địa điểm"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="w-full px-4 py-3 pl-12 border rounded-lg"
            />
            <span className="absolute left-4 top-3 text-gray-400 text-xl">📍</span>
          </div>

          {/* Nút Reset */}
          <button
            onClick={handleReset}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            disabled={resetLoading}
          >
            {resetLoading ? 'Đang tải...' : 'Reset'}
          </button>
        </div>
      </div>


      {/* Button trên thanh điều hướng */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-8 py-4 font-semibold flex items-center justify-center gap-2 transition-all duration-300 border-2 ${categoryFilter === "Đồ thất lạc" && statusFilter === ""
            ? "bg-gradient-to-r from-red-500 to-red-400 text-white shadow-lg scale-105"
            : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-red-100 hover:to-red-50 hover:text-black border-gray-300 shadow"
            } rounded-2xl`}
          onClick={() => {
            setCategoryFilter("Đồ thất lạc");
            setStatusFilter(""); // Xóa trạng thái lọc để loại bỏ bài đăng "Đã sở hữu"
          }}
        >
          📦 ĐỒ THẤT LẠC
        </button>

        <button
          className={`px-8 py-4 font-semibold flex items-center justify-center gap-2 transition-all duration-300 border-2 ${categoryFilter === "Đồ nhặt được" && statusFilter === ""
            ? "bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg scale-105"
            : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-green-100 hover:to-green-50 hover:text-black border-gray-300 shadow"
            } rounded-2xl`}
          onClick={() => {
            setCategoryFilter("Đồ nhặt được");
            setStatusFilter(""); // Xóa trạng thái lọc để loại bỏ bài đăng "Đã sở hữu"
          }}
        >
          🎒 ĐỒ NHẶT ĐƯỢC
        </button>

        <button
          className={`px-8 py-4 font-semibold flex items-center justify-center gap-2 transition-all duration-300 border-2 ${statusFilter === "Đã sở hữu"
            ? "bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg scale-105"
            : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 hover:text-black border-gray-300 shadow"
            } rounded-2xl`}
          onClick={() => {
            setCategoryFilter(""); // Bỏ lọc theo loại
            setStatusFilter("Đã sở hữu");
          }}
        >
          🛒 ĐỒ VẬT ĐÃ CÓ CHỦ SỞ HỮU
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-20 my-20">
        {currentPosts.map((post) => (
          <div
            key={post.post_id}
            className="bg-white border-2 p-6 rounded-lg shadow-lg hoer:shadow-2vxl hover:scale-105 transition-transform duration-300 flex flex-col"
          >
            {/* Hình ảnh bài đăng */}
            <div
              className="flex justify-center items-center mb-4 cursor-pointer"
              onClick={() => navigate(`/posts/${post.post_id}`)}
            >
              <img
                src={post.image_url}
                alt={post.title}
                className="w-64 h-48 object-cover rounded-lg shadow-md border border-gray-300"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150"; // Hình ảnh mặc định nếu xảy ra lỗi
                  e.target.alt = "Hình ảnh không tồn tại";
                }}
              />
            </div>

            {/* Tiêu đề */}
            <div>
              <h2
                className="text-3xl font-bold mb-4 text-gray-800 break-words line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: highlightMatch(post.title, searchTerm),
                }}
              ></h2>

              {/* Loại bài đăng */}
              <p
                className={`inline-block ${getCategoryStyle(post.category)} px-3 py-1 rounded-full text-lg font-bold uppercase`}
              >
                {post.category}
              </p>
            </div>

            {/* Thông tin bài đăng */}
            <div className="mt-4 space-y-2">
              {/* Ngày đăng */}
              <p className="text-gray-600 flex items-center">
                <span className="text-gray-800 font-semibold flex-shrink-0 mr-2">📅 Ngày:</span>
                <span dangerouslySetInnerHTML={{
                  __html: highlightMatch(formatDate(post.created), searchDate)
                }}></span>
              </p>

              {/* Địa chỉ */}
              <p className="text-gray-600 flex items-start">
                <span className="text-gray-800 font-semibold flex-shrink-0 mr-2">📍 Địa chỉ:</span>
                <span dangerouslySetInnerHTML={{
                  __html: highlightMatch(post.address, searchAddress)
                }}></span>
              </p>

              <p className="text-gray-600 flex items-start">
                <span className="text-gray-800 font-semibold flex-shrink-0 mr-2">📝 Mô tả:</span>
                <span className="line-clamp-2 break-words">{post.description || "Không có mô tả"}</span>
              </p>
            </div>


            <div className="flex items-center gap-3 mt-4">
              <button
                className="flex items-center gap-1 text-black bg-gray-200 hover:bg-gray-400 rounded-xl px-3 py-2 transition-all duration-300"
                onClick={() => {
                  navigate(`/edit-my-post/${post.post_id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <FaEdit className="mr-0" />
                Chỉnh sửa
              </button>

              <button
                type="button"
                className="flex items-center gap-1 text-black bg-gray-200 hover:bg-gray-400 rounded-xl px-3 py-2 transition-all duration-300"
                onClick={() => handleDelete(post.post_id)}
              >
                <FaTrash className="mr-0" />
                Xóa
              </button>

              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={() => handleToggleStatus(post.post_id, post.status)}
              >
                {post.status === 'Chưa sở hữu' ? '❌ Chưa sở hữu' : '✅ Đã sở hữu'}
              </button>


            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-2xl ${currentPage === 1 ? 'bg-gray-300' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
          >
            Trước
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-xl ${currentPage === index + 1
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-xl ${currentPage === totalPages
              ? 'bg-gray-300'
              : 'bg-red-600 text-white hover:bg-red-700'
              }`}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};

export default EditMyPosts;
