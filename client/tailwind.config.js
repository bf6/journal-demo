module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    minHeight: {
      96: "24rem",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
