const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    target: 'web',
    entry: {
        app: path.resolve(__dirname, '../src/main.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/../index.html',
            inject: true,
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                removeComments: true,
                removeEmptyAttributes: true,
            },
        }),
        new VueLoaderPlugin(),
    ],
    resolve: {
        modules: ['node_modules', 'app', 'styles'],
        extensions: ['.js', '.vue'],
        alias: {
            'api': path.resolve(__dirname, '../src/api'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'plugins': path.resolve(__dirname, '../src/plugins'),
            'pages': path.resolve(__dirname, '../src/pages'),
            'router': path.resolve(__dirname, '../src/router'),
            'store': path.resolve(__dirname, '../src/store'),
            'styles': path.resolve(__dirname, '../src/styles/scss'),
            'utils': path.resolve(__dirname, '../src/utils'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader'
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico|otf)$/,
                use: 'file-loader?name=assets/[name]-[hash:base64:5].[ext]',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
        ],
    },
};
