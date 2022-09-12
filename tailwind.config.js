module.exports = {
  purge: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
        'montserrat-bold': ['Montserrat-Bold'],
        'montserrat-medium': ['Montserrat-Medium'],
    },
    extend: {
      colors: {
        'primary' : '#0081d1',
        'gray2' : '#999',
      
      },
      zIndex: {
        '-1': '-1',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
