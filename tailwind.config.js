/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#6366f1', // Violet/Indigo
          600: '#4f46e5',
          700: '#4338ca',
          900: '#312e81',
        },
        secondary: {
          400: '#fbbf24', // Amber
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
}