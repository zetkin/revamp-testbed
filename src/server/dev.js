const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');


module.exports = app => {
    const wpConfig = {
        mode: process.env.NODE_ENV,
        entry: {
            main: [
                './src/client/main.js',
                'webpack-hot-middleware/client',
            ],
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: 'static',
            publicPath: '/static',
            hot: true,
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
                    test: /\.css$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.scss$/,
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
            new webpack.HotModuleReplacementPlugin(),
        ],
        resolve: {
            extensions: ['.js', '.jsx'],
        },
    };

    const wpCompiler = webpack(wpConfig);
    app.use(webpackDevMiddleware(wpCompiler, {
        index: false,
    }));

    app.use(webpackHotMiddleware(wpCompiler));
};
