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
        espresso: {
          50: "#f8f5f1",
          100: "#f1e8df",
          200: "#e6d7c8",
          300: "#d3b69a",
          400: "#b9865a",
          500: "#8f5d3a",
          600: "#734d2f",
          700: "#5b3d27",
          800: "#433121",
          900: "#2a201a",
        },
        cream: "#f9f4ef",
        latte: "#f4d8b8",
        amber: "#f59e0b",
        cocoa: "#2d1a12",
      },
      boxShadow: {
        soft: "0 20px 45px rgba(67, 49, 33, 0.15)",
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;
