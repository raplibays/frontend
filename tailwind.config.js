module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'arjuno': "url('assets/gunung/arjuno.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
        require('@tailwindcss/line-clamp'),

  ],
}
