const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const baseConfig = require('./base')('dev');
const {ENTRY_PATH, OUTPUT_PATH, ROOT} = require('../paths');
const TITLE = require('../title');
const BUNDLE_NAME = 'web-magic-lab';

// console.log(`
// ======== base config ======
// ${JSON.stringify(baseConfig, 4)}
// ===========================
// `);
const output = {
    path: OUTPUT_PATH,
    filename: `${BUNDLE_NAME}.js`,
    publicPath: '/'
};

const performance = {
    hints: false
};
const devtool = false;
const plugins = [
    new WebpackBar(),
    new HtmlWebpackPlugin({
        title: TITLE,
        filename: 'index.html',
        template: path.resolve(ENTRY_PATH, './template.ejs'),
        chunks: [BUNDLE_NAME]
    }),
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.resolve(ROOT, 'dist')]
    }),
    new webpack.SourceMapDevToolPlugin({
        filename: '[name].map',
        columns: false
    })
];
const devServer = {
    compress: true,
    host: '0.0.0.0',
    port: 1234,
    hot: true,
    hotOnly: true,
    writeToDisk: true
};
const CONFIG = {
    output,
    devtool,
    plugins,
    performance,
    devServer
};

module.exports = merge(baseConfig, CONFIG);