/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundBody: "#09090A",
      },
      flex: {
        "content-scroll": "0 0 auto",
      },
    },
  },
  plugins: [],
};
