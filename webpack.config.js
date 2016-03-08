var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: path.resolve(__dirname, "app/index.jsx"),
  output: { 
      path: __dirname, 
      filename: 'dist/bundle.js' 
  },
  module: {
      preLoaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'eslint'
            },
      ],
      loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel?cacheDirectory'
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass"
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader?limit=10000',
            }, 
            {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader',
            }
      ]
  },
  eslint: {
        failOnWarning: false,
        failOnError: false
  },
  exclude: path.resolve(__dirname, "node_modules")
};