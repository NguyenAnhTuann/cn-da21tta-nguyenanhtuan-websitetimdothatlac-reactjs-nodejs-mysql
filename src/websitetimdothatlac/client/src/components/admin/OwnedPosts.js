import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const OwnedPosts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 10;

    const navigate = useNavigate();

    // Hàm chuyển trang
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > Math.ceil(totalPosts / postsPerPage)) return;
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Fetch danh sách bài đăng đã sở hữu
    useEffect(() => {
        const fetchOwnedPosts = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/admin/owned-posts?page=${currentPage}&limit=${postsPerPage}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setPosts(res.data.posts);
                setTotalPosts(res.data.totalPosts);
            } catch (error) {
                console.error('Lỗi khi tải danh sách bài đăng đã sở hữu:', error);
            }
        };
        fetchOwnedPosts();
    }, [currentPage]);

    // Hàm đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        navigate('/login');
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
            <h2 className="text-2xl font-bold mb-4">Danh sách bài đăng đã sở hữu</h2>

            <p className="mb-4">Tổng số bài đăng đã sở hữu: {totalPosts}</p>

            {/* Bảng hiển thị bài đăng */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse table-auto">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="p-2 border">ID (Owned)</th>
                            <th className="p-2 border">ID Bài Đăng</th>
                            <th className="p-2 border">ID Người Dùng</th>
                            <th className="p-2 border">Trạng Thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.owned_post_id} className="hover:bg-gray-50 text-center">
                                <td className="p-2 border">{post.owned_post_id}</td>
                                <td className="p-2 border">{post.post_id}</td>
                                <td className="p-2 border">{post.user_id}</td>
                                <td className="p-2 border">{post.status}</td>
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

export default OwnedPosts;
