module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    indent: "off",
    "max-classes-per-file": "off",
    "class-methods-use-this": "off",
    "linebreak-style": ["off", "windows"],
    "implicit-arrow-linebreak": "off",
    "max-len": "off",
    "no-param-reassign": "off",
    "no-await-in-loop": "off",
    "no-shadow": "off",
    "no-restricted-syntax": "off",
    "no-return-await": "off",
    "no-inner-declarations": "off",
    "no-template-curly-in-string": "off",
    "no-useless-escape": "off",
    "no-prototype-builtins": "off",
    "no-eval": "off",
    "no-continue": "off",
    "no-use-before-define": "off",
    "no-cond-assign": "off",
    "no-bitwise": "off",
    "no-new-func": "off",
    "no-nested-ternary": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "no-else-return": "off",
    "wrap-iife": "off",
    "consistent-return": "off",
    "guard-for-in": "off",
    "operator-linebreak": "off",
    "object-curly-newline": "off",
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        memberSyntaxSortOrder: ["none", "all", "single", "multiple"],
        allowSeparatedGroups: true,
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin", // 内置模块
          "external", // 外部模块
          "internal", // 内部模块
          "parent", // 父级目录的模块
          "sibling", // 同级目录的模块
          "index", // 同级目录的 index.js 或 index.ts
          "object", // 对象解构的模块
        ],
        pathGroups: [],
        pathGroupsExcludedImportTypes: ["builtin"], // 排除内置模块
        "newlines-between": "always", // 强制在 import 语句之间添加空行
      },
    ],
  },
};
