const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const { HashedModuleIdsPlugin, IgnorePlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = require('./webpack');

// 修复 vendor、runtime 打包后 contenthash 变化。
// 文档：https://webpack.js.org/guides/caching/
config.plugins.push(new HashedModuleIdsPlugin());

// 打包分析，文件：zzz-analyzer.html
config.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: '../zzz-analyzer.html',
    openAnalyzer: false,
    logLevel: 'error',
}));

// moment.js 打包优化
// 文档：https://momentjs.com/docs/#/use-it/webpack/
config.plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/));

// 生成 .gz 文件。另一种由 google 开发的 br 算法也开始流行，不过需要安装 nginx 模块
// 文档：https://webpack.js.org/plugins/compression-webpack-plugin/

module.exports = {
    ...config,
    mode: 'production',
    stats: {
        children: false,
        modules: false,
        builtAt: false,
        colors: true,
        entrypoints: false,
        chunkOrigins: false,
        timings: true,
    },
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({}),
            new OptimizeCssPlugin({}),
        ],
        // 整合 runtime 到公共模块，可以不用单独打个 runtime.js 增加请求
        runtimeChunk: { name: 'main' },
        splitChunks: {
            minChunks: 2,
            cacheGroups: {
                vendors: {
                    chunks: 'all',
                    // 只提 js 模块到 vendor，样式可以打包到一起
                    test(module) {
                        return module.type === 'javascript/auto' && /[\\/]node_modules[\\/]/.test(module.resource);
                    },
                    minChunks: 1,
                    priority: 1,
                    reuseExistingChunk: true,
                },
                '@material-ui': {
                    name: 'vendors~MaterialUI',
                    test: /[\\/]node_modules[\\/]@material-ui[\\/]/,
                    chunks: 'all',
                    minChunks: 1,
                    priority: 11, // 优先处理
                    reuseExistingChunk: true,
                },
                'ace-builds': {
                    name: 'vendors~ace',
                    test: /[\\/]node_modules[\\/]ace-builds[\\/]/,
                    chunks: 'async',
                    minChunks: 1,
                    priority: 10,
                },
                d3: {
                    name: 'vendors~d3',
                    test: /[\\/]node_modules[\\/]d3(-.+?)?[\\/]/,
                    chunks: 'async',
                    minChunks: 1,
                    priority: 10,
                },
                // mermaid: {
                //     name: 'vendors~MermaidCore',
                //     test: /[\\/]node_modules[\\/]mermaid[\\/]/,
                //     chunks: 'async',
                //     minChunks: 1,
                //     priority: 10,
                // },
            },
        },
    },
};
