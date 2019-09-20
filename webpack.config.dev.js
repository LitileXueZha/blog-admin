const path = require('path');

const config = require('./webpack');

module.exports = {
  ...config,
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    stats: 'minimal',
    port: 8002,
    contentBase: path.join(__dirname, 'dist'),
    disableHostCheck: true,
    hot: true,
    compress: true,
  },
};
