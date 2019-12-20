const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// loaders与各页面相关配置
const loaders = require('./loaders');

// 生产环境判断
const IS_PROD = process.env.NODE_ENV === 'production';
// 路径常量
const PATH_DIST = path.join(__dirname, '../dist');

// 导出的配置
module.exports = {
    context: path.resolve(__dirname, '..'),
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: PATH_DIST,
        // conenthash 可在英文最新版看到，移除了 manifest.json
        filename: IS_PROD ? 'js/[name]-[contenthash].js' : 'js/[name].js',
        publicPath: '/',
    },
    module: { rules: loaders },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: IS_PROD ? 'css/[name]-[contenthash].css' : 'css/[name].css',
            chunkFilename: IS_PROD ? 'css/[name]-[contenthash].css' : 'css/[name].css',
        }),
        new CopyWebpackPlugin([
            {
                from: './favicon.ico',
                to: path.join(PATH_DIST, '[name].[ext]'),
            },
        ]),
    ],
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, '../src/assets'),
        },
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'],
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
};
