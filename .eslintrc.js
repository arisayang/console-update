module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  parser: 'vue-eslint-parser',
  "extends": [
    "plugin:vue/essential",
    'plugin:@typescript-eslint/recommended',
    "eslint:recommended",
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  plugins: [
    'vuetify',
    '@typescript-eslint',
  ],
  rules: {
    'vuetify/no-deprecated-classes': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-component-names': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],
  },
};
