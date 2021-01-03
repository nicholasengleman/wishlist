const { merge } = require('webpack-merge');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new ReactRefreshPlugin(),
});
