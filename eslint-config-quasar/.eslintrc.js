// EXAMPLE USER ESLINT CONFIG
// https://eslint.org/docs/developer-guide/shareable-configs#publishing-a-shareable-config
// How does it work with plugin dependencies in cases like ours where multiple plugins
//  are required depending on the chosen features?

module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  env: {
    browser: true
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    "quasar",
    "quasar/typescript",
    "plugin:@typescript-eslint/recommended-requiring-type-checking", // Could also be imported into a "quasar/typescript-type-checking" config and exposed with that name

    // https://eslint.vuejs.org/rules/#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules
    "plugin:vue/essential", // Could also be imported into a "quasar/vue-essential" config and exposed with that name

    "quasar/style-prettier", // Chose one between "quasar/style-prettier", "quasar/style-standard" or "quasar/style-airbnb"
    "prettier/@typescript-eslint" // Could also be imported into a "quasar/style-prettier-typescript" config and exposed with that name
    // This last one could also be directly added to "quasar/style-prettier", TS rules would be ignored if it's not installed
  ],

  // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
  // Prettier has not been included as plugin to avoid performance impact
  // it should be added as an extension to your IDE

  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true,
    Capacitor: true,
    chrome: true
  },

  // add your custom rules here
  rules: {
    // allow debugger during development only
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
