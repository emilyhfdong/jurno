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

      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  plugins: [],
}
