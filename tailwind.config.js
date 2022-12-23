/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{vue,js}",
    "./src/**/*.vue",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
};
