-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2025 at 07:23 AM
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

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `name`, `password`, `email`, `phone`) VALUES
(1, 'Admin Website Tìm Đồ Thất Lạc', '$2a$10$zwYCub9QFYFlMTL8to1oMeNUk3n43cvCvEoskVc5IQBwNO7B7QIwW', 'websitetimdothatlac@gmail.com', '0869094929');

-- --------------------------------------------------------

--
-- Table structure for table `owned_posts`
--

CREATE TABLE `owned_posts` (
  `owned_post_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` enum('Đã sở hữu') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Đã sở hữu'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `owned_posts`
--

INSERT INTO `owned_posts` (`owned_post_id`, `post_id`, `user_id`, `status`) VALUES
(1, 70, 1, 'Đã sở hữu'),
(2, 67, 1, 'Đã sở hữu'),
(3, 68, 1, 'Đã sở hữu'),
(4, 49, 1, 'Đã sở hữu'),
(5, 48, 1, 'Đã sở hữu'),
(6, 58, 1, 'Đã sở hữu'),
(7, 50, 1, 'Đã sở hữu'),
(8, 51, 1, 'Đã sở hữu'),
(9, 52, 1, 'Đã sở hữu'),
(10, 56, 1, 'Đã sở hữu'),
(11, 57, 1, 'Đã sở hữu');

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
  `fbUrl` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('Đã sở hữu','Chưa sở hữu') COLLATE utf8mb4_unicode_ci DEFAULT 'Chưa sở hữu'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `image_url`, `title`, `category`, `created`, `address`, `description`, `user_id`, `name`, `phone`, `zalo`, `fbUrl`, `status`) VALUES
(48, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734589531/timdothatlac/bq3bnvhswlb5t8rtvipz.png', 'Nhẫn vàng 18k đính đá', 'Đồ nhặt được', '2024-12-07', 'Lê Thị Bạch Cát, Phường 11, Quận 11, Thành phố Hồ Chí Minh, 72000, Việt Nam', 'Nhẫn vàng 18k đính đá', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 'Đã sở hữu'),
(49, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734590519/timdothatlac/gj9v05jgbgnxwhwwlifu.jpg', 'Giày Air Force One', 'Đồ thất lạc', '2024-12-10', 'Quốc lộ 55, Xã Đức Thuận, Huyện Tánh Linh, Tỉnh Bình Thuận, Việt Nam', 'Đôi giày Nike Air Force One màu trắng, logo Nike (Swoosh) màu đen nằm bên hông, kích cỡ 42. Đế giày dày với các rãnh tròn đặc trưng, có dấu hiệu sử dụng nhẹ với một vài vết mòn ở đế. Đôi giày có chữ \'Air Force One\' nhỏ trên lưỡi gà và dòng chữ \'Air\' nổi bật ở phần gót giày.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 'Đã sở hữu'),
(50, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734590594/timdothatlac/ddtpc07re3xptfjnagvg.jpg', 'Air Pod 4', 'Đồ nhặt được', '2024-10-22', 'Xã Phú An, Huyện Phú Tân, Tỉnh An Giang, Việt Nam', 'Thiết bị tai nghe không dây AirPods 4 của Apple.\r\nMàu sắc: Trắng bóng đặc trưng.\r\nThiết kế: Gồm 2 tai nghe nhỏ gọn và hộp sạc hình chữ nhật bo tròn các góc.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 'Đã sở hữu'),
(51, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734590685/timdothatlac/zzh1qc8mdi1ux9z9cb0t.jpg', 'Áo khoác nhung đen', 'Đồ thất lạc', '2024-07-03', 'Phường Chánh Phú Hòa, Thành phố Bến Cát, Tỉnh Bình Dương, Việt Nam', 'Chiếc áo khoác màu đen dáng dài, chất liệu vải dày dặn, có mũ liền và khóa kéo ở giữa. Áo có hai túi bên hông, một túi bên phải có chứa một đôi găng tay màu đen. Mũ áo lót lớp vải xám nhạt, tay áo có dây điều chỉnh và cúc bấm. Áo bị thất lạc vào tối ngày 15/12/2024 tại một quán cà phê trên đường Lý Tự Trọng, Quận 1, TP.HCM. Áo được để quên trên ghế trong góc phòng.\r\n\r\n\r\n\r\n\r\n\r\n\r\n', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 'Đã sở hữu'),
(52, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734590758/timdothatlac/bi7pw9izewgvpvaqstcw.jpg', 'Apple Watch 7', 'Đồ nhặt được', '2024-12-08', 'Xã Mỹ Phong, Thành phố Mỹ Tho, Tỉnh Tiền Giang, Việt Nam', 'Chiếc Apple Watch màu bạc thuộc dòng Series 7, kích thước 41mm, đi kèm dây đeo silicone màu trắng. Đồng hồ có một vết xước nhỏ ở góc dưới bên trái màn hình, khó nhận thấy nếu không nhìn kỹ. Mặt sau của đồng hồ hiển thị dòng chữ \"Designed by Apple in California\". Đồng hồ được cài đặt chế độ hiển thị mặt đồng hồ kỹ thuật số màu xanh dương.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 'Đã sở hữu'),
(53, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734590811/timdothatlac/jelw22navi9gjwgunlgk.jpg', 'Bông tai màu vàng', 'Đồ nhặt được', '2024-10-28', 'Hẻm 189 Phùng Hưng, Chợ Lớn, Quận 5, Thành phố Hồ Chí Minh, 72415, Việt Nam', 'Bông tai màu vàng được thiết kế dạng tròn với họa tiết tinh xảo, mang phong cách cổ điển. Trên bề mặt có khắc những đường vân nhỏ tạo độ lấp lánh khi ánh sáng chiếu vào. Bông tai có kích thước vừa phải, phù hợp với phong cách thanh lịch và sang trọng. Đặc biệt, một chiếc bông tai có một vết trầy xước nhẹ gần móc cài, dễ nhận biết nếu quan sát kỹ.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 'Chưa sở hữu'),
(54, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734590886/timdothatlac/uinrj24eqeu6lavtixde.jpg', 'Thẻ ngân hàng Vietcombank', 'Đồ thất lạc', '2024-12-19', 'Hẻm 164 Đường Lê Đình Thám, Phường Tân Quý, Quận Tân Phú, Thành phố Hồ Chí Minh, 72011, Việt Nam', 'Thẻ ngân hàng Vietcombank màu xanh lá cây đặc trưng, mặt trước có in logo của ngân hàng và tên chủ thẻ được in chìm bằng chữ in hoa màu trắng. Số thẻ gồm 16 chữ số nằm ở giữa mặt trước. Góc trên bên phải có biểu tượng thẻ chip, và góc dưới bên phải có logo của tổ chức thanh toán quốc tế như Visa hoặc Mastercard. Thẻ có dấu hiệu bị xước nhẹ ở mép dưới do sử dụng thường xuyên, đây là một đặc điểm dễ nhận diện.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 'Chưa sở hữu'),
(55, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734590935/timdothatlac/engfbpsufgz3slyoddsv.jpg', 'Bộ sạc điện thoại iPhone', 'Đồ nhặt được', '2024-10-19', 'BAR SAKU, Hẻm 15B Đường Lê Thánh Tôn, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, 71006, Việt Nam', 'Bộ sạc điện thoại iPhone màu trắng, gồm củ sạc nhỏ gọn và cáp sạc Lightning. Củ sạc có bề mặt mịn, in dòng chữ \"Designed by Apple in California\" cùng thông số kỹ thuật ở mặt sau. Đầu cáp sạc màu bạc sáng bóng, còn dây cáp có một vài vết uốn nhẹ do sử dụng thường xuyên. Bộ sạc có thể nhận diện nhờ vết trầy xước nhỏ ở góc trên của củ sạc, đây là đặc điểm nổi bật giúp dễ dàng nhận ra.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 'Chưa sở hữu'),
(56, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734590988/timdothatlac/ymlrraf9wr0svsjsipjc.jpg', 'Đồng hồ đeo tay', 'Đồ nhặt được', '2024-11-07', '231, Đường Nhật Tảo, Phường 8, Quận 10, Thành phố Hồ Chí Minh, 72415, Việt Nam', 'Chiếc đồng hồ đeo tay bị thất lạc có mặt đồng hồ tròn, khung kim loại sáng bóng và dây đeo bằng da màu nâu. Mặt đồng hồ có các số chỉ giờ rõ ràng và kim giờ, phút, giây mảnh, hoạt động ổn định. Dây đeo có một vài vết xước nhẹ và phần khoá cài bằng kim loại có logo nhỏ được khắc tinh tế. Đồng hồ có đặc điểm nhận dạng là một vết trầy nhỏ ở viền mặt kính và phần dây đeo hơi mòn do sử dụng thường xuyên. Đây là chiếc đồng hồ gắn bó với chủ nhân trong thời gian dài, mang ý nghĩa kỷ niệm đặc biệt.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 'Đã sở hữu'),
(57, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734591027/timdothatlac/vmjq4rb3tq0f6ee15hqa.jpg', 'Gấu bông trắng', 'Đồ nhặt được', '2024-04-17', 'Xã Tân Nhựt, Huyện Bình Chánh, Thành phố Hồ Chí Minh, Việt Nam', 'Gấu bông màu trắng mềm mại, kích thước khoảng 30cm, được làm từ chất liệu lông nhân tạo mịn màng. Gấu có đôi mắt tròn màu đen sáng bóng và một chiếc mũi nhỏ màu nâu. Điểm đặc biệt là gấu bông này mặc một chiếc áo len màu đỏ với dòng chữ \"Love\" thêu trên ngực. Ở phần chân của gấu có một vết chỉ bị bung nhẹ, đây là đặc điểm dễ nhận diện. Gấu bông được yêu thích và gắn bó lâu, nên rất mong được tìm lại.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 'Đã sở hữu'),
(58, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734591067/timdothatlac/qudoqkiuktjlyba967c9.jpg', 'Lắc tay màu bạc', 'Đồ nhặt được', '2024-12-07', 'Xã Phú Hữu, Huyện Nhơn Trạch, Tỉnh Đồng Nai, Việt Nam', 'Lắc tay màu bạc với thiết kế tinh tế, bề mặt sáng bóng và có một vài họa tiết khắc chìm nhỏ dọc theo vòng. Lắc tay có một móc khóa dạng tròn dễ sử dụng, ở vị trí gần móc khóa có đính một hạt charm nhỏ hình ngôi sao, là điểm đặc trưng nổi bật. Vòng tay có kích thước vừa phải, không quá rộng, phù hợp với cổ tay nữ giới. Đặc điểm nhận dạng thêm là một vết trầy xước nhỏ ở mặt trong của vòng, khó nhận thấy nếu không quan sát kỹ.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 'Đã sở hữu'),
(59, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734591137/timdothatlac/wbiumktq2yd25pijz0wu.jpg', 'Mac Book đen', 'Đồ thất lạc', '2024-12-01', 'Cầu Tân Bửu, Xã Tân Nhựt, Huyện Bình Chánh, Thành phố Hồ Chí Minh, Bến Lức, Tỉnh Long An, Việt Nam', 'MacBook màu đen, kích thước mỏng nhẹ, màn hình Retina sáng rõ. Máy có logo Apple phát sáng ở mặt lưng, với một vết trầy nhỏ ở góc dưới bên phải gần logo. Bàn phím màu đen với layout tiêu chuẩn, trackpad lớn và mượt mà. Phần góc trên màn hình có một miếng dán hình ngôi sao nhỏ, là đặc điểm dễ nhận diện. Máy có thể chứa một số dữ liệu quan trọng và đã cài mật khẩu bảo vệ.', 2, 'Kim Thị Quế Trân', '0385236993', '0385236993', 'https://www.facebook.com/profile.php?id=61558947097197', 'Chưa sở hữu'),
(60, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734591187/timdothatlac/h8ohjkks3sixigun9oly.jpg', 'Mặt dây chuyền xanh ngọc', 'Đồ thất lạc', '2024-11-30', 'Xã Tân Đông, Thạnh Hóa, Tỉnh Long An, Việt Nam', 'Mặt dây chuyền màu xanh ngọc, có hình dạng tròn nhỏ với bề mặt nhẵn bóng và ánh sáng nhẹ nhàng khi tiếp xúc ánh sáng. Mặt dây chuyền được làm từ chất liệu ngọc tự nhiên, mang màu xanh mát đặc trưng, xung quanh viền được bao bọc bởi một khung kim loại màu bạc sáng, khắc các hoa văn nhỏ tinh xảo. Đặc điểm nhận dạng nổi bật là một vết xước mảnh ở phía sau của mặt dây chuyền, cùng móc treo có thiết kế đơn giản nhưng chắc chắn.', 2, 'Kim Thị Quế Trân', '0385236993', '0385236993', 'https://www.facebook.com/profile.php?id=61558947097197', 'Chưa sở hữu'),
(61, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734591258/timdothatlac/hzud8jaehzgybdwf06b2.jpg', 'Nón lưỡi trai đen', 'Đồ nhặt được', '2024-10-15', 'Xã Phước Đông, Huyện Cần Đước, Tỉnh Long An, Việt Nam', 'Nón lưỡi trai màu đen, thiết kế đơn giản với phần lưỡi trai cứng cáp, bề mặt vải mềm mại. Nón có logo nhỏ màu trắng được thêu ở phía trước, nổi bật trên nền đen. Phía sau nón có khóa điều chỉnh kích thước bằng kim loại màu bạc, giúp vừa vặn với người đội. Phần trong nón có lót vải màu đen và một tem nhỏ ghi thông tin thương hiệu. Nón có một vết sờn nhẹ ở mép lưỡi trai, đây là đặc điểm dễ nhận biết.', 2, 'Kim Thị Quế Trân', '0385236993', '0385236993', 'https://www.facebook.com/profile.php?id=61558947097197', 'Chưa sở hữu'),
(62, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734591305/timdothatlac/mwh3bqfihhxvzji7wzvv.jpg', 'Sạc dự phòng INIU', 'Đồ thất lạc', '2024-12-14', 'Khsaetr Commune, Kampong Rou District, Svay Rieng, Cao Miên', 'Sạc dự phòng INIU màu đen, thiết kế mỏng gọn với bề mặt nhám chống trượt. Logo \"INIU\" được in sáng bóng ở mặt trước, bên cạnh là một màn hình nhỏ hiển thị phần trăm pin còn lại. Sạc có hai cổng USB và một cổng Type-C, được viền bạc sáng bóng. Một đặc điểm dễ nhận biết là sạc có một vết xước nhẹ ở gần góc phải phía trên, cùng với một sợi dây đeo nhỏ màu đen đi kèm, giúp dễ dàng nhận dạng.', 2, 'Kim Thị Quế Trân', '0385236993', '0385236993', 'https://www.facebook.com/profile.php?id=61558947097197', 'Chưa sở hữu'),
(63, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734591377/timdothatlac/uzpqetrpxpmcgbg2ajex.jpg', 'Tai nghe chụp tai Bluetooth', 'Đồ nhặt được', '2024-11-13', 'Xã Tân Lộc, Huyện Tam Bình, Tỉnh Vĩnh Long, 85217, Việt Nam', 'Tai nghe chụp tai Bluetooth màu đen, kiểu dáng hiện đại với lớp đệm tai mềm mại, mang lại cảm giác êm ái khi sử dụng. Phần chụp đầu có thể điều chỉnh kích thước, trên đó in logo nhỏ màu bạc nổi bật. Tai nghe có các nút điều khiển âm lượng và bật/tắt nằm ở bên tai phải. Đặc điểm dễ nhận dạng là một vết trầy nhỏ ở phần chụp đầu bên trái và dây sạc kèm theo có đầu nối màu đỏ độc đáo. Tai nghe đã được sử dụng nhưng vẫn còn hoạt động tốt.', 2, 'Kim Thị Quế Trân', '0385236993', '0385236993', 'https://www.facebook.com/profile.php?id=61558947097197', 'Chưa sở hữu'),
(64, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734591428/timdothatlac/kht8jttxtipk2zdjffpn.jpg', 'Túi xách LV trắng', 'Đồ thất lạc', '2024-12-07', 'Xã Long An, Huyện Long Thành, Tỉnh Đồng Nai, 76009, Việt Nam', 'Túi xách LV màu trắng, thiết kế sang trọng với họa tiết monogram đặc trưng của thương hiệu Louis Vuitton. Túi có dây đeo dài, dễ dàng sử dụng làm túi đeo vai hoặc túi xách tay. Chất liệu da mềm mại, bề mặt túi có độ bóng nhẹ. Đặc điểm nhận dạng nổi bật là một vết trầy nhỏ ở góc dưới bên phải của túi, cùng với móc khóa kim loại sáng bóng có khắc logo LV. Bên trong túi có một ngăn nhỏ, thường đựng các vật dụng cá nhân.', 2, 'Kim Thị Quế Trân', '0385236993', '0385236993', 'https://www.facebook.com/profile.php?id=61558947097197', 'Chưa sở hữu'),
(65, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734591483/timdothatlac/bmqfweojmqhwnreyvyvc.jpg', 'Ví da', 'Đồ thất lạc', '2024-12-18', 'Cầu Đức Huệ, Thị trấn Hiệp Hòa, Đức Hòa, Tỉnh Long An, Việt Nam', 'Ví da màu nâu sẫm, chất liệu mềm mại, bề mặt trơn với một vài đường may tinh tế chạy dọc viền. Ví có kích thước nhỏ gọn, đủ để cầm trong lòng bàn tay, bên trong chứa các ngăn đựng thẻ và một ngăn khóa kéo nhỏ để đựng tiền xu. Đặc biệt, ví có một vết xước nhỏ ở góc dưới bên phải và logo thương hiệu được dập chìm ở mặt trước. Trong ví có thể có một vài giấy tờ cá nhân, bao gồm thẻ căn cước hoặc giấy tờ quan trọng khác.', 2, 'Kim Thị Quế Trân', '0385236993', '0385236993', 'https://www.facebook.com/profile.php?id=61558947097197', 'Đã sở hữu'),
(67, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734597283/timdothatlac/ibozn8ae8wdffmey7pa6.jpg', 'iPhone 14 Pro Max', 'Đồ thất lạc', '2024-12-19', 'Xã Trà Côn, Huyện Trà Ôn, Tỉnh Vĩnh Long, Việt Nam', 'Chiếc điện thoại bị thất lạc là một chiếc iPhone 14 Pro Max, thuộc dòng cao cấp của Apple, với thiết kế sang trọng và hiện đại. Điện thoại có màu sắc đặc trưng và màn hình lớn, tràn viền, được trang bị cụm camera nổi bật với 3 ống kính ở mặt sau. Ngoài ra, chiếc iPhone này còn có một số dấu hiệu riêng như hình nền cá nhân hóa hoặc có thể có một ốp lưng bảo vệ đặc biệt. Nếu ai nhặt được hoặc có thông tin liên quan, xin vui lòng liên hệ để hoàn trả.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 'Đã sở hữu'),
(68, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734676603/timdothatlac/ujp7ym0rayyf5dhffba2.jpg', 'Xe Đạp Đua XdS RS450 Pro 2025', 'Đồ nhặt được', '2024-12-19', 'Quốc lộ 57, Thị trấn Thạnh Phú, Huyện Thạnh Phú, Tỉnh Bến Tre, Việt Nam', 'Một vết trầy nhỏ ở phần khung gần cổ xe bên trái. Lốp xe có in dòng chữ \"Continental Ultra Sport\" màu trắng trên viền đen. Phần yên xe có logo XdS được in màu bạc.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 'Đã sở hữu'),
(69, 'https://res.cloudinary.com/duk8odqun/image/upload/v1734686799/timdothatlac/qyeeicmkjgtncamj2osv.png', 'Bông tai Vàng 24K PNJ', 'Đồ thất lạc', '2024-12-20', 'Phường 3, Thành phố Trà Vinh, Tỉnh Trà Vinh, Việt Nam', 'Bông tai được làm từ vàng 24K, màu vàng ánh kim sáng bóng, không pha lẫn màu sắc khác. Thiết kế nhỏ gọn với dạng hình tròn, viền ngoài chạm khắc hoa văn tinh xảo, có thể là họa tiết hoa lá hoặc những đường nét uốn lượn cổ điển. Mỗi bông tai đều có khắc logo PNJ ở mặt trong, đây là dấu hiệu đặc trưng rất dễ nhận biết nếu kiểm tra kỹ. Kích thước của bông tai khoảng 1.5 - 2 cm, mang phong cách trang sức sang trọng nhưng không quá nổi bật. Tình trạng bông tai còn mới, không có dấu hiệu trầy xước hoặc hư hỏng. Nếu có hộp đi kèm, hộp sẽ có màu xanh biển đặc trưng của thương hiệu PNJ, bên trong lót nhung mềm mại màu trắng. Nếu ai tìm thấy đồ vật có đặc điểm như trên, xin vui lòng liên hệ ngay!', 2, 'Kim Thị Quế Trân', '0385236993', '0385236993', 'https://www.facebook.com/profile.php?id=61558947097197', 'Chưa sở hữu'),
(70, 'https://res.cloudinary.com/duk8odqun/image/upload/v1735459641/timdothatlac/meqlr7skkf44zisjiewa.jpg', 'Ví màu đỏ', 'Đồ nhặt được', '2024-12-26', 'Xã Bàu Trâm, Thành phố Long Khánh, Tỉnh Đồng Nai, 76615, Việt Nam', 'Chiếc ví màu đỏ được làm từ chất liệu da mềm, có bề mặt trơn và không có họa tiết nổi bật, chỉ có một logo nhỏ dập chìm ở góc dưới bên phải. Ví có hình chữ nhật với kích thước khoảng 10x15cm, sử dụng khóa kéo màu bạc chắc chắn. Bên trong ví được chia thành nhiều ngăn, gồm ngăn lớn có khóa kéo, các ngăn để tiền và thẻ, phù hợp để sắp xếp đồ dùng cá nhân. Trên ví có một vài vết xước nhỏ ở các góc do sử dụng thường xuyên, là dấu hiệu nhận dạng đặc trưng. Ngoài ra, có thể bên trong ví chứa một số giấy tờ cá nhân, hóa đơn, hoặc thẻ ngân hàng giúp xác định chủ sở hữu.', 1, 'Nguyen Anh Tuan', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 'Đã sở hữu');

--
-- Triggers `posts`
--
DELIMITER $$
CREATE TRIGGER `after_posts_update` AFTER UPDATE ON `posts` FOR EACH ROW BEGIN
  IF NEW.status = 'Đã sở hữu' THEN
    INSERT INTO owned_posts (post_id, user_id, status)
    VALUES (NEW.post_id, NEW.user_id, NEW.status)
    ON DUPLICATE KEY UPDATE
      user_id = NEW.user_id, status = NEW.status;
  END IF;
END
$$
DELIMITER ;

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
(1, 'Nguyen Anh Tuan', '$2a$10$Adh8Zzm5OuhpB0qp.JX1ieRRIjEZ9UMwTNzPv5m3e8cN9sDlV6NnO', 'nguyenanhtuan.profile@gmail.com', '0869094929', '0869094929', 'https://www.facebook.com/NguyenAnhTuxn', 939865, '2025-01-02 04:34:05'),
(2, 'Kim Thị Quế Trân', '$2a$10$DrsdWYuyHBgeGpVXDQFReuS9W/D1WxwnO0rvntkUv79V6QJmtmlgK', 'tranque913@gmail.com', '0385236993', '0385236993', 'https://www.facebook.com/profile.php?id=61558947097197', 519829, '2024-12-19 02:55:53');

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
-- Indexes for table `owned_posts`
--
ALTER TABLE `owned_posts`
  ADD PRIMARY KEY (`owned_post_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

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
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `owned_posts`
--
ALTER TABLE `owned_posts`
  MODIFY `owned_post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `owned_posts`
--
ALTER TABLE `owned_posts`
  ADD CONSTRAINT `owned_posts_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `owned_posts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
