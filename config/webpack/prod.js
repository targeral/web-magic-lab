const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./base')('prod');
const {OUTPUT_PATH, PUBLIC_PATH} = require('../paths');
const BUNDLE_NAME = 'web-magic-lab';

console.log(`
======== base config ======
${JSON.stringify(baseConfig, 4)}
===========================
`);

const output = {
    path: OUTPUT_PATH,
    filename: `${BUNDLE_NAME}.[chunkhash:5].js`,
    publicPath: PUBLIC_PATH
};

const devtool = 'none';
const performance = {
    hint: false
};
const plugins = [
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash:5].css'
    }),
];
const optimization = {
    removeEmptyChunks: true,
    occurrenceOrder: true,
    sideEffects: true,
    minimizer: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                compress: {
                    warnings: false,
                    /* eslint-disable fecs-camelcase,camelcase */
                    drop_debugger: true,
                    drop_console: true
                    /* eslint-enable fecs-camelcase,camelcase */
                }
            }
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                autoprefixer: {
                    disable: true
                }
            }
        })
    ],
    splitChunks: {
        chunks: 'initial',
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'initial'
            },
            default: false
        }
    },
    runtimeChunk: {
        name: entryPoint => `runtime.${entryPoint.name}`
    }
};
const CONFIG = {
    output,
    devtool,
    performance,
    plugins,
    optimization
};

module.exports = merge(baseConfig, CONFIG);