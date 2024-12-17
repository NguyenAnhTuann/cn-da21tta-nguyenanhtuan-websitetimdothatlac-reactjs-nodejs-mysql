import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import { useNavigate } from 'react-router-dom';

const PostManagement = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    // Hàm chuyển đổi định dạng ngày "YYYY-MM-DD" thành "DD/MM/YYYY"
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
                const res = await axios.get('http://localhost:5000/api/admin/posts', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPosts(res.data);
            } catch (error) {
                console.error('Lỗi khi tải bài đăng:', error);
            }
        };
        fetchPosts();
    }, []);

    // Hàm xóa bài đăng
    const handleDeletePost = async (postId) => {
        const token = localStorage.getItem('token');
        if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này không?')) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/posts/${postId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPosts(posts.filter((post) => post.post_id !== postId)); // Cập nhật lại danh sách
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
            <h2 className="text-2xl font-bold mb-4">Danh sách bài đăng</h2>

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
                                        src={`http://localhost:5000${post.image_url}`}
                                        alt={post.title}
                                        className="w-30 h-30 object-cover rounded-lg mx-auto"
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
                                <td className="p-2 border">{post.address}</td>
                                {/* <td className="p-2 border align-top w-1/3 min-w-[300px]">{post.address}</td> */}

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
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                    >
                                        Xóa
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default PostManagement;
