module.exports = {
  purge: {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
  },

  darkMode: false, // or 'media' or 'class'

  theme: {
    extend: {},
  },

  variants: {
    extend: {},
  },

  plugins: [
    // https://github.com/tailwindlabs/tailwindcss-aspect-ratio#readme
    aspectRatio,

    // https://github.com/tailwindlabs/tailwindcss-forms#readme
    forms,

    // https://github.com/tailwindlabs/tailwindcss-typography#readme
    typography,
  ],
};
