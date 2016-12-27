const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const path = require('path');
console.log(__dirname);
module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.join(__dirname, '../client/dist/'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
