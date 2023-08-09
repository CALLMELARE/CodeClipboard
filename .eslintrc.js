module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: ['plugin:react/recommended', 'airbnb'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier', 'sort-keys-plus'],
    rules: {
        'class-methods-use-this': 'off',
        'consistent-return': 'off',
        'guard-for-in': 'off',
        'implicit-arrow-linebreak': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/order': [
            'error',
            {
                groups: [
                    'builtin', // 内置模块
                    'external', // 外部模块
                    'internal', // 内部模块
                    'parent', // 父级目录的模块
                    'sibling', // 同级目录的模块
                    'index', // 同级目录的 index.js 或 index.ts
                    'object', // 对象解构的模块
                ],
                // 排除内置模块
                'newlines-between': 'always',
                pathGroups: [],
                pathGroupsExcludedImportTypes: ['builtin'], // 强制在 import 语句之间添加空行
            },
        ],
        indent: 'off',
        'linebreak-style': ['off', 'windows'],
        'max-classes-per-file': 'off',
        'max-len': 'off',
        'no-await-in-loop': 'off',
        'no-bitwise': 'off',
        'no-cond-assign': 'off',
        'no-continue': 'off',
        'no-else-return': 'off',
        'no-eval': 'off',
        'no-inner-declarations': 'off',
        'no-nested-ternary': 'off',
        'no-new-func': 'off',
        'no-param-reassign': 'off',
        'no-prototype-builtins': 'off',
        'no-restricted-syntax': 'off',
        'no-return-await': 'off',
        'no-shadow': 'off',
        'no-template-curly-in-string': 'off',
        'no-use-before-define': 'off',
        'no-useless-escape': 'off',
        'object-curly-newline': 'off',
        'operator-linebreak': 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-wrap-multilines': 'off',
        'sort-imports': [
            'error',
            {
                allowSeparatedGroups: true,
                ignoreCase: true,
                ignoreDeclarationSort: true,
                memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
            },
        ],
        'sort-keys-plus/sort-keys': [
            'error',
            'asc',
            {
                overrides: [
                    {
                        order: ['from', 'localField', 'foreignField', 'as'],
                        properties: ['$lookup'],
                    },
                ],
            },
        ],
        'wrap-iife': 'off',
    },
};
