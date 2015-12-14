/**
 * Created by knowthis on 15/12/14.
 */
module.exports = {
    entry: "./js/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};