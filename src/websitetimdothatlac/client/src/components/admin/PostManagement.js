import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';


const PostManagement = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 10;
    const [categoryFilter, setCategoryFilter] = useState('Đồ thất lạc');

    const navigate = useNavigate();


    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > Math.ceil(totalPosts / postsPerPage)) return;
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(
                    `${import.meta.env.REACT_APP_API_URL}/api/admin/posts?page=${currentPage}&limit=${postsPerPage}&category=${categoryFilter}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setPosts(res.data.posts);
                setTotalPosts(res.data.totalPosts);
            } catch (error) {
                console.error('Lỗi khi tải bài đăng:', error);
            }
        };
        fetchPosts();
    }, [currentPage, categoryFilter]);


    const handleDeletePost = async (postId) => {
        const token = localStorage.getItem('token');
        if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này không?')) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/posts/${postId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPosts(posts.filter((post) => post.post_id !== postId));
                alert('Xóa bài đăng thành công!');
            } catch (error) {
                console.error('Lỗi khi xóa bài đăng:', error);
                alert('Lỗi khi xóa bài đăng. Vui lòng thử lại!');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        window.location.href = '/login';
    };

    return (
        <AdminLayout handleLogout={handleLogout}>
            {/* Nút Quay lại */}
            <div className="mb-4">
                <button
                    onClick={() => navigate('/admin')}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                    ← Quay lại Admin Dashboard
                </button>
            </div>

            {/* Tiêu đề */}
            <h2 className="text-2xl font-bold mb-4">Danh sách bài đăng về {categoryFilter}</h2>

            <div className="flex justify-center mb-6">
                <button
                    className={`px-6 py-3 font-medium transition border ${categoryFilter === 'Đồ thất lạc'
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-black hover:bg-gray-100 border-black'
                        } rounded-l-md`}
                    onClick={() => setCategoryFilter('Đồ thất lạc')}
                >
                    Đồ Thất Lạc
                </button>
                <button
                    className={`px-6 py-3 font-medium transition border ${categoryFilter === 'Đồ nhặt được'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-black hover:bg-gray-100 border-black'
                        } rounded-r-md`}
                    onClick={() => setCategoryFilter('Đồ nhặt được')}
                >
                    Đồ Nhặt Được
                </button>
            </div>


            <p className="mb-4">Tổng số bài đăng có trong hệ thống: {totalPosts}</p>


            {/* Bảng Quản Lý Bài Đăng */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse table-auto">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="p-2 border whitespace-nowrap">ID</th>
                            <th className="p-2 border whitespace-nowrap">Hình ảnh</th>
                            <th className="p-2 border whitespace-nowrap">Tiêu đề</th>
                            <th className="p-2 border whitespace-nowrap">Danh mục</th>
                            <th className="p-2 border whitespace-nowrap">Mô tả</th>
                            <th className="p-2 border whitespace-nowrap">Địa chỉ</th>
                            <th className="p-2 border whitespace-nowrap">Ngày tạo</th>
                            <th className="p-2 border whitespace-nowrap">Tên người đăng</th>
                            <th className="p-2 border whitespace-nowrap">Số điện thoại</th>
                            <th className="p-2 border whitespace-nowrap">Zalo</th>
                            <th className="p-2 border whitespace-nowrap">Facebook</th>
                            <th className="p-2 border whitespace-nowrap">Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.post_id} className="hover:bg-gray-50 text-center">
                                {/* ID */}
                                <td className="p-2 border">{post.post_id}</td>

                                {/* Hình ảnh */}
                                <td className="p-2 border">
                                    <img
                                        src={post.image_url}
                                        alt={post.title}
                                        className="w-full md:w-96 h-auto object-cover rounded-lg shadow-md border border-gray-300"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/150"; // Hình ảnh mặc định nếu xảy ra lỗi
                                            e.target.alt = "Hình ảnh không tồn tại";
                                        }}
                                    />
                                </td>

                                {/* Tiêu đề */}
                                <td className="p-2 border">{post.title}</td>

                                {/* Danh mục - Nổi bật hơn */}
                                <td className="p-2 border">
                                    <span
                                        className={`px-3 py-1 font-mono rounded-full whitespace-nowrap ${post.category === 'Đồ nhặt được'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-red-600 text-white'
                                            }`}
                                    >
                                        {post.category}
                                    </span>
                                </td>

                                {/* Mô tả */}
                                <td className="p-2 border text-left align-top w-1/3 min-w-[300px]">
                                    <div className="whitespace-normal break-words">
                                        {post.description || 'Không có mô tả'}
                                    </div>
                                </td>

                                {/* Địa chỉ */}
                                {/* <td className="p-2 border">{post.address}</td> */}
                                <td className="p-2 border text-left align-top w-1/3 min-w-[300px]">{post.address}</td>

                                {/* Ngày tạo */}
                                <td className="p-2 border">{formatDate(post.created)}</td>

                                {/* Tên người đăng */}
                                <td className="p-2 border font-medium whitespace-nowrap truncate">
                                    {post.name}
                                </td>

                                {/* Số điện thoại */}
                                <td className="p-2 border">{post.phone}</td>

                                {/* Zalo */}
                                <td className="p-2 border">{post.zalo}</td>

                                {/* Facebook */}
                                <td className="p-2 border text-center">
                                    <a
                                        href={post.fbUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Facebook
                                    </a>
                                </td>

                                {/* Nút Xóa */}
                                <td className="p-2 border">
                                    <button
                                        onClick={() => handleDeletePost(post.post_id)}
                                        className="flex items-center gap-1 border-2 rounded-2xl text-black px-3 py-1 hover:bg-red-600 hover:text-white transition"

                                    >
                                        <MdDeleteOutline size={20} />
                                        Xóa
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Phân trang */}
            <div className="flex justify-center mt-4 gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`px-4 py-2 rounded-xl ${currentPage === 1 ? 'bg-gray-300' : 'bg-red-600 text-white hover:bg-red-700'}`}
                    disabled={currentPage === 1}
                >
                    Trước
                </button>
                {[...Array(Math.ceil(totalPosts / postsPerPage))].map((_, index) => (
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
                    className={`px-4 py-2 rounded-xl ${currentPage === Math.ceil(totalPosts / postsPerPage) ? 'bg-gray-300' : 'bg-red-600 text-white hover:bg-red-700'}`}
                    disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
                >
                    Sau
                </button>
            </div>

        </AdminLayout>
    );
};

export default PostManagement;
