const path = require('path');
module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'client')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
