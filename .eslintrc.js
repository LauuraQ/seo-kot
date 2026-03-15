module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
    ],
    plugins: ['vue'],
    rules: {
        // можно добавить свои правила позже
    },
}