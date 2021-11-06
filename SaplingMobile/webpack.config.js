const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
var path = require('path');

const options = {
    extensions: [`js`, `jsx`]
}

module.exports = {
  optimization: {
    minimize: false,
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
  entry: ['./src/index.js',],
  plugins: [
        new NodePolyfillPlugin(),
        new ESLintPlugin(options),
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
        use: ['babel-loader'],
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
