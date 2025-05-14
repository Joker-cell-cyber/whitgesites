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
        'ai-blue': {
          '400': '#4299e1',
          '500': '#3182ce',
          '600': '#2b6cb0',
          '700': '#2c5282',
        },
        'ai-purple': {
          '400': '#9f7aea',
          '500': '#805ad5',
          '600': '#6b46c1',
          '700': '#553c9a',
        },
        'ai-green': {
          '400': '#48bb78',
          '500': '#38a169',
          '600': '#2f855a',
          '700': '#276749',
        },
        'ai-red': {
          '400': '#f56565',
          '500': '#e53e3e',
          '600': '#c53030',
          '700': '#9b2c2c',
        },
        'ai-yellow': {
          '400': '#ecc94b',
          '500': '#d69e2e',
          '600': '#b7791f',
          '700': '#975a16',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 5s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'rotate-slow': 'rotateSlow 15s linear infinite',
        'matrix': 'matrix 5s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 0.8 },
        },
        orbit: {
          '0%': { 
            transform: 'rotate(0deg) translateX(120px) rotate(0deg)',
          },
          '100%': { 
            transform: 'rotate(360deg) translateX(120px) rotate(-360deg)',
          },
        },
        rotateSlow: {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        matrix: {
          '0%': { transform: 'translateY(0)', opacity: 0 },
          '10%': { opacity: 1 },
          '100%': { transform: 'translateY(100vh)', opacity: 0 },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-size': '20px 20px',
      },
    },
  },
  plugins: [],
}; 