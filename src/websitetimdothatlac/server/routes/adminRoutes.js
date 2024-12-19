const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const db = require('../config/db');

// API: Lấy danh sách người dùng với phân trang
router.get('/users', authenticateToken, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // Lấy tổng số người dùng
  db.query('SELECT COUNT(*) AS total FROM Users', (err, totalResult) => {
    if (err) {
      console.error('Lỗi khi lấy tổng số người dùng:', err);
      return res.status(500).json({ message: 'Lỗi server khi lấy tổng số người dùng' });
    }

    const totalUsers = totalResult[0].total;

    // Lấy danh sách người dùng theo phân trang
    db.query('SELECT * FROM Users LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
      if (err) {
        console.error('Lỗi khi lấy danh sách người dùng:', err);
        return res.status(500).json({ message: 'Lỗi server khi lấy danh sách người dùng' });
      }

      // Trả về dữ liệu gồm danh sách người dùng và tổng số người dùng
      res.status(200).json({
        users: results,
        totalUsers,
      });
    });
  });
});



// API: Xóa người dùng
router.delete('/users/:id', authenticateToken, (req, res) => {
  const userId = req.params.id;

  db.query('DELETE FROM Users WHERE user_id = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Lỗi server khi xóa người dùng' });
    res.status(200).json({ message: 'Xóa người dùng thành công' });
  });
});


// API: Lấy danh sách bài viết có phân trang và lọc theo category
router.get('/posts', authenticateToken, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const category = req.query.category || ''; // Lấy category từ query string

  let queryPosts = `SELECT * FROM Posts`;
  let queryParams = [];

  // Lọc theo category nếu có
  if (category) {
    queryPosts += ` WHERE category = ?`;
    queryParams.push(category);
  }

  queryPosts += ` ORDER BY created DESC LIMIT ? OFFSET ?`;
  queryParams.push(limit, offset);

  const queryTotal = category
    ? `SELECT COUNT(*) AS totalPosts FROM Posts WHERE category = ?`
    : `SELECT COUNT(*) AS totalPosts FROM Posts`;
  const queryTotalParams = category ? [category] : [];

  // Lấy danh sách bài đăng
  db.query(queryPosts, queryParams, (err, posts) => {
    if (err) {
      console.error('Lỗi khi lấy danh sách bài viết:', err);
      return res.status(500).json({ message: 'Lỗi server' });
    }

    // Lấy tổng số bài đăng
    db.query(queryTotal, queryTotalParams, (err, totalResult) => {
      if (err) {
        console.error('Lỗi khi tính tổng số bài viết:', err);
        return res.status(500).json({ message: 'Lỗi server' });
      }

      const totalPosts = totalResult[0].totalPosts;
      res.status(200).json({ posts, totalPosts });
    });
  });
});




// API: Xóa bài đăng bởi admin
router.delete('/posts/:id', authenticateToken, (req, res) => {
  if (req.role !== 'admin') {
    return res.status(403).json({ message: 'Bạn không có quyền thực hiện hành động này.' });
  }

  const postId = req.params.id;

  db.query('DELETE FROM Posts WHERE post_id = ?', [postId], (err, result) => {
    if (err) {
      console.error('Lỗi khi xóa bài đăng:', err);
      return res.status(500).json({ message: 'Lỗi server khi xóa bài đăng.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bài đăng không tồn tại.' });
    }

    res.status(200).json({ message: 'Xóa bài đăng thành công.' });
  });
});

module.exports = router;
