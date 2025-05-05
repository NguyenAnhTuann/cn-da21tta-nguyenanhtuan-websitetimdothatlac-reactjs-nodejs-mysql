const nodemailer = require('nodemailer');

// Hàm định dạng ngày
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

// Hàm gửi email
const sendEmailNotification = async (emails, post) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'websitetimdothatlac@gmail.com',
            pass: 'yuou gcor rrul vibp' // App Password
        }
    });

    // Định dạng ngày trước khi sử dụng
    const formattedDate = formatDate(post.created);

    const mailOptions = {
        from: 'websitetimdothatlac@gmail.com',
        to: emails.join(','),
        subject: '🌟 Thông báo bài đăng mới - Website Tìm Đồ Thất Lạc 🌟',
        html: `
            <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 20px; 
                        background-color: #f0f8ff; border: 1px solid #1e3a8a; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <div style="text-align: center; background-color: #1e3a8a; color: #ffffff; padding: 15px 0; border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; font-size: 28px;">📢 Bài Đăng Mới 📢</h1>
                    <p style="margin: 0; font-size: 16px;">Website Tìm Đồ Thất Lạc</p>
                </div>

                <!-- Hình ảnh bài đăng -->
                <div style="text-align: center; margin: 20px 0;">
                    <img src="${post.image_url}" 
                         alt="Hình ảnh bài đăng" 
                         style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                </div>

                <!-- Nội dung chính -->
                <div style="padding: 20px; background-color: #ffffff; color: #333; border-radius: 0 0 12px 12px;">
                    <h2 style="margin-top: 0; color: #1e3a8a; font-size: 22px; border-bottom: 2px solid #1e40af; display: inline-block;">Thông Tin Chi Tiết</h2>
                    <table style="width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 16px;">
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #1e3a8a; white-space: nowrap;">🎯 Tên đồ vật:</td>
                            <td style="padding: 8px; color: #555;">${post.title}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #1e3a8a; white-space: nowrap;">🗂 Loại bài đăng:</td>
                            <td style="padding: 8px; color: #555;">${post.category}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #1e3a8a; white-space: nowrap;">📅 Ngày đăng:</td>
                            <td style="padding: 8px; color: #555;">${formattedDate}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #1e3a8a; white-space: nowrap;">📍 Địa điểm:</td>
                            <td style="padding: 8px; color: #555;">${post.address}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #1e3a8a; white-space: nowrap;">📝 Mô tả:</td>
                            <td style="padding: 8px; color: #555;">${post.description}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #1e3a8a; white-space: nowrap;">👤 Người đăng:</td>
                            <td style="padding: 8px; color: #555;">${post.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #1e3a8a; white-space: nowrap;">📞 Điện thoại:</td>
                            <td style="padding: 8px; color: #555;">${post.phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #1e3a8a; white-space: nowrap;">📱 Zalo:</td>
                            <td style="padding: 8px; color: #555;">${post.zalo}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #1e3a8a; white-space: nowrap;">🔗 Facebook:</td>
                            <td style="padding: 8px; color: #555;">
                                <a href="${post.fbUrl}" target="_blank" style="color: #1a73e8; text-decoration: none;">${post.fbUrl}</a>
                            </td>
                        </tr>
                    </table>
    
                    <!-- Button truy cập -->
                    <div style="text-align: center; margin-top: 20px;">
            <a href="http://localhost:3000/posts/${post.post_id}" target="_blank" 
            style="background-color: #1e40af; color: #ffffff; padding: 12px 20px; font-size: 18px; font-weight: bold; text-decoration: none; border-radius: 8px; display: inline-block;">
                👉 Xem Chi Tiết Bài Đăng
            </a>

                    </div>
                </div>
    
                <!-- Footer -->
                <div style="text-align: center; color: #555; font-size: 14px; margin-top: 20px;">
                    <p>📧 Bạn nhận được email này vì là thành viên của <strong>Website Tìm Đồ Thất Lạc</strong>.</p>
                    <p style="margin: 5px 0;">Copyright &copy; 2024 Website Tìm Đồ Thất Lạc</p>
                    <p style="margin: 5px 0;">Nguyễn Anh Tuấn - 110121123 - DA21TTA - TVU</p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email thông báo đã được gửi thành công.');
    } catch (error) {
        console.error('Lỗi gửi email:', error.message);
    }
};

module.exports = sendEmailNotification;
