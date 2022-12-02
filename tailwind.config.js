/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["DM Serif Text", "serif"],
      },
      colors: {
        black: "#1D1D1D",
        white: "#E8E8E8",
        grey: "#9F9C94",
        red: "#D83A17",
        blue: "blue",
      },

      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  plugins: [],
}
