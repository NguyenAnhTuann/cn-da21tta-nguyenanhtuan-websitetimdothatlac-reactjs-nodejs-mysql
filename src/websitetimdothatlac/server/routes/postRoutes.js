const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticateToken = require('../middlewares/authenticateToken');
const db = require('../config/db');
const nodemailer = require('nodemailer');
const sendEmailNotification = require('../emailService');



// Cấu hình lưu trữ file ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu ảnh
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Đặt tên file
    },
});

const upload = multer({ storage });

// API: Tạo bài viết mới
router.post('/', authenticateToken, upload.single('image'), (req, res) => {
    const { title, description, category, address, created } = req.body;
    const userId = req.userId;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const userQuery = `SELECT name, phone, zalo, fbUrl FROM Users WHERE user_id = ?`;

    db.query(userQuery, [userId], (err, userResult) => {
        if (err) return res.status(500).json({ message: 'Lỗi truy vấn thông tin người dùng' });
        if (userResult.length === 0) return res.status(404).json({ message: 'Người dùng không tồn tại' });

        const { name, phone, zalo, fbUrl } = userResult[0];

        const postQuery = `
            INSERT INTO Posts (user_id, image_url, title, description, category, address, created, name, phone, zalo, fbUrl)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(postQuery, [userId, imageUrl, title, description, category, address, created, name, phone, zalo, fbUrl], async (err) => {
            if (err) return res.status(500).json({ message: 'Lỗi khi chèn bài viết' });

            // Lấy danh sách email từ bảng Users
            db.query('SELECT email FROM Users', async (err, users) => {
                if (err) {
                    console.error('Lỗi lấy danh sách email:', err);
                    return res.status(500).json({ message: 'Lỗi lấy danh sách email' });
                }

                const emails = users.map(user => user.email);
                const postDetails = {
                    title,
                    description,
                    category,
                    address,
                    created,
                    // image_url: imageUrl,
                    name,
                    phone,
                    zalo,
                    fbUrl
                };

                try {
                    await sendEmailNotification(emails, postDetails);
                    console.log('Email thông báo đã được gửi thành công.');
                    res.status(201).json({ message: 'Bài viết đã được tạo thành công.' });
                } catch (error) {
                    console.error('Lỗi khi gửi email:', error);
                    res.status(201).json({
                        message: 'Bài viết đã được tạo thành công nhưng không thể gửi email thông báo.',
                    });
                }
                
                
            });
        });
    });
});

// API: Lấy danh sách bài viết
router.get('/', (req, res) => {
    const query = `SELECT * FROM Posts ORDER BY created DESC`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách bài viết:', err);
            return res.status(500).json({ message: 'Lỗi server' });
        }
        res.status(200).json(results);
    });
});


// API: Lấy danh sách bài đăng của người dùng hiện tại
router.get('/my-posts', authenticateToken, (req, res) => {
    const userId = req.userId;

    const query = `
      SELECT * FROM Posts WHERE user_id = ? ORDER BY created DESC
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách bài đăng:', err);
            return res.status(500).json({ message: 'Lỗi server khi lấy bài đăng' });
        }

        res.status(200).json(results);
    });
});

// API: Lấy chi tiết bài đăng theo ID (không cần xác thực)
router.get('/:id', (req, res) => {
    const postId = req.params.id;

    const query = `
      SELECT * FROM Posts WHERE post_id = ?
    `;

    db.query(query, [postId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy chi tiết bài đăng:', err);
            return res.status(500).json({ message: 'Lỗi server khi lấy chi tiết bài đăng.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Bài đăng không tồn tại.' });
        }
        res.status(200).json(results[0]);
    });
});



// API: Cập nhật bài đăng
router.put('/update/:id', authenticateToken, (req, res) => {
    const postId = req.params.id;
    const { title, description, category, address } = req.body;
    const userId = req.userId;

    const query = `
      UPDATE Posts SET title = ?, description = ?, category = ?, address = ?
      WHERE post_id = ? AND user_id = ?
    `;

    db.query(query, [title, description, category, address, postId, userId], (err) => {
        if (err) {
            console.error('Lỗi khi cập nhật bài đăng:', err);
            return res.status(500).json({ message: 'Lỗi server khi cập nhật bài đăng.' });
        }
        res.status(200).json({ message: 'Cập nhật bài đăng thành công.' });
    });
});

// API: Xóa bài đăng
router.delete('/delete/:id', authenticateToken, (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;

    const query = `
      DELETE FROM Posts 
      WHERE post_id = ? AND user_id = ?
    `;

    db.query(query, [postId, userId], (err, result) => {
        if (err) {
            console.error('Lỗi khi xóa bài đăng:', err);
            return res.status(500).json({ message: 'Lỗi server khi xóa bài đăng.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Bài đăng không tồn tại hoặc bạn không có quyền xóa.' });
        }

        res.status(200).json({ message: 'Xóa bài đăng thành công.' });
    });
});

//API: người quản trị xóa bài đăng
router.delete('/admin/posts/:id', authenticateToken, (req, res) => {
    const postId = req.params.id;

    db.query('DELETE FROM Posts WHERE post_id = ?', [postId], (err, result) => {
        if (err) {
            console.error('Lỗi khi xóa bài đăng:', err);
            return res.status(500).json({ message: 'Lỗi server khi xóa bài đăng.' });
        }
        res.status(200).json({ message: 'Xóa bài đăng thành công.' });
    });
});


module.exports = router;
