'use strict';
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      }
    ]
  },
  output: {
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
