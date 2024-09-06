import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-undef': 'error',
      'no-unused-expressions': 'error',
      'no-useless-escape': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'eqeqeq': 'error',
      'curly': 'error',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-multi-spaces': ['error', { ignoreEOLComments: false }],
      'no-trailing-spaces': ['error', { skipBlankLines: false, ignoreComments: false }]
    },
    ignores: ['node_modules/', 'dist/', 'build/', 'coverage/'],
  },
  pluginJs.configs.recommended,
];
