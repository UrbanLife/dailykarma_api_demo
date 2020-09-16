const merge = require('webpack-merge');
const {resolve} = require('path');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: '/',
        filename: '[name]-[hash].js',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            cache: true,
            parallel: true,
            terserOptions: {
                'keep_fnames': true,
            }
        })],
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {loader: 'css-loader'},
                {loader: 'postcss-loader', options: {config: {path: resolve(__dirname, 'postcss.config.js')}}},
                'sass-loader',
            ],
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name]-[hash].css"
        }),
        new Dotenv({
            path: './.env.prod',
            safe: false,
            systemvars: true,
            silent: true
        })
    ],
});