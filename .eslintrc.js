module.exports = {
  root: true,
  parserOptions: { ecmaFeatures: { jsx: true } },
  env: { browser: true, es6: true },
  extends: [
    'standard',
    'plugin:react/recommended',
  ],
  plugins: [
    'react',
  ],
  settings: { react: { version: 'detect' } },
  rules: {
    'semi': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'no-console': 'warn',
    'space-before-function-paren': [ 'error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'object-curly-newline': [ 'error', { 'multiline': true } ],
    quotes: ['error', 'single'],
  },
};
