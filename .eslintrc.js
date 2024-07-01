const { rules } = require('ocard-eslint');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-airbnb',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vuetify/base',
    'plugin:import/typescript',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  plugins: [
    'vue',
    'vuetify',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
  rules: {
    ...rules,
    'vuetify/no-deprecated-classes': 'error',
    'vue/no-reserved-component-names': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 0,
    'vue/valid-v-slot': [
      'error', {
        allowModifiers: true,
      },
    ],
    'import/extensions': [
      'error', 'ignorePackages', {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
      },
    ],
  },
};
