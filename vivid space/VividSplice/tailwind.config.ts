import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eaecff',
          100: '#d0d6ff',
          200: '#a6b0ff',
          300: '#7c89ff',
          400: '#5263e0',
          500: '#1E2F97',
          600: '#1a2a87',
          700: '#15216b',
          800: '#111a54',
          900: '#0d1445',
        },
        turquoise: {
          50: '#e6fbfb',
          100: '#c0f2f3',
          200: '#8ce7e8',
          300: '#57dada',
          400: '#31cece',
          500: '#20BDBE',
          600: '#1ca8a9',
          700: '#178a8b',
          800: '#136e6f',
          900: '#0f5a5a',
        },
        violet: {
          50: '#f3efff',
          100: '#e4daff',
          200: '#cbb8ff',
          300: '#b08fff',
          400: '#9169ff',
          500: '#7A4AFF',
          600: '#6a40e0',
          700: '#5835ba',
          800: '#472b95',
          900: '#3a2378',
        },
        background: '#1A1A22',
        foreground: '#F7F8FC',
        card: '#22222c',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Poppins', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        accent: ['Space Grotesk', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s infinite',
        'slide-in': 'slide-in 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'rotate-slow': 'rotate-slow 15s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px 0 rgba(30, 47, 151, 0.4)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(30, 47, 151, 0.6)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config 