import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Lấy danh sách người dùng
    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5000/api/admin/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi tải người dùng:', error);
                setError('Không thể tải dữ liệu người dùng. Vui lòng thử lại.');
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

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
                                            <td
                                                className={`p-2 border text-center font-semibold ${user.remainingTime?.expired ? 'bg-red-500 text-white' : 'text-green-600'
                                                    }`}
                                            >
                                                {user.remainingTime ? user.remainingTime.time : 'Không có OTP'}
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
            </div>
        </AdminLayout>
    );
};

export default UserManagement;
