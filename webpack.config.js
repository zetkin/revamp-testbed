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
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/i, /* /\.scss$/ */
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      mimetype: 'image/png',
                    },
                  },
                ],
            },
            {
                test: /\.svg$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      encoding: false,
                    },
                  },
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
