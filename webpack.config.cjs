const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: './src/app.js',
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
      banner: fs.readFileSync('./src/meta.js', 'utf-8'),
      raw: true
    })
  ],
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  }
}
