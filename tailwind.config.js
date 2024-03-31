/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        cubic: "cubic-bezier(1, 0, 0, 1)",
      },
      fontFamily: {
        montserrat: ["'Montserrat'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
