const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Đăng ký người dùng
const registerUser = (req, res) => {
  const { name, email, password, phone, zalo, fbUrl } = req.body;

  db.query('SELECT * FROM Users WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).json({ message: 'Lỗi server' });
    if (result.length > 0) return res.status(400).json({ message: 'Email đã được sử dụng' });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Lỗi khi mã hóa mật khẩu' });

      db.query(
        'INSERT INTO Users (name, email, password, phone, zalo, fbUrl) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, hashedPassword, phone, zalo, fbUrl],
        (err) => {
          if (err) return res.status(500).json({ message: 'Lỗi khi lưu người dùng' });
          res.status(201).json({ message: 'Đăng ký thành công!' });
        }
      );
    });
  });
};

// Đăng nhập người dùng
const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM Users WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).json({ message: 'Lỗi server' });
    if (result.length === 0) return res.status(400).json({ message: 'Người dùng không tồn tại' });

    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Lỗi kiểm tra mật khẩu' });
      if (!isMatch) return res.status(400).json({ message: 'Mật khẩu không đúng' });

      const token = jwt.sign({ userId: user.user_id }, 'secretkey', { expiresIn: '1h' });
      res.status(200).json({ message: 'Đăng nhập thành công', token, name: user.name });
    });
  });
};

// Gửi mã OTP đến email
const sendOtpToEmail = (req, res) => {
  const { email } = req.body;

  db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Lỗi server khi tìm email.' });
    if (results.length === 0) return res.status(404).json({ message: 'Email không tồn tại.' });

    const otp = crypto.randomInt(100000, 999999);
    // const expiry = Date.now() +  5 * 60 * 1000;
    const expiry = new Date(Date.now() + 5 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');

    db.query('UPDATE Users SET otp = ?, otp_expiry = ? WHERE email = ?', [otp, expiry, email], async (err) => {
      if (err) return res.status(500).json({ message: 'Lỗi khi lưu OTP vào database.' });

      // Gửi email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'websitetimdothatlac@gmail.com',
          pass: 'yuou gcor rrul vibp',
        },
      });

      const mailOptions = {
        from: 'websitetimdothatlac@gmail.com',
        to: email,
        subject: '🔑 Mã OTP đặt lại mật khẩu của bạn',
        html: `
          <div style="
            font-family: Arial, sans-serif; 
            max-width: 600px; 
            margin: 20px auto; 
            border: 1px solid #ddd; 
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          ">
            <!-- Header -->
            <div style="background-color: #007BFF; color: #fff; text-align: center; padding: 15px;">
              <h1 style="margin: 0; font-size: 24px;">Mã OTP của bạn</h1>
            </div>
            
            <!-- Body -->
            <div style="padding: 20px; line-height: 1.6; color: #333;">
              <p style="font-size: 16px;">
                Xin chào, <strong>${email}</strong>,
              </p>
              <p style="font-size: 16px;">
                Đây là mã OTP của bạn để đặt lại mật khẩu. Mã này sẽ hết hạn sau <strong>5 phút</strong>.
              </p>
              
              <div style="
                background-color: #f8f9fa; 
                text-align: center; 
                margin: 20px 0; 
                padding: 15px; 
                border-radius: 5px;
                font-size: 28px; 
                font-weight: bold; 
                color: #007BFF; 
                letter-spacing: 2px;
              ">
                ${otp}
              </div>
      
              <p style="font-size: 14px; color: #888;">
                Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này. Để bảo mật, không chia sẻ mã OTP này với bất kỳ ai.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f1f1f1; text-align: center; padding: 10px; color: #777; font-size: 12px;">
              <p style="margin: 0;">Copyright © 2024 Website Tìm Đồ Thất Lạc - Nguyễn Anh Tuấn - 110121123 - DA21TTA - TVU</p>
            </div>
          </div>
        `,
      };


      try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Mã OTP đã được gửi đến email của bạn.' });
      } catch (error) {
        console.error('Lỗi gửi email:', error);
        res.status(500).json({ message: 'Lỗi khi gửi email OTP.' });
      }
    });
  });
};

// Đặt lại mật khẩu với OTP
const resetPasswordWithOtp = (req, res) => {
  const { email, otp, newPassword } = req.body;

  db.query('SELECT otp, otp_expiry FROM Users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Lỗi server.' });
    if (results.length === 0) return res.status(404).json({ message: 'Email không tồn tại.' });

    const { otp: storedOtp, otp_expiry } = results[0];

    // if (Date.now() > otp_expiry) {
    //   return res.status(400).json({ message: 'Mã OTP đã hết hạn.' });
    // }
    const expiryTimestamp = new Date(otp_expiry).getTime();
    if (Date.now() > expiryTimestamp) {
      return res.status(400).json({ message: 'Mã OTP đã hết hạn.' });
    }


    if (Number(otp) !== storedOtp) {
      return res.status(400).json({ message: 'Mã OTP không đúng.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    db.query('UPDATE Users SET password = ?, otp = NULL, otp_expiry = NULL WHERE email = ?', [hashedPassword, email], (err) => {
      if (err) return res.status(500).json({ message: 'Lỗi khi cập nhật mật khẩu.' });
      res.status(200).json({ message: 'Mật khẩu đã được đặt lại thành công.' });
    });
  });
};

// Lấy thông tin người dùng
const getUserProfile = (req, res) => {
  const userId = req.userId;

  const query = 'SELECT name, email, phone, zalo, fbUrl FROM Users WHERE user_id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Lỗi server' });
    if (result.length === 0) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

    res.status(200).json(result[0]);
  });
};

// Cập nhật thông tin người dùng
const updateUserProfile = (req, res) => {
  const userId = req.userId;
  const { name, email, phone, zalo, fbUrl } = req.body;

  const query = `UPDATE Users SET name = ?, email = ?, phone = ?, zalo = ?, fbUrl = ? WHERE user_id = ?`;

  db.query(query, [name, email, phone, zalo, fbUrl, userId], (err) => {
    if (err) return res.status(500).json({ message: 'Lỗi server' });
    res.status(200).json({ message: 'Cập nhật thông tin thành công!' });
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  sendOtpToEmail,
  resetPasswordWithOtp,
};
