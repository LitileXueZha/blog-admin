const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                    [
                        'babel-plugin-import',
                        {
                            libraryName: '@material/core',
                            libraryDirectory: 'esm',
                            camel2DashComponentName: false,
                        },
                        'core',
                    ],
                    [
                        '@babel/plugin-transform-runtime',
                        {
                            regenerator: true,
                        },
                    ],
                    '@babel/plugin-proposal-class-properties',
                    '@babel/plugin-syntax-dynamic-import',
                ],
            },
        },
    }, {
        test: /\.(le|c)ss$/,
        use: [
            IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
            {
                loader: 'css-loader',
                options: { importLoaders: 1 },
            }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: [autoprefixer()],
                },
            },
            'less-loader',
        ],
    }, {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: {
            loader: 'file-loader',
            options: {
                outputPath: 'images/',
                publicPath: '/admin/images/',
                name: '[name].[ext]',
            },
        },
    }, {
        test: /\.(md|txt)$/,
        exclude: /node_modules/,
        use: 'raw-loader',
    },
];
