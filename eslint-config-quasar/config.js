function getParserOptions({ typescript = false }) {
  // TODO: deep link no good
  const { appDir, resolve } = require("@quasar/app/lib/app-paths");

  const typescriptParserOptions = {
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#configuration
    // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#eslint
    extraFileExtensions: [".vue"], // Needed to make the parser take into account 'vue' files
    parser: "@typescript-eslint/parser",
    project: resolve.app("./tsconfig.json"),
    tsconfigRootDir: appDir
  };
  const babelParserOptions = { parser: "babel-eslint" };

  return {
    ...(typescript ? typescriptParserOptions : babelParserOptions),
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  };
}

function getExtends({
  typescript = false,
  vuePriority = "essential",
  lintStyle
}) {
  // DO NOT CHANGE CONFIGURATION EXTENSIONS ORDER
  const rulesExtensions = [];

  // base ESLint recommended rules
  rulesExtensions.push("eslint:recommended");

  if (typescript) {
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    rulesExtensions.push(
      // ESLint typescript rules
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended"
    );

    // This can be disabled if linting takes too long
    if (typescript.enableTypeChecking) {
      rulesExtensions.push(
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      );
    }
  }

  // https://eslint.vuejs.org/rules/#priority-a-essential-error-prevention
  // consider using `strongly-recommended` or `recommended` for stricter rules
  rulesExtensions.push(`plugin:vue/${vuePriority}`);

  switch (lintStyle) {
    case "standard":
      rulesExtensions.push("standard");
      break;
    case "airbnb":
      rulesExtensions.push("airbnb-base");
      break;
    case "prettier":
      // https://github.com/prettier/eslint-config-prettier#installation
      // usage with Prettier, provided by 'eslint-config-prettier'.
      rulesExtensions.push("prettier");
      if (typescript) {
        rulesExtensions.push("prettier/@typescript-eslint");
      }
      rulesExtensions.push("prettier/vue");
      break;
  }

  return rulesExtensions;
}

function getPlugins({ typescript = false }) {
  const plugins = [];

  if (typescript) {
    plugins.push("@typescript-eslint");
  }

  // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
  // required to lint *.vue files
  plugins.push("vue");

  return plugins;
}

module.exports = function(options = {}) {
  return {
    // https://eslint.vuejs.org/user-guide/#how-to-use-custom-parser
    // must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
    // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
    parserOptions: getParserOptions(options),
    extends: getExtends(options),
    plugins: getPlugins(options)
  };
};
