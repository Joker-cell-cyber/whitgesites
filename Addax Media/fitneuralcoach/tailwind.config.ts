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
        border: "#e2e8f0",
        input: "#e2e8f0",
        ring: "#1e293b",
        background: "#ffffff",
        foreground: "#0f172a",
        primary: {
          DEFAULT: "#1e293b",
          foreground: "#f8fafc",
        },
        secondary: {
          DEFAULT: "#f1f5f9",
          foreground: "#1e293b",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#f8fafc",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
        accent: {
          DEFAULT: "#f1f5f9",
          foreground: "#1e293b",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
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