module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // parser para TS
    parserOptions: {
        parserOptions: {
            ecmaVersion: 2021, // ou 'latest'
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    plugins: ['@typescript-eslint', 'prettier', 'import'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'next/core-web-vitals',
    ],
    rules: {
        // ESLint básico
        'no-console': 'warn',
        'no-unused-vars': 'off',

        // TypeScript
        '@typescript-eslint/no-unused-vars': ['warn'],

        // Prettier
        'prettier/prettier': [
            'warn',
            {
                semi: true,
                singleQuote: true,
                trailingComma: 'all',
                printWidth: 100,
                tabWidth: 2,
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {},
        },
    },
};
