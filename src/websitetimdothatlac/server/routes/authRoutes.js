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

module.exports = router;
