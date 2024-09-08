import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: 'error',
      // 其它非默认规则（非样式）
    },
  },
  { ignores: ['node_modules/', 'dist/', 'build/', 'coverage/'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
