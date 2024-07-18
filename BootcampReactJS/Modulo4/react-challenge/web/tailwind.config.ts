import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        backgroundMain: "#f4f4f4",
        backgroundSectionTable: "#f4f4f4",
        backgroundHeader: "#194b96",
      },
    },
  },
  plugins: [],
};
export default config;
