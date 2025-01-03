import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdRefresh } from "react-icons/md";

const OwnedItems = () => {
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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        if (!response.ok) throw new Error('Không thể tải danh sách bài đăng.');
        const data = await response.json();

        // Lọc bài đăng: chỉ lấy những bài có status "Đã sở hữu"
        const ownedItems = data.filter((post) => post.status === 'Đã sở hữu');
        setPosts(ownedItems);
        setFilteredPosts(ownedItems);
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

  // Slide
  const slideUrls = [
    "https://i.pinimg.com/736x/c7/8c/39/c78c39dde40e4c4b5cb8f972cb7dfae1.jpg",
    "https://i.pinimg.com/736x/94/1f/15/941f1561a78c3f96768282ba235cde09.jpg",
    "https://i.pinimg.com/736x/b7/14/6b/b7146ba5d6a8a9b6cde3577a4dc28f58.jpg",
    "https://i.pinimg.com/736x/af/84/5c/af845c3d89d15e49d50054324e3d5ebc.jpg",
    "https://i.pinimg.com/736x/aa/fe/65/aafe653565c4e0983a6589669f65e570.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Chuyển slide tự động
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideUrls.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slideUrls.length]);

  // Hàm điều chỉnh slide
  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slideUrls.length) % slideUrls.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slideUrls.length);
  };

  return (
    <div
      className="bg-contain bg-no-repeat bg-center min-h-screen flex justify-center bg-white border-b-2 shadow-sm"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/duk8odqun/image/upload/v1735644020/Logotimdothatlac_1_qdrlei.png')`,
      }}
    >
      <div className="w-full max-w-[1200px] flex justify-between items-center px-4 py-4">
        <div className="p-6">
          <div className="relative w-full max-w-4xl mx-auto mb-6">
            <div className="overflow-hidden rounded-lg shadow-lg w-full h-64 flex items-center justify-center bg-gray-100 relative">
              {slideUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Slide ${index + 1}`}
                  className={`absolute w-full h-full object-contain transition-transform duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                    }`}
                  style={{
                    transform: index < currentSlide ? 'translateX(-100%)' : index > currentSlide ? 'translateX(100%)' : 'translateX(0)',
                  }}
                />
              ))}
            </div>
            {/* Nút điều chỉnh */}
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-300 text-white p-2 rounded-full shadow hover:bg-gray-500 transition"
              onClick={goToPreviousSlide}
            >
              ❮
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-300 text-white p-2 rounded-full shadow hover:bg-gray-500 transition"
              onClick={goToNextSlide}
            >
              ❯
            </button>
            {/* Chấm hiển thị */}
            <div className="flex justify-center mt-2">
              {slideUrls.map((_, index) => (
                <span
                  key={index}
                  className={`mx-1 w-3 h-3 rounded-full ${index === currentSlide ? 'bg-gray-500' : 'bg-gray-300'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-4 bg-gray-200 text-gray-800 py-4 rounded-md text-center">
            DANH SÁCH TẤT CẢ BÀI ĐĂNG ĐÃ CÓ CHỦ SỞ HỮU
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-slate-300 shadow-lg rounded-lg p-6 border-2">
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

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {filteredPosts.length === 0 && !errorMessage && (
            <p className="text-gray-500 text-center mt-4">Không có bài đăng nào.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-20 my-20">
            {currentPosts.map((post) => (
              <div
                key={post.post_id}
                className="bg-white border-2 p-4 rounded-lg shadow-lg flex flex-col hover:shadow-2xl hover:scale-105 transition-transform duration-300"
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
                <h2
                  className="text-2xl font-bold mb-4 text-gray-800 break-words line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(post.title, searchTerm),
                  }}
                ></h2>


                {/* Thông tin chi tiết */}
                <div className="space-y-3">
                  {/* Ngày đăng */}
                  <div className="flex items-start">
                    <span className="text-gray-800 font-semibold flex-shrink-0 mr-2">📅 Ngày:</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(formatDate(post.created), searchDate),
                      }}
                      className="break-words"
                    ></span>
                  </div>

                  {/* Địa chỉ */}
                  <div className="flex items-start">
                    <span className="text-gray-800 font-semibold flex-shrink-0 mr-2">📍 Địa chỉ:</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(post.address, searchAddress),
                      }}
                      className="break-words"
                    ></span>
                  </div>


                  {/* Mô tả */}
                  <div className="flex items-start">
                    <span className="text-gray-800 font-semibold flex-shrink-0 mr-2">📝 Mô tả:</span>
                    <span className="line-clamp-2 break-words">{post.description || "Không có mô tả"}</span>
                  </div>

                  {/* Lưu ý */}
                  <div>
                    <h4
                      className="text-nowrap font-bold mb-4 text-red-600 break-words line-clamp-2"
                    >
                      Lưu ý: Đồ vật này đã có chủ sở hữu !
                    </h4>
                  </div>
                </div>

              </div>
            ))}
          </div>


          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-xl ${currentPage === 1 ? 'bg-gray-300' : 'bg-red-600 text-white hover:bg-red-700'}`}
              >
                Trước
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-2xl ${currentPage === index + 1 ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-xl ${currentPage === totalPages ? 'bg-gray-300' : 'bg-red-600 text-white hover:bg-red-700'}`}
              >
                Sau
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnedItems;
