/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        'razer-green': {
          50: '#E6FAE3',
          100: '#C3F2BA',
          200: '#9FE991',
          300: '#7AE067',
          400: '#56D73E',
          500: '#44D62C',
          600: '#33A821',
          700: '#277A18',
          800: '#1E5E12',
          900: '#184D0E',
        },
        'neon-purple': {
          50: '#F5EEFF',
          100: '#E9D9FF',
          200: '#D2B3FF',
          300: '#BC8DFF',
          400: '#A667FF',
          500: '#9147FF',
          600: '#7837DB',
          700: '#5C29B7',
          800: '#431D93',
          900: '#2E157A',
        },
        'electric-blue': {
          50: '#E6FFFF',
          100: '#CCFFFF',
          200: '#99FFFF',
          300: '#66FFFF',
          400: '#33FFFF',
          500: '#00FFFF',
          600: '#00CCCC',
          700: '#009999',
          800: '#006666',
          900: '#003333',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-chakra)', 'var(--font-saira)', 'sans-serif'],
        saira: ['var(--font-saira)', 'sans-serif'],
        chakra: ['var(--font-chakra)', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(68, 214, 44, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(68, 214, 44, 0.1) 1px, transparent 1px)',
        'circuit-pattern': 'linear-gradient(rgba(68, 214, 44, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(68, 214, 44, 0.05) 1px, transparent 1px), linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)',
        'hexagon-pattern': 'repeating-linear-gradient(60deg, rgba(68, 214, 44, 0.05) 0, rgba(68, 214, 44, 0.05) 1px, transparent 1px, transparent 30px), repeating-linear-gradient(120deg, rgba(68, 214, 44, 0.05) 0, rgba(68, 214, 44, 0.05) 1px, transparent 1px, transparent 30px)',
      },
      backgroundSize: {
        'grid': '30px 30px',
        'circuit': '20px 20px, 20px 20px, 5px 5px, 5px 5px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s infinite',
        'neon-pulse': 'neon-pulse 3s infinite',
        'purple-pulse': 'purple-pulse 3s infinite',
        'glitch': 'glitch 0.8s infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px 0 rgba(68, 214, 44, 0.4)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(68, 214, 44, 0.6)' },
        },
        'neon-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px 0 rgba(0, 255, 255, 0.4)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(0, 255, 255, 0.6)' },
        },
        'purple-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px 0 rgba(145, 71, 255, 0.4)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(145, 71, 255, 0.6)' },
        },
        'glitch': {
          '0%': { 
            clipPath: 'inset(40% 0 61% 0)',
            transform: 'translate(-2px, 2px)',
          },
          '20%': { 
            clipPath: 'inset(92% 0 1% 0)',
            transform: 'translate(1px, -3px)',
          },
          '40%': { 
            clipPath: 'inset(43% 0 1% 0)',
            transform: 'translate(3px, 1px)',
          },
          '60%': { 
            clipPath: 'inset(25% 0 58% 0)',
            transform: 'translate(-5px, 2px)',
          },
          '80%': { 
            clipPath: 'inset(54% 0 7% 0)',
            transform: 'translate(5px, -1px)',
          },
          '100%': { 
            clipPath: 'inset(58% 0 43% 0)',
            transform: 'translate(-2px, 2px)',
          },
        },
      },
    },
  },
  plugins: [],
}; 