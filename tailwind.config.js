/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        primary: "#534FFB",
        secondary: "#EEEFFF",
        green: "#00FF19",
        red: "#FF0000",
        primaryHighlight: "#8482DC",
        secondaryHighlight: "#545454",
      },
      fontFamily: {
        oxygen: ["Oxygen", "sans-serif"],
      },
    },
  },
  plugins: [],
};
