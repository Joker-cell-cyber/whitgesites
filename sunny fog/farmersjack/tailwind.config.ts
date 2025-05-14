import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'vid-red': {
          '500': '#ff4a4a',
          '600': '#e53e3e',
        },
        'vid-orange': {
          '500': '#ff7a00',
          '600': '#e76e00',
        },
        // Gaming-themed color palette
        'game-blue': {
          '50': '#e3f0ff',
          '100': '#c4daff',
          '200': '#9abbff',
          '300': '#619cff',
          '400': '#3b7eff',
          '500': '#0a5bff',
          '600': '#0045e6',
          '700': '#0033cc',
          '800': '#0027a3',
          '900': '#00216b',
        },
        'game-green': {
          '50': '#e5fff2',
          '100': '#c2ffe0',
          '200': '#7dffbf',
          '300': '#33ff9f',
          '400': '#00ff7a',
          '500': '#00db63',
          '600': '#00b050',
          '700': '#008542',
          '800': '#006b36',
          '900': '#00542c',
        },
        'neon-pink': {
          '400': '#ff44cc',
          '500': '#ff00bb',
          '600': '#cc00aa',
        },
        'cyber-yellow': {
          '400': '#ffee00',
          '500': '#ffcc00',
          '600': '#e6b800',
        },
        'toxic-green': {
          '400': '#c8ff00',
          '500': '#aaff00',
          '600': '#88cc00',
        },
        'plasma-purple': {
          '400': '#b44aff',
          '500': '#9b00ff',
          '600': '#7700cc',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "neon-pulse": {
          "0%, 100%": { 
            textShadow: "0 0 10px rgba(255, 0, 187, 0.7), 0 0 20px rgba(255, 0, 187, 0.5), 0 0 30px rgba(255, 0, 187, 0.3)" 
          },
          "50%": { 
            textShadow: "0 0 15px rgba(255, 0, 187, 0.9), 0 0 25px rgba(255, 0, 187, 0.7), 0 0 35px rgba(255, 0, 187, 0.5)" 
          },
        },
        "rgb-shift": {
          "0%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(180deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "neon-pulse": "neon-pulse 2s infinite",
        "rgb-shift": "rgb-shift 10s infinite linear",
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(rgba(18, 18, 30, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 18, 30, 0.8) 1px, transparent 1px)",
        "gamer-gradient": "linear-gradient(to right, #0a5bff, #00db63)",
        "neon-glow": "linear-gradient(to right, #ff00bb, #9b00ff)",
      },
      boxShadow: {
        'neon-glow': '0 0 10px rgba(255, 0, 187, 0.7), 0 0 20px rgba(155, 0, 255, 0.5)',
        'game-glow': '0 0 15px rgba(10, 91, 255, 0.7), 0 0 30px rgba(0, 219, 99, 0.5)',
      }
    },
  },
  plugins: [],
};

export default config; 