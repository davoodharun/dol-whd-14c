var webpack = require('webpack');
var failPlugin = require('webpack-fail-plugin');
var copyWebpackPlugin = require('copy-webpack-plugin');
var bourbon = require('node-bourbon').includePaths;

module.exports = {
  devtool: 'source-map',
  entry: './src/main.ts',
  output: {
    path: './dist/',
    filename: 'index.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json']
  },
  eslint: {
    failOnWarning: false,
    failOnError: true
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['ng-annotate', 'babel?presets[]=es2015']
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html?-minimize'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style',
          'css',
          'resolve-url',
          'sass?sourceMap&includePaths[]=' + bourbon
        ]
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(config|xml)$/,
        loader: 'file'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    failPlugin,
    new copyWebpackPlugin([{ from: './src/deploy' }])
  ]
};
