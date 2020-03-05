module.exports = {
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },

  extends: [
    // Base ESLint recommended rules
    "eslint:recommended"
  ],

  plugins: [
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    "vue"
  ],

  rules: {
    "prefer-promise-reject-errors": "off"
  }
};
