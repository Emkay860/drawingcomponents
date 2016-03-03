require("webpack");

var config = {
    context: __dirname,
    entry: "index.jsx",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    loaders: [
        {
            test: /\.jsx?$/,    
            loader: 'babel',
            query: {
                presets: ["es2015", "react"]
            }
        }
    ]
}