const path = require('path')

module.exports = {
  mode: 'production',
  entry: './bilibili-mobile/app.js',
  output: {
    filename: 'bilibili-mobile.js',
    path: path.resolve(__dirname, 'dist')
  }
}
