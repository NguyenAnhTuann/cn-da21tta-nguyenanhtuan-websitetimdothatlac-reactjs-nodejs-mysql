module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fall: {
          '0%': {
            transform: 'translate(0, -100px) rotate(0deg)', // Bắt đầu
            opacity: '1',
          },
          '50%': {
            transform: 'translateX(-50px) translateY(50vh) rotate(180deg)', // Nửa đường, đổi hướng gió
            opacity: '0.8',
          },
          '100%': {
            transform: 'translateX(100px) translateY(100vh) rotate(360deg)', // Kết thúc với hướng gió khác
            opacity: '0',
          },
        },
      },
      animation: {
        fall: 'fall var(--fall-duration) linear var(--fall-delay) infinite', // Sử dụng biến để tùy chỉnh
      },
    },
  },
  plugins: [],
};
