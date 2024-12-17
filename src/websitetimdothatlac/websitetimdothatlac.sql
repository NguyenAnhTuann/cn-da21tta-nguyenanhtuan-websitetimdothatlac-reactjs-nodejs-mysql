-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2024 at 11:17 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `websitetimdothatlac`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('Đồ thất lạc','Đồ nhặt được') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` date NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zalo` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fbUrl` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `image_url`, `title`, `category`, `created`, `address`, `description`, `user_id`, `name`, `phone`, `zalo`, `fbUrl`) VALUES
(1, '/uploads/1734178783899-vi-mau-den.jpg', 'Ví màu đen', 'Đồ nhặt được', '2024-12-13', 'Phường 3, Thành phố Đà Lạt, Tỉnh Lâm Đồng, 02633, Việt Nam', 'Bên trong có vài thẻ ngân hàng và 5 triệu tiền mặt', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn'),
(10, '/uploads/1734203994865-cac-loai-the-ngan-hang-2.jpg', 'Thẻ ngân hàng Vietcombank', 'Đồ nhặt được', '2024-12-14', 'Công viên Phạm Ngũ Lão, Phường 1, Trà Vinh', 'Tên: NGUYEN THAI HOA, Số thẻ: 0764 7645 7890 7652', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn'),
(11, '/uploads/1734205828031-tui-xach.jpg', 'Túi xách', 'Đồ thất lạc', '2024-12-04', 'Điên Biên Phủ, Phường 3, Thành phố Trà Vinh, Tỉnh Trà Vinh, Việt Nam', 'Túi xách màu trắng to, có giấy tờ quan trọng', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn'),
(12, '/uploads/1734261287816-mat-day-chuyen.jpg', 'Mặt dây chuyền màu xanh ngọc', 'Đồ thất lạc', '2024-12-14', 'Hoàng Thế Thiện, Phường An Lợi Đông, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, 72806, Việt Nam', 'Mặt dây chuyền khoảng 1cm, có 4 cạnh nhọn, mặt sau có chữ SJC', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn'),
(13, '/uploads/1734262273556-sac-duphong.jpg', 'Sạc dự phòng màu đen', 'Đồ nhặt được', '2024-12-15', 'Hẻm 194 Tuệ Tĩnh, Phường 8, Quận 11, Thành phố Hồ Chí Minh, 72415, Việt Nam', 'Sạc dự hòng màu đen, tình trạng còn 80% pin, có tên INIU', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn'),
(14, '/uploads/1734262359092-daysacip.jpg', 'Dây sạc iPhone', 'Đồ thất lạc', '2024-12-06', 'Kênh Tắc, Xã Thạnh Hòa, Huyện Giồng Riềng, Tỉnh Kiên Giang, Việt Nam', 'Dây màu trằng còn nguyên sel, kèm củ sạc chưa bóc hộp.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn'),
(15, '/uploads/1734262457606-dongho.jpg', 'Đồng hồ đeo tay', 'Đồ thất lạc', '2024-12-13', 'Hẻm 457 Đường Nhật Tảo, Phường 6, Quận 10, Thành phố Hồ Chí Minh, 72415, Việt Nam', 'Dây đồng hồ màu bạc, mặt đồng hồ bằng kính và có màu xanh lá ', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn'),
(26, '/uploads/1734289139062-lactay.jpg', 'Lắc tay màu bạc', 'Đồ thất lạc', '2024-12-12', 'Lê Quý Đôn, Phường An Hội, Thành phố Bến Tre, Tỉnh Bến Tre, 07584, Việt Nam', 'Lắc tay có khác tên Tran Tran xung quanh vòng có đính đá', 2, 'Kim Thị Quế Trân', '0385236993', '0385236993', 'https://www.facebook.com/profile.php?id=61558947097197'),
(36, '/uploads/1734292598671-xemay.jpg', 'Xe máy Dream', 'Đồ thất lạc', '2024-12-21', 'Phum Chong Prek, Sangkat Prek Aeng, Quận Chbar Ampov, Phnôm Pênh, 121206, Cao Miên', 'xe máy màu đen hiệu honda dream', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn'),
(37, '/uploads/1734293262027-aokhoacden.jpg', 'Áo khoác đen', 'Đồ nhặt được', '2024-12-13', 'Chòm Sao, Phường Hưng Định, Thành phố Thuận An, Tỉnh Bình Dương, 75214, Việt Nam', 'Áo khoác đen bị rách nhẹ bên vai phải.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn'),
(38, '/uploads/1734293741651-applewatch.jpg', 'Apple Watch', 'Đồ thất lạc', '2024-12-12', 'Trường Quốc tế Việt Úc - Cơ sở Riverside, Đường số 2, Phường Tân Phú, Quận 7, Thành phố Hồ Chí Minh, 71800, Việt Nam', 'Đồng hồ thông minh Apple Watch màu trắng.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn'),
(39, '/uploads/1734293899429-macbook.jpg', 'MacBook màu đen', 'Đồ thất lạc', '2024-12-05', 'Xã Bình Chánh, Huyện Bình Chánh, Thành phố Hồ Chí Minh, Việt Nam', 'MacBook Air màu đen nhám.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn'),
(40, '/uploads/1734294219746-airpod4.jpg', 'AirPod 4', 'Đồ nhặt được', '2024-12-12', 'Xã Xuân Hiệp, Xuân Lộc, Tỉnh Đồng Nai, Việt Nam', 'AirPod 4 màu trắng, bị trầy hộp sạc', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn'),
(41, '/uploads/1734326203062-gaubong.jpg', 'Gấu bông màu trắng', 'Đồ nhặt được', '2024-11-06', 'Chùa Long Khánh, Bạch Đằng, Phường 3, Thành phố Trà Vinh, Tỉnh Trà Vinh, Việt Nam', 'Gấu bông màu trắng có 2 mắt đen, miệng hình chữ X, chân gấu bị rách.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zalo` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fbUrl` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otp` int(11) DEFAULT NULL,
  `otp_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `password`, `email`, `phone`, `zalo`, `fbUrl`, `otp`, `otp_expiry`) VALUES
(1, 'Nguyen Anh Tuan', '$2a$10$Adh8Zzm5OuhpB0qp.JX1ieRRIjEZ9UMwTNzPv5m3e8cN9sDlV6NnO', 'nguyenanhtuan.profile@gmail.com', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', NULL, NULL),
(2, 'Kim Thị Quế Trân', '$2a$10$DrsdWYuyHBgeGpVXDQFReuS9W/D1WxwnO0rvntkUv79V6QJmtmlgK', 'tranque913@gmail.com', '0385236993', '0385236993', 'https://www.facebook.com/profile.php?id=61558947097197', 711516, '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
