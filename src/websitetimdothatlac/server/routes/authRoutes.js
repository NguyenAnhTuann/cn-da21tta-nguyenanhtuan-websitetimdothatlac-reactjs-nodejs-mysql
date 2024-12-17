const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  sendOtpToEmail,
  resetPasswordWithOtp,
} = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middlewares/validation');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/user', authenticateToken, getUserProfile);
router.put('/update', authenticateToken, updateUserProfile);
router.post('/forgot-password', sendOtpToEmail);
router.post('/reset-password', resetPasswordWithOtp);

router.get('/admin/users', authenticateToken, (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) return res.status(500).json({ message: 'Lỗi server' });
    res.status(200).json(results);
  });
});

router.get('/admin/posts', authenticateToken, (req, res) => {
  db.query('SELECT * FROM Posts', (err, results) => {
    if (err) return res.status(500).json({ message: 'Lỗi server' });
    res.status(200).json(results);
  });
});


module.exports = router;
