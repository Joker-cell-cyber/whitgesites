/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': {
          50: '#e6f7f5',
          100: '#ccefe9',
          200: '#99dfd4',
          300: '#66cfbe',
          400: '#33bfa9',
          500: '#00af93',
          600: '#008c76',
          700: '#006958',
          800: '#00463b',
          900: '#00231d',
        },
        'secondary': {
          50: '#ebf7ee',
          100: '#d7efdc',
          200: '#afdeb9',
          300: '#88ce96',
          400: '#60bd73',
          500: '#38ad50',
          600: '#2d8a40',
          700: '#226830',
          800: '#174520',
          900: '#0b2310',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
}