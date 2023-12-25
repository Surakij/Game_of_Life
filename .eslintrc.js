module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb-base",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "import/prefer-default-export": "off",
    "jest/valid-title": "off",
    "no-console": "off",
    "no-alert": "off",
    "no-restricted-globals": "off",
    "no-plusplus": "off",
    "max-len": ["error", { ignoreComments: true }],
    "func-names": ["error", "never"],
    "no-unused-expressions": "off",
    "no-unused-vars": [
      "error",
      { args: "none", ignoreRestSiblings: true, varsIgnorePattern: "^off$" },
    ],
    "import/no-unresolved": "off", // https://github.com/typescript-eslint/typescript-eslint/issues/1624
    "import/extensions": "off", // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    "dot-notation": "off",
  },
};
