import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';


const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const usersPerPage = 10;
    const navigate = useNavigate();

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > Math.ceil(totalUsers / usersPerPage)) return;
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(`http://localhost:5000/api/admin/users?page=${currentPage}&limit=${usersPerPage}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data.users);
                setTotalUsers(res.data.totalUsers);
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi tải người dùng:', error);
                setError('Không thể tải dữ liệu người dùng. Vui lòng thử lại.');
                setLoading(false);
            }
        };
        fetchUsers();
    }, [currentPage]);


    // Tính thời gian OTP
    const calculateRemainingTime = (expiry) => {
        const expiryTime = new Date(expiry).getTime();
        const currentTime = new Date().getTime();
        const remainingTime = expiryTime - currentTime;

        if (remainingTime <= 0) return { time: 'OTP hết hạn', expired: true };

        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        return { time: `${minutes} phút ${seconds} giây`, expired: false };
    };

    // Cập nhật thời gian OTP còn lại mỗi giây
    useEffect(() => {
        const interval = setInterval(() => {
            setUsers((prevUsers) =>
                prevUsers.map((user) => {
                    if (user.otp_expiry) {
                        const remainingTime = calculateRemainingTime(user.otp_expiry);
                        return { ...user, remainingTime };
                    }
                    return user;
                })
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Xử lý Xóa người dùng
    const handleDeleteUser = async (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
            const token = localStorage.getItem('token');
            try {
                await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(users.filter((user) => user.user_id !== userId));
                alert('Xóa người dùng thành công!');
            } catch (error) {
                console.error('Lỗi khi xóa người dùng:', error);
                alert('Lỗi khi xóa người dùng. Vui lòng thử lại.');
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
            <div className="p-6 bg-white shadow-md rounded-lg">
                {/* Nút Quay lại */}
                <div className="mb-4">
                    <button
                        onClick={() => navigate('/admin')}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    >
                        ← Quay lại Admin Dashboard
                    </button>
                </div>

                <h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>
                {/* Hiển thị tổng số người dùng */}
                <p className="mb-4">Tổng số người dùng trong hệ thống: {totalUsers}</p>

                {loading ? (
                    <p className="text-center text-gray-500 animate-pulse">Đang tải dữ liệu...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 border whitespace-nowrap">ID</th>
                                    <th className="p-2 border whitespace-nowrap">Tên</th>
                                    <th className="p-2 border whitespace-nowrap">Email</th>
                                    <th className="p-2 border whitespace-nowrap">SĐT</th>
                                    <th className="p-2 border whitespace-nowrap">Zalo</th>
                                    <th className="p-2 border whitespace-nowrap">Facebook</th>
                                    <th className="p-2 border whitespace-nowrap">OTP</th>
                                    <th className="p-2 border whitespace-nowrap">Thời Gian OTP</th>
                                    <th className="p-2 border whitespace-nowrap">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user.user_id} className="hover:bg-gray-200">
                                            <td className="p-2 border text-center">{user.user_id}</td>
                                            <td className="p-2 border">{user.name}</td>
                                            <td className="p-2 border">{user.email}</td>
                                            <td className="p-2 border text-center">{user.phone}</td>
                                            <td className="p-2 border text-center">{user.zalo}</td>
                                            <td className="p-2 border text-center">{user.fbUrl}</td>
                                            <td className="p-2 border text-center">
                                                {user.otp ? user.otp : 'Không có OTP'}
                                            </td>
                                            <td className="p-2 border text-center">
                                                {user.remainingTime ? (
                                                    <span
                                                        className={`px-2 py-1 rounded ${user.remainingTime.expired ? 'bg-red-500 text-white' : 'text-red-600 font-medium'}`}
                                                    >
                                                        {user.remainingTime.time}
                                                    </span>
                                                ) : (
                                                    'Không có OTP'
                                                )}
                                            </td>

                                            <td className="p-2 border text-center">
                                                <button
                                                    onClick={() => handleDeleteUser(user.user_id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center p-4 text-gray-500">
                                            Không có người dùng nào.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Phân trang */}
                <div className="flex justify-center mt-4 gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        disabled={currentPage === 1}
                    >
                        Trước
                    </button>
                    {[...Array(Math.ceil(totalUsers / usersPerPage))].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`px-4 py-2 rounded ${currentPage === Math.ceil(totalUsers / usersPerPage) ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        disabled={currentPage === Math.ceil(totalUsers / usersPerPage)}
                    >
                        Sau
                    </button>
                </div>

            </div>
        </AdminLayout>
    );
};

export default UserManagement;
