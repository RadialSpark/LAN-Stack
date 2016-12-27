const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    'app': path.join(__dirname, '../client/src/main.ts'),
    'vendor': path.join(__dirname, '../client/src/vendor.ts'),
    'polyfills': path.join(__dirname, '../client/src/polyfills.ts'),
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.join(__dirname, '../client/src/'), path.join(__dirname, '../node_modules/')],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.scss$/,
        use: [
          'raw-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      template: 'client/src/index.html'
    })
  ]
};
