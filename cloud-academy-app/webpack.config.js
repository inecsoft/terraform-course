const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        app: path.resolve(__dirname, 'client/js/app.js'),
    },
    module: {
        rules: [
            {
                loader: "babel-loader",

                // Omit any files outside of the project's js directory
                include: [
                    path.resolve(__dirname, 'client/js'),
                ],

                // Only load .js files through Babel
                test: /\.js?$/,
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js'),
    },
};