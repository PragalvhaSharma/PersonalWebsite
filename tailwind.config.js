/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        'terminal-green': '#00ff00',
        'terminal-black': '#000000',
      },
      animation: {
        'cursor-blink': 'blink 1s infinite',
        'glitch': 'glitch 0.2s ease',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-effect': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-5px, 5px)' },
          '40%': { transform: 'translate(-5px, -5px)' },
          '60%': { transform: 'translate(5px, 5px)' },
          '80%': { transform: 'translate(5px, -5px)' },
          '100%': { transform: 'translate(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(0.995)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(75, 85, 99, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(75, 85, 99, 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-pattern': '20px 20px',
      },
    },
  },
  plugins: [],
}; 