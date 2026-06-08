/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#2563EB',
          accent: '#3B82F6',
        },
        dark: {
          DEFAULT: '#0A0A0A',
          100: '#171717',
          200: '#262626',
        },
        light: {
          DEFAULT: '#FFFFFF',
          100: '#F5F5F5',
          200: '#E5E5E5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
