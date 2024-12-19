import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdRefresh } from "react-icons/md";


const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [resetLoading, setResetLoading] = useState(false);
  const postsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        if (!response.ok) throw new Error('Không thể tải danh sách bài đăng.');
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchPosts();
  }, []);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


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

      return titleMatch && addressMatch && dateMatch;
    });

    setFilteredPosts(results);
    setCurrentPage(1);
  }, [searchTerm, searchDate, searchAddress, posts]);


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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryStyle = (category) =>
    category === 'Đồ nhặt được'
      ? 'text-green-600 bg-green-100 px-2 py-1 rounded'
      : 'text-red-600 bg-red-100 px-2 py-1 rounded';

  return (
    
    <div className="p-6">
      
      <h1 className="text-2xl font-bold mb-4 bg-gray-200 text-gray-800 py-4 rounded-md text-center">DANH SÁCH TẤT CẢ BÀI ĐĂNG CÓ TRÊN HỆ THỐNG</h1>
      {/* Ô tìm kiếm */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-slate-300 shadow-lg rounded-lg p-6 border-2">
        {/* Tìm kiếm theo tên */}
        <div className="relative col-span-1">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên đồ vật"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <span className="absolute left-4 top-3 text-gray-400 text-xl">🔍</span>
        </div>

        {/* Tìm kiếm theo ngày */}
        <div className="relative col-span-1">
          <input
            type="text"
            placeholder="Tìm kiếm theo ngày (dd/mm/yyyy)"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <span className="absolute left-4 top-3 text-gray-400 text-xl">📅</span>
        </div>

        {/* Tìm kiếm theo địa điểm và Nút Reset */}
        <div className="relative flex gap-2 col-span-1">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Tìm kiếm theo địa điểm"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span className="absolute left-4 top-3 text-gray-400 text-xl">📍</span>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition min-w-[100px]"
            disabled={resetLoading}
          >
            {resetLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
            ) : (
              <>
                <MdRefresh className="mr-2 text-xl" />
                Reset
              </>
            )}
          </button>
        </div>
      </div>



      {/* Thông báo lỗi */}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {filteredPosts.length === 0 && (
        <p className="text-gray-500 text-center mt-4">Không tìm thấy bài đăng phù hợp.</p>
      )}

      {/* Danh sách bài đăng */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-20 my-20">
        {currentPosts.map((post) => (
          <div
            key={post.post_id}
            className="bg-white border-2 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Hình ảnh bài đăng */}
            <div
              className="flex justify-center items-center mb-4 cursor-pointer"
              onClick={() => navigate(`/posts/${post.post_id}`)}
            >
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

            {/* Tiêu đề */}
            <h2
              className="text-2xl font-bold mb-2 text-gray-800 break-words line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: highlightMatch(post.title, searchTerm),
              }}
            ></h2>

            {/* Loại bài đăng */}
            <p className={`inline-block font-medium ${getCategoryStyle(post.category)}`}>
              {post.category}
            </p>

            {/* Ngày đăng */}
            <p
              className="text-gray-600"
              dangerouslySetInnerHTML={{
                __html: `<strong>Ngày:</strong> ${highlightMatch(formatDate(post.created), searchDate)}`,
              }}
            ></p>

            {/* Địa chỉ */}
            <p
              className="text-gray-600"
              dangerouslySetInnerHTML={{
                __html: `<strong>Địa chỉ:</strong> ${highlightMatch(post.address, searchAddress)}`,
              }}
            ></p>

          </div>
        ))}
      </div>


      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Trước
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;
