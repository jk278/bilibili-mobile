import globals from 'globals';
import pluginJs from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    parser: typescriptParser,
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json', // 指定 TypeScript 配置文件
      },
    },
    rules: {
      'no-undef': 'error',
      'no-unused-expressions': 'off',
      'no-useless-escape': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'eqeqeq': 'error',
      'curly': 'error',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-multi-spaces': ['error', { ignoreEOLComments: false }],
      'no-trailing-spaces': ['error', { skipBlankLines: false, ignoreComments: false }],
      // 添加以下格式化规则
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'space-before-function-paren': ['error', 'always'],
      'space-infix-ops': 'error',
      'keyword-spacing': 'error',
      'space-in-parens': ['error', 'never'],
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'block-spacing': 'error',
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'computed-property-spacing': ['error', 'never'],
      'func-call-spacing': ['error', 'never'],
      'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
      'no-whitespace-before-property': 'error',
      'space-before-blocks': 'error',
      'space-unary-ops': 'error',
      'switch-colon-spacing': ['error', { 'after': true, 'before': false }],
      'template-curly-spacing': 'error',
      'arrow-spacing': 'error',
      'generator-star-spacing': ['error', { 'before': true, 'after': true }],
    },
    ignores: ['node_modules/', 'dist/', 'build/', 'coverage/'],
  },
  pluginJs.configs.recommended,
];
