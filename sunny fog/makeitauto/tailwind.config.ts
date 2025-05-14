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
        "make-purple": {
          "50": "#f6f4fb",
          "100": "#ede8f7",
          "200": "#d9d0ef",
          "300": "#b9a9e2",
          "400": "#9379d2",
          "500": "#7e5bc7",
          "600": "#6641b5",
          "700": "#563494",
          "800": "#47307a",
          "900": "#3c2b62",
        },
        "make-blue": {
          "50": "#eef4ff",
          "100": "#deeaff",
          "200": "#c5d8ff",
          "300": "#a1bffd",
          "400": "#799bfb",
          "500": "#577df9",
          "600": "#3956f4",
          "700": "#3142dc",
          "800": "#2e38b1",
          "900": "#2a348d",
        },
      },
    },
  },
  plugins: [],
};

export default config; 