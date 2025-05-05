import { useEffect } from 'react';

const FallingFlowers = () => {
  useEffect(() => {
    const container = document.getElementById('falling-flowers');

    // Danh sách 6 hình ảnh hoa
    const flowerImages = [
      "https://res.cloudinary.com/duk8odqun/image/upload/v1743126584/Frame_4_d3o30y.png",
      "https://res.cloudinary.com/duk8odqun/image/upload/v1743126769/image-Photoroom_avirmo.png",
      "https://res.cloudinary.com/duk8odqun/image/upload/v1743127218/image-Photoroom_1_patgwo.png",
      "https://res.cloudinary.com/duk8odqun/image/upload/v1736151725/image_3-Photoroom_kfm5b4.png",
      "https://res.cloudinary.com/duk8odqun/image/upload/v1736151725/image_2-Photoroom_hv1e5p.png",
      "https://res.cloudinary.com/duk8odqun/image/upload/v1736151725/image_4-Photoroom_nfsvoq.png",
    ];

    const createFlower = () => {
      const flower = document.createElement('div');
      flower.classList.add(
        'absolute',
        'w-6',
        'h-6',
        'bg-contain',
        'bg-no-repeat',
        'animate-fall'
      );

      // Vị trí xuất hiện ngẫu nhiên
      const startX = Math.random() * 100; // Tọa độ X ngẫu nhiên (vw)
      const startY = Math.random() * -50 - 10; // Xuất hiện từ vị trí cao hơn màn hình

      // Tạo giá trị ngẫu nhiên cho thời gian và hướng rơi
      const duration = Math.random() * 7 + 10; // Thời gian rơi (10-17s)
      const rotation = Math.random() * 360; // Góc xoay ban đầu

      flower.style.left = `${startX}vw`;
      flower.style.top = `${startY}vh`;

      // Gán giá trị biến CSS để mỗi cánh hoa khác nhau
      flower.style.setProperty('--fall-duration', `${duration}s`);
      flower.style.setProperty('--fall-delay', `0s`); // Không có delay
      flower.style.setProperty('--fall-rotation', `${rotation}deg`);

      // Chọn ngẫu nhiên một hình ảnh hoa
      const randomImage = flowerImages[Math.floor(Math.random() * flowerImages.length)];
      flower.style.backgroundImage = `url('${randomImage}')`;

      container.appendChild(flower);

      setTimeout(() => {
        flower.remove();
      }, duration * 1000); // Không có delay, chỉ dựa vào thời gian rơi
    };

    // Tạo hoa ngay lập tức và không có độ trễ
    for (let i = 0; i < 10; i++) { // Số lượng hoa ngay lập tức
      createFlower();
    }

    // Tạo cánh hoa liên tục sau đó
    const interval = setInterval(createFlower, 1000);

    return () => clearInterval(interval); // Dọn dẹp khi component bị unmount
  }, []);

  return null;
};

export default FallingFlowers;
