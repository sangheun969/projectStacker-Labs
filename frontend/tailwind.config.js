/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "accent-blue": "#1976D2",
      },
      fontFamily: {
        logo: ["logo"],
      },
      maxWidth: {
        128: "32rem",
      },
    },
    screens: {
      mobile: { min: "375px", max: "767px" },
      tablet: { min: "768px", max: "1534px" },
      note: { min: "1535px" },
    },
  },
  plugins: [],
};
