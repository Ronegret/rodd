/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
      },
      colors: {
        bg: '#050505',
        accent: '#D4FF00', // Acid Green
        accent2: '#0044FF', // Electric Blue
      }
    },
  },
  plugins: [],
}
