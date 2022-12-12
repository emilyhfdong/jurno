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
        black: "#171717",
        white: "#E8E8E8",
        grey: "#373737",
        red: "#D83A17",
        blue: "blue",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },

      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  safelist: [
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ],
  plugins: [],
}
