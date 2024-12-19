const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.error('Token không tồn tại');
    return res.status(401).json({ message: 'Không có token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Lỗi token:', err);
      return res.status(403).json({ message: 'Token không hợp lệ' });
    }

    req.userId = user.userId;
    req.role = user.role;
    console.log('Xác thực token thành công, userId:', user.userId);

    next();
  });
};

module.exports = authenticateToken;
