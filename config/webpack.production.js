const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: path.join(__dirname, '../client/dist/'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': 'production'
      }
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          htmlLoader: {
            minimize: false // workaround for ng2
          },
        }
      }),
  ]
});
