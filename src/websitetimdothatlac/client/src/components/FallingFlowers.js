import { useEffect } from 'react';

const FallingFlowers = () => {
  useEffect(() => {
    const container = document.getElementById('falling-flowers');

    // Danh sách 6 hình ảnh hoa
    const flowerImages = [
      "https://res.cloudinary.com/duk8odqun/image/upload/v1736150478/flower_z0qjdq.png",
      "https://res.cloudinary.com/duk8odqun/image/upload/v1736151725/image_5-Photoroom_tvs76m.png",
      "https://res.cloudinary.com/duk8odqun/image/upload/v1736151725/image_1-Photoroom_h3hqv8.png",
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

      // Vị trí xuất hiện ngẫu nhiên nhưng không trùng lặp
      const startX = Math.random() * 100; // Tọa độ X ngẫu nhiên (vw)
      const startY = Math.random() * -50 - 10; // Xuất hiện từ vị trí cao hơn màn hình (tăng khoảng cách âm)

      // Tạo giá trị ngẫu nhiên cho thời gian và hướng rơi
      const duration = Math.random() * 7 + 10; // Thời gian rơi (3-7s)
      const delay = Math.random() * 2; // Độ trễ ngẫu nhiên (0-2s)
      const rotation = Math.random() * 360; // Góc xoay ban đầu

      flower.style.left = `${startX}vw`;
      flower.style.top = `${startY}vh`;

      // Gán giá trị biến CSS để mỗi cánh hoa khác nhau
      flower.style.setProperty('--fall-duration', `${duration}s`);
      flower.style.setProperty('--fall-delay', `${delay}s`);
      flower.style.setProperty('--fall-rotation', `${rotation}deg`);

      // Chọn ngẫu nhiên một hình ảnh hoa
      const randomImage = flowerImages[Math.floor(Math.random() * flowerImages.length)];
      flower.style.backgroundImage = `url('${randomImage}')`;

      container.appendChild(flower);

      setTimeout(() => {
        flower.remove();
      }, (duration + delay) * 1000);
    };

    // Tạo cánh hoa liên tục với khoảng cách hợp lý hơn
    const interval = setInterval(createFlower, 400); // Tăng khoảng thời gian giữa các lần tạo hoa

    return () => clearInterval(interval); // Dọn dẹp khi component bị unmount
  }, []);

  return null;
};

export default FallingFlowers;
