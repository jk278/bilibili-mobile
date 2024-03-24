module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: 'emotion',
  extends: [
    'standard',
    'plugin:emotion/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      templateLiterals: true
    }
  },
  rules: {
  }
}
