import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "flow-green": {
          "50": "#f0f9f0",
          "100": "#dceeda",
          "200": "#bde0b9",
          "300": "#92cc8e",
          "400": "#6bb465",
          "500": "#4b9745",
          "600": "#377a31",
          "700": "#2e6229",
          "800": "#244d23",
          "900": "#1d401c",
        },
        "flow-teal": {
          "50": "#effaf9",
          "100": "#d7f4f0",
          "200": "#b0e9e0",
          "300": "#84d7cb",
          "400": "#4cbeb2",
          "500": "#34a397",
          "600": "#27827b",
          "700": "#246963",
          "800": "#20514d",
          "900": "#1d4340",
        },
      },
    },
  },
  plugins: [],
};

export default config; 