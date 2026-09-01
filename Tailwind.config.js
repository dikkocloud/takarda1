/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        brick: { DEFAULT: "#C6281B", dark: "#9E1F14" },
        clay: "#E2792A",
        gold: "#F0B23A",
        olive: { DEFAULT: "#7C8C2E", dark: "#5E6C1E" },
        cream: "#F7EFDD",
        parchment: "#EFE1C2",
        ink: "#241407",
      },
      fontFamily: {
        display: ["Lora", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mark: ["Caveat", "cursive"],
      },
    },
  },
  plugins: [],
};
