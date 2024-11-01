module.exports = {
  content: [
    "./src/**/*.{html,js}",
    './public/index.html'
  ],
  theme: {
    extend: {
      width: {
        '1100': '1100px'
      },
      backgroudColor: {
        primary: '#F5F5F5',
        secondary1: '#1266dd',
        secondary2: '#73859'
      },
      maxWidth:{
        '600': '600px'
      },
      cursor: {
        pointer: 'pointer'
      }
    },
  },
  plugins: [],
}