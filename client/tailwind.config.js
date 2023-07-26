/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      fontWeight: {
        light: 300,
        regular: 400,
        bold: 700,
        black: 900,
      },
      colors: {
        primary: "#F5385D",
      },
    },
  },
  plugins: [],
};
