/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./wantToRead.html",
    "./read.html",
    "./**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        rotation: 'rotation 1s linear infinite',
      },
    },
  },
  plugins: [],
}