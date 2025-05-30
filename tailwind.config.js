/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#0B0C10',
          darker: '#070709',
        },
        neon: {
          blue: '#00F6FF',
          pink: '#FF00C7',
          purple: '#9D00FF',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.3)',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 246, 255, 0.5), 0 0 10px rgba(0, 246, 255, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(0, 246, 255, 0.8), 0 0 20px rgba(0, 246, 255, 0.5), 0 0 30px rgba(0, 246, 255, 0.3)' },
        },
      },
      backgroundImage: {
        'cyber-grid': "url('https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      },
    },
  },
  plugins: [],
};