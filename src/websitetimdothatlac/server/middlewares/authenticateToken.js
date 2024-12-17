const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.error('Token không tồn tại');
    return res.status(401).json({ message: 'Không có token' });
  }

  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) {
      console.error('Lỗi token:', err); // Ghi log lỗi
      return res.status(403).json({ message: 'Token không hợp lệ' });
    }
    req.userId = user.userId; // Gắn userId vào request
    console.log('userId từ token:', user.userId); // Thêm log
    next();
  });
};

module.exports = authenticateToken;
