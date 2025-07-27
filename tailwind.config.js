/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 Habilita el modo oscuro con clase
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Para que Vite encuentre todos los archivos de React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}