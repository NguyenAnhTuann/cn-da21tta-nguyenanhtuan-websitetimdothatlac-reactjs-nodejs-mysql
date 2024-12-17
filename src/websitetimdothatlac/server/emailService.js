const nodemailer = require('nodemailer');

// Hàm gửi email
const sendEmailNotification = async (emails, post) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'websitetimdothatlac@gmail.com', // Email của bạn
            pass: 'yuou gcor rrul vibp'            // App Password
        }
    });

    const mailOptions = {
        from: 'websitetimdothatlac@gmail.com',
        to: emails.join(','),
        subject: '🌟 Thông báo bài đăng mới - Website Tìm Đồ Thất Lạc 🌟',
        html: `
            <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 20px; 
                        background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <div style="text-align: center; background-color: #111; color: #FFD700; padding: 12px 0; border-radius: 12px 12px 0 0;">
                    <h1 style="margin: 0; font-size: 28px;">✨ Bài Đăng Mới ✨</h1>
                    <p style="font-size: 16px; margin: 5px 0;">Website Tìm Đồ Thất Lạc</p>
                </div>
    
                <!-- Nội dung chính -->
                <div style="padding: 20px; background-color: #fff; color: #333; border-radius: 0 0 12px 12px;">
                    <h2 style="margin-top: 0; color: #444; font-size: 22px; border-bottom: 2px solid #FFD700; display: inline-block;">Thông Tin Chi Tiết</h2>
                    <table style="width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 16px;">
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #444;">🎯 Tên đồ vật:</td>
                            <td style="padding: 8px; color: #666;">${post.title}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #444;">🗂 Loại bài đăng:</td>
                            <td style="padding: 8px; color: #666;">${post.category}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #444;">📅 Ngày đăng:</td>
                            <td style="padding: 8px; color: #666;">${post.created}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #444;">📍 Địa điểm:</td>
                            <td style="padding: 8px; color: #666;">${post.address}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #444;">📝 Mô tả:</td>
                            <td style="padding: 8px; color: #666;">${post.description}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #444;">👤 Người đăng</td>
                            <td style="padding: 8px; color: #666;">${post.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #444;">📞 Điện thoại:</td>
                            <td style="padding: 8px; color: #666;">${post.phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #444;">📱 Zalo:</td>
                            <td style="padding: 8px; color: #666;">${post.zalo}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #444;">🔗 Facebook:</td>
                            <td style="padding: 8px; color: #666;">
                                <a href="${post.fbUrl}" target="_blank" style="color: #1a73e8; text-decoration: none;">${post.fbUrl}</a>
                            </td>
                        </tr>
                    </table>

    
                    <!-- Button truy cập -->
                    <div style="text-align: center; margin-top: 20px;">
                        <a href="http://localhost:3000" target="_blank" 
                           style="background-color: #FFD700; color: #111; padding: 10px 20px; font-size: 18px; font-weight: bold; text-decoration: none; border-radius: 8px; display: inline-block;">
                           👉 Xem Chi Tiết Bài Đăng
                        </a>
                    </div>
                </div>
    
                <!-- Footer -->
                <div style="text-align: center; color: #777; font-size: 14px; margin-top: 10px;">
                    <p>📧 Bạn nhận được email này vì là thành viên của <strong>Website Tìm Đồ Thất Lạc</strong>.</p>
                    <p style="margin: 5px 0;"> Copyright &copy; 2024 Website Tìm Đồ Thất Lạc - NguyenAnhTuan - 110121123 - DA21TTA - TVU.</p>
                </div>
            </div>
        `,
    };


    try {
        await transporter.sendMail(mailOptions);
        console.log('Email thông báo đã được gửi thành công.');
    } catch (error) {
        console.error('Lỗi gửi email (email vẫn bị lỗi nhưng bài viết đã tạo):', error.message);
    }
    
};

module.exports = sendEmailNotification;
