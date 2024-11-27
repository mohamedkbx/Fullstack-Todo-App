const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './scripts/app.js',
  module: {
    rules: [
      {
        test: '/\.js$/',
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
