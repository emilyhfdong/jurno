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
        black: "#0D0E17",
        white: "#E8E8E8",
        grey: "#9F9C94",
        red: "red",
        blue: "blue",
      },

      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  plugins: [],
}
