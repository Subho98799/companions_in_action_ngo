import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171513",
        paper: "#f8f3eb",
        linen: "#efe4d5",
        moss: "#546b4b",
        leaf: "#7b9b5f",
        clay: "#b86b4b",
        marigold: "#e0a13a",
        river: "#2f6f73"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 28px 80px rgba(38, 27, 18, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
