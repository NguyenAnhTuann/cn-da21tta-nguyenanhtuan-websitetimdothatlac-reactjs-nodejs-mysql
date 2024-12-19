import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EditMyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [categoryFilter, setCategoryFilter] = useState('Đồ thất lạc');

  const navigate = useNavigate();

  useEffect(() => {
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
        setFilteredPosts(data.filter((post) => post.category === categoryFilter));
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchMyPosts();
  }, [categoryFilter]);



  const handleDelete = async (postId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài đăng này không?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/posts/delete/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Không thể xóa bài đăng.');

      setPosts((prevPosts) => prevPosts.filter((post) => post.post_id !== postId));
      setSuccessMessage('Xóa bài đăng thành công!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error.message);
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
      return post.category === categoryFilter && titleMatch && addressMatch && dateMatch;
    });

    setFilteredPosts(results);
    setCurrentPage(1);
  }, [searchTerm, searchDate, searchAddress, posts, categoryFilter]);


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
      {/* Thông báo lỗi */}
      {errorMessage && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-md shadow-md">
          {errorMessage}
        </div>
      )}

      {/* Thông báo thành công */}
      {successMessage && (
        <div className="mb-4 bg-green-100 text-green-700 p-3 rounded-md shadow-md">
          {successMessage}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4 bg-gray-200 text-gray-800 py-4 rounded-md text-center">
        DANH SÁCH BÀI ĐĂNG CỦA BẠN
      </h1>
      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-slate-300 shadow-lg rounded-lg p-6 border-2">
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

      <div className="flex justify-center mb-6">
        <button
          className={`px-6 py-3 font-medium transition border ${categoryFilter === 'Đồ thất lạc'
            ? 'bg-red-600 text-white'
            : 'bg-white text-black hover:bg-gray-100 border-gray-300'
            } rounded-l-md`}
          onClick={() => setCategoryFilter('Đồ thất lạc')}
        >
          ĐỒ THẤT LẠC
        </button>
        <button
          className={`px-6 py-3 font-medium transition border ${categoryFilter === 'Đồ nhặt được'
            ? 'bg-green-600 text-white'
            : 'bg-white text-black hover:bg-gray-100 border-gray-300'
            } rounded-r-md`}
          onClick={() => setCategoryFilter('Đồ nhặt được')}
        >
          ĐỒ NHẶT ĐƯỢC
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-20 my-20">
        {currentPosts.map((post) => (
          <div
            key={post.post_id}
            className="bg-white border-2 p-4 rounded-lg shadow-lg hover:shadow-transparent transition-shadow duration-300"
          >
            <div className="flex justify-center items-center mb-4">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full md:w-96 h-auto object-cover rounded-lg shadow-md border border-gray-300"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150"; // Hình ảnh mặc định nếu xảy ra lỗi
                  e.target.alt = "Hình ảnh không tồn tại";
                }}
              />
            </div>
            <h2
              className="text-3xl font-bold mb-4 text-gray-800 break-words line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: highlightMatch(post.title, searchTerm),
              }}
            ></h2>

            <p className={`inline-block font-medium ${getCategoryStyle(post.category)}`}>
              {post.category}
            </p>
            <p
              className="text-gray-600"
              dangerouslySetInnerHTML={{
                __html: `<strong>Ngày:</strong> ${highlightMatch(formatDate(post.created), searchDate)}`,
              }}
            ></p>

            <p
              className="text-gray-600"
              dangerouslySetInnerHTML={{
                __html: `<strong>Địa chỉ:</strong> ${highlightMatch(post.address, searchAddress)}`,
              }}
            ></p>

            <p className="text-gray-600">
              <strong>Mô tả:</strong> {post.description}
            </p>
            <p className="text-gray-600">
              <strong>Người đăng:</strong> {post.name}
            </p>
            <p className="text-gray-600">
              <strong>Điện thoại:</strong> {post.phone}
            </p>
            <p className="text-gray-600">
              <strong>Zalo:</strong> {post.zalo}
            </p>
            <p className="text-gray-600">
              <strong>Facebook:</strong>{' '}
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
                'Không có'
              )}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <button
                className="flex items-center gap-1 text-black bg-gray-200 hover:bg-gray-400 rounded-xl px-3 py-2 transition-all duration-300"
                onClick={() => {
                  navigate(`/edit-my-post/${post.post_id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang
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
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
            Trước
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${currentPage === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages
              ? 'bg-gray-300'
              : 'bg-blue-600 text-white hover:bg-blue-700'
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
