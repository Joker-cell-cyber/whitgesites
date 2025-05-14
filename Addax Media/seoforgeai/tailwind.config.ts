import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Palette SEOForgeAI: chaleureuse et corporate
        border: "#E5E7EB",
        input: "#D1D5DB",
        ring: "#F97316", // orange-500
        background: "#FFFFFF",
        foreground: "#1F2937",
        primary: {
          DEFAULT: "#F97316", // orange-500
          foreground: "#FFFFFF",
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
        secondary: {
          DEFAULT: "#4B5563", // gray-600
          foreground: "#FFFFFF",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        accent: {
          DEFAULT: "#EC4899", // pink-500
          foreground: "#FFFFFF",
          50: "#FDF2F8",
          100: "#FCE7F3",
          200: "#FBCFE8",
          300: "#F9A8D4",
          400: "#F472B6",
          500: "#EC4899",
          600: "#DB2777",
          700: "#BE185D",
          800: "#9D174D",
          900: "#831843",
        },
        destructive: {
          DEFAULT: "#EF4444", // red-500
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F3F4F6", // gray-100
          foreground: "#6B7280", // gray-500
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1F2937", // gray-800
        },
        
        // Alias plus sémantiques pour la marque
        oneiric: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
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
        "gradient-xy": {
          "0%, 100%": { backgroundSize: "400% 400%", backgroundPosition: "0% 0%" },
          "25%": { backgroundSize: "400% 400%", backgroundPosition: "100% 0%" },
          "50%": { backgroundSize: "400% 400%", backgroundPosition: "100% 100%" },
          "75%": { backgroundSize: "400% 400%", backgroundPosition: "0% 100%" },
        },
        "text": {
          "0%, 100%": { backgroundSize: "200% 200%", backgroundPosition: "left center" },
          "50%": { backgroundSize: "200% 200%", backgroundPosition: "right center" },
        },
        "blob": {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "rotate-y": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        "scroll-down": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "30%": { transform: "translateY(4px)", opacity: "1" },
          "60%": { transform: "translateY(0)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "0" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(138, 75, 255, 0.5), 0 0 10px rgba(138, 75, 255, 0.3)" },
          "50%": { boxShadow: "0 0 15px rgba(138, 75, 255, 0.8), 0 0 20px rgba(138, 75, 255, 0.5)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-xy": "gradient-xy 15s ease infinite",
        "text": "text 5s ease infinite",
        "blob": "blob 7s infinite",
        "float": "float 6s ease-in-out infinite",
        "fade-in-down": "fade-in-down 1s ease-out",
        "fade-in-up": "fade-in-up 1s ease-out",
        "fade-in": "fade-in 1.5s ease-out",
        "rotate-y": "rotate-y 20s linear infinite",
        "scroll-down": "scroll-down 1.5s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "spin-reverse": "spin-reverse 1.5s linear infinite",
      },
      perspective: {
        "1000": "1000px",
      },
      transformStyle: {
        "3d": "preserve-3d",
      },
      rotate: {
        "y-5": "rotateY(5deg)",
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(circle, var(--tw-gradient-stops))",
      },
      backdropFilter: {
        "none": "none",
        "blur": "blur(8px)",
      },
      willChange: {
        "transform": "transform",
        "opacity": "opacity",
        "filter": "filter",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};

export default config; 