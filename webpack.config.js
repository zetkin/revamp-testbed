const path = require('path');
const webpack = require('webpack');


module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        main: [
            './src/client/main.js',
        ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve('static'),
        publicPath: '/static/'
    },
    plugins: [
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
