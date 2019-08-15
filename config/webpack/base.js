const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {OUTPUT_PATH, ENTRY_PATH, ROOT, PUBLIC_PATH} = require('../paths');

const BUNDLE_NAME = 'web-magic-lab';
const ENV = {
    'dev': 'development',
    'prod': 'production'
};

module.exports = (env) => {
    const mode = ENV[env];
    const entry = {
        [BUNDLE_NAME]: path.resolve(ENTRY_PATH, 'index.ts')
    };
    const context = ENTRY_PATH;
    const target = 'web';
    const module = {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                include: /src/,
                use: ['babel-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'static/img/[name]-[hash:5].[ext]',
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(#.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'static/fonts/[name].[ext]',
                        limit: 8192
                    }
                }]
            }
        ]
    };
    const resolve = {
        modules: [
            path.resolve(ROOT, 'src'),
            path.resolve(ROOT, 'node_modules')
        ],
        extensions: ['.ts', '.tsx', '.js']
    };
    const plugins = [
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.resolve(ROOT, './tsconfig.json')
        })
    ];
    const CONFIG = {
        mode,
        // context,
        entry,
        target,
        module,
        resolve,
        plugins
    };
    return CONFIG;
};