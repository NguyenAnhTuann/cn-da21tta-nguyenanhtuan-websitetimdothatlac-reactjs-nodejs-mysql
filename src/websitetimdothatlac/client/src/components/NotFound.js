import React from 'react';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center">
    <h1 className="text-4xl font-bold mb-4 text-red-600">404 Not Found</h1>
    <p className="text-lg text-gray-600">Trang bạn đang tìm không tồn tại hoặc bạn không có quyền truy cập.</p>
    <a href="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
      Quay lại trang chủ
    </a>
  </div>
);

export default NotFound;
