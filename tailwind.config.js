/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Work Sans", "sans-serif"],
      serif: ["DM Serif Text", "serif"],
    },
    colors: {
      black: "#0D0E17",
      white: "#FBF4E8",
      grey: "#9F9C94",
    },
    borderWidth: {
      DEFAULT: "1.5px",
    },
    extend: {},
  },
  plugins: [],
}
