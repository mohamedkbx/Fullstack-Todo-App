const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './scripts/app.js',
  module: {
    rules: [
      {
        test: '/\.js$/',
      },
    ],
  },
};
