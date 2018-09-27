'use strict';

const path = require('path');

module.exports = {
    entry: './src/reactRouterRoutingHelpers.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './'),
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        plugins: ['transform-object-rest-spread']
                    }
                }
            }
        ]
    }
};