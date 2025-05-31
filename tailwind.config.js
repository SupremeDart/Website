/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 15s linear infinite',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'], // Or urbanist/manrope
      },
    },
  },
  plugins: [],
}

