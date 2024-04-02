const path = require('path')
const webpack = require('webpack')
const fs = require('fs')

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
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: fs.readFileSync('./bilibili-mobile/meta.js', 'utf-8'),
      raw: true
    })
  ]
}
