const path = require('path')

module.exports = {
  mode: 'none',
  entry: './bilibili-mobile/app.js',
  output: {
    filename: 'bilibili-mobile.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
