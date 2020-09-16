const merge = require('webpack-merge');
const {resolve} = require('path');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    watch: true,
    mode: 'development',
    watchOptions: {
        ignored: ['node_modules/**']
    },
    output: {
        publicPath: '/',
        filename: '[name].bundle.js',
    },
    plugins: [
        new BundleAnalyzerPlugin({
            'analyzerPort': 9999,
            'openAnalyzer': false
        }),
        new Dotenv({
            path: './.env.dev',
            allowEmptyValues: true,
            defaults: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader', {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: resolve(__dirname, 'postcss.config.js')
                        }
                    }
                }]
            }]
    }
});