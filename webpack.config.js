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
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass"
            },
            {
                test: /.(png|jp(e)?g|gif)$/,
                loader: 'url?limit=10000',
            }, ,
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },
    exclude: path.resolve(__dirname, "node_modules")
};