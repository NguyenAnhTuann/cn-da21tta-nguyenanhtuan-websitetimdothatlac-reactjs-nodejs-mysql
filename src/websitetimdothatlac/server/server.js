const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const adminRoutes = require('./routes/adminRoutes');

require('dotenv').config();


const app = express();

// Middleware
// app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));

const allowedOrigins = [
  'https://timdothatlac.vercel.app', // domain frontend thật
  'http://localhost:3000'            // vẫn giữ để test local nếu cần
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/admin', adminRoutes);

// Serve static files securely
app.use('/uploads', (req, res, next) => {
  const fileExt = path.extname(req.url).toLowerCase();
  if (['.png', '.jpg', '.jpeg', '.gif'].includes(fileExt)) {
    express.static('uploads')(req, res, next);
  } else {
    res.status(403).json({ message: 'Không được phép truy cập file này.' });
  }
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route không tồn tại.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Đã xảy ra lỗi từ server. Vui lòng thử lại sau.' });
});

// Start the server
// app.listen(5000, () => {
//   console.log('Server đang chạy tại http://localhost:5000');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});


// Middleware để tắt cache
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
