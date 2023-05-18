/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#DDD0C8",
        secondary: "#7A5C3C",
        text: "#003044",
        success: "#00B87C",
        danger: "#E74C3C",
      },
      fontFamily: {
        brand: ["'Playfair Display'", "serif"],
        content: ["'Source Serif 4'", "serif"],
        titles: ["'Noto Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
