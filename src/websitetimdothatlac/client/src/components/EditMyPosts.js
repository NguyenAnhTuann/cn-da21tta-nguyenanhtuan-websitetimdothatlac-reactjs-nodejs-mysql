import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EditMyPosts = () => {
  const [posts, setPosts] = useState([]); // Danh sách bài đăng
  const [errorMessage, setErrorMessage] = useState(''); // Thông báo lỗi
  const [successMessage, setSuccessMessage] = useState(''); // Thông báo thành công

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const postsPerPage = 6; // Số bài đăng trên mỗi trang

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
        if (!response.ok) {
          throw new Error('Không thể tải danh sách bài đăng.');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchMyPosts();
  }, []);

  // Hàm xóa bài đăng
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

  // Phân trang: Tính toán chỉ số đầu và cuối của các bài đăng trên trang hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

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

      <h1 className="text-2xl font-bold mb-4">Danh sách bài đăng của bạn</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-20 my-20">
        {currentPosts.map((post) => (
          <div
            key={post.post_id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-center items-center mb-4">
              <img
                src={`http://localhost:5000${post.image_url}`}
                alt={post.title}
                className="w-80 h-80 object-cover rounded-lg"
              />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 break-words line-clamp-2">
              {post.title}
            </h2>
            <p className={`inline-block font-medium ${getCategoryStyle(post.category)}`}>
              {post.category}
            </p>
            <p className="text-gray-600">
              <strong>Ngày:</strong> {formatDate(post.created)}
            </p>
            <p className="text-gray-600">
              <strong>Địa chỉ:</strong> {post.address}
            </p>
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
                onClick={() => navigate(`/edit-my-post/${post.post_id}`)}
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
            className={`px-4 py-2 rounded ${
              currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Trước
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
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
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
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
