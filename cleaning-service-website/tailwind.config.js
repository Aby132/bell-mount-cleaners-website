module.exports = {
  purge: ['./src/**/*.{html,js}', './src/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Example primary color
        secondary: '#FBBF24', // Example secondary color
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};