var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: path.resolve(__dirname, "app/index.jsx"),
  output: { 
      path: __dirname, 
      filename: 'dist/bundle.js' 
  },
  module: {
      loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel?cacheDirectory'
            }
      ]
  },
  exclude: path.resolve(__dirname, "node_modules")
};