
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          navy: "#101827",
          blue: "#2563EB",
          light: "#EFF6FF",
          accent: "#38BDF8",
          dark: "#0B1120",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        premium: "0 20px 60px rgba(15, 23, 42, 0.10)",
      },
    },
  },
  plugins: [],
};

