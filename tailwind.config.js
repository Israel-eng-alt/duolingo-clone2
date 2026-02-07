/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Duolingo brand colors
        'duo-green': '#58CC02',
        'duo-green-dark': '#58A700',
        'duo-green-light': '#89E219',
        'duo-blue': '#1CB0F6',
        'duo-orange': '#FF9600',
        'duo-red': '#FF4B4B',
        'duo-purple': '#CE82FF',
        'duo-pink': '#FF7CB6',
        'duo-yellow': '#FFD900',
        // Neutral colors
        'duo-gray-100': '#F7F7F7',
        'duo-gray-200': '#E5E5E5',
        'duo-gray-300': '#AFAFAF',
        'duo-gray-400': '#777777',
        'duo-gray-500': '#4B4B4B',
        'duo-gray-800': '#3C3C3C',
        'duo-gray-900': '#1A1A1A',
        // Semantic colors
        'success': '#58CC02',
        'error': '#FF4B4B',
        'warning': '#FF9600',
        'streak': '#FF9600',
        'xp': '#FFD900',
      },
      fontFamily: {
        'heading': ['Nunito', 'DIN Round', 'sans-serif'],
        'body': ['Inter', 'SF Pro', 'sans-serif'],
      },
      borderRadius: {
        'duo': '16px',
        'duo-sm': '12px',
        'duo-lg': '20px',
      },
      boxShadow: {
        'duo': '0 4px 0 #58A700',
        'duo-hover': '0 6px 0 #58A700',
        'duo-active': '0 2px 0 #58A700',
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'bounce-short': 'bounce-short 0.5s ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'bounce-short': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
