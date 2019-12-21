const path = require('path');
const ReactErrorOverlay = require('error-overlay-webpack-plugin');

const config = require('./webpack');

// 添加错误显示
config.plugins.push(new ReactErrorOverlay());

module.exports = {
    ...config,
    mode: 'development',
    // 配合 react-error-overlay 不能使用 eval
    devtool: 'cheap-module-source-map',
    devServer: {
        stats: 'minimal',
        port: 8002,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        hot: true,
        compress: true,
        // 请注意，访问 `/admin` 将找不到文件，必须要加上斜杠
        // 你可以访问 `/webpack-dev-server` 查看更多
        publicPath: '/admin/',
    },
};
