const { WebpackCordovaBundlePlugin } = require("webpack-cordova-bundle-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const webpack = require('webpack');
var path = require('path');

module.exports = {
  optimization: {
    minimizer: [new UglifyJsPlugin({
      test: /\.js(\?.*)?$/i,
      cache: true,
      parallel: true,
      uglifyOptions: {
          output: {
            comments: false,
          },
        },
    })],
  },
  mode: 'development',
  entry: ['cordova/init','./src/index.js',],
  plugins: [
        new MinifyPlugin({}
          , {}),
        new WebpackCordovaBundlePlugin({
            // your platform
            platform: "android",
            // list of plugins to include into bundle
            // you can use something like this to automatically include Object.keys(require("./package.json").cordova.plugins)
            plugins: [
              'cordova-plugin-add-swift-support',
              'cordova-plugin-qrscanner',
              'cordova-plugin-webpack',
              'cordova-plugin-whitelist',
              'cordova-plugin-sapling',
              'cordova-plugin-file',
              'cordova-plugin-file-downloader',
              'cordova-plugin-file-md5',
              'cordova-plugin-file-transfer',
              'cordova-plugin-network-information',
              'cordova-plugin-whitelist',
              'cordova-plugin-zip',
              'cordova-sqlite-storage',
              'cordova-plugin-insomnia',
              'cordova-plugin-screen-orientation',
              'cordova-clipboard',
            ],
        }),
        new webpack.DefinePlugin({
            PLATFORM_VERSION_BUILD_LABEL: JSON.stringify(require("cordova-android/package.json").version), // substitute cordova-ios with your platform package
        }),
    ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(params)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'params',
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 1000000,
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
        "./isChrome$": "cordova-plugin-file/www/browser/isChrome.js",
    }
  },
  output: {
    path: __dirname + '/www',
    publicPath: '/',
    filename: 'bundle.js'
  },
//  plugins: [
//    new webpack.HotModuleReplacementPlugin(),
//  ],
//  devtool: 'inline-source-map',
  devServer: {
    contentBase: './www',
    historyApiFallback: {disableDotRule: true},
    hot: true,
    port: 3210,
  }
};
