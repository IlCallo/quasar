const { appDir, resolve } = require("@quasar/app/lib/app-paths");

module.exports = {
  parserOptions: {
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#configuration
    // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#eslint
    extraFileExtensions: [".vue"], // Needed to make the parser take into account 'vue' files
    parser: "@typescript-eslint/parser",
    project: resolve.app("./tsconfig.json"),
    tsconfigRootDir: appDir
  },

  // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
  extends: [
    "plugin:@typescript-eslint/eslint-recommended", // ESLint typescript rules
    "plugin:@typescript-eslint/recommended"
  ],

  plugins: ["@typescript-eslint"],

  rules: {
    quotes: ["warn", "single"],
    "@typescript-eslint/explicit-function-return-type": "off"
  }
};
