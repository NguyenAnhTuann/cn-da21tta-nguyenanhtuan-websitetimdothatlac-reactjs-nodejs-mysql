const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const db = require('../config/db');

// API: Lấy danh sách người dùng
router.get('/users', authenticateToken, (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) return res.status(500).json({ message: 'Lỗi server' });
    res.status(200).json(results);
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
  

// API: Lấy danh sách bài viết
router.get('/posts', authenticateToken, (req, res) => {
  db.query('SELECT * FROM Posts', (err, results) => {
    if (err) return res.status(500).json({ message: 'Lỗi server' });
    res.status(200).json(results);
  });
});

module.exports = router;
