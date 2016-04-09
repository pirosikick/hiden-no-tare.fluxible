'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: '#eval-source-map',
  context: path.join(__dirname, 'src'),
  entry: {
    client: ['./client']
  },
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
    filename: '[name].bundle.js',
    publicPath: '/scripts/',
    path: path.join(__dirname, '.tmp', 'scripts')
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
