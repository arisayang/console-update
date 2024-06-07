const { rules } = require('ocard-eslint');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: [
    'vuetify',
    '@typescript-eslint',
  ],
  rules: {
    ...rules,
    'vuetify/no-deprecated-classes': 'error',
    'vue/no-reserved-component-names': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/valid-v-slot': [
      'error', {
        allowModifiers: true,
      },
    ],
  },
};
