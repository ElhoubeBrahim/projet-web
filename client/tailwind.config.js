/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#E1C5AC",
        secondary: "#7A5C3C",
        text: "#444444",
        success: "#00B87C",
        danger: "#E74C3C",
        placeholder: "#888888",
        "primary-light": "#E1C5AC30",
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
