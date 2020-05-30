const { WebpackCordovaBundlePlugin } = require("webpack-cordova-bundle-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
var path = require('path');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.(js|jsx)$/,
        terserOptions: {
          mangle: {
             reserved: [
                 'Buffer',
                 'BigInteger',
                 'Point',
                 'ECPubKey',
                 'ECKey',
                 'sha512_asm',
                 'asm',
                 'ECPair',
                 'HDNode'
             ]
           }
         }
      }),
    ],
  },
  mode: 'production',
  entry: ['cordova/init','./src/index.js',],
  plugins: [
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
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
    ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader', 'eslint-loader'],
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
  }
};
