/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Add custom colors to easily manage your design system
      colors: {
        'primary': '#3498db',
        'secondary': '#2c3e50',
        'accent': '#1abc9c',
        'light-bg': '#ecf0f1',
        'light-card': '#f4f7f6',
      },
      // Define the keyframes for the dashboard slider animation
      keyframes: {
        slide: {
          '0%, 100%': { transform: 'translateX(0%)' },
          '33%': { transform: 'translateX(-100%)' },
          '66%': { transform: 'translateX(-200%)' },
        },
      },
      // Assign the keyframes to an animation utility class
      animation: {
        'dashboard-slide': 'slide 15s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}