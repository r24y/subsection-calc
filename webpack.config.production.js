/* eslint no-var: 0 */
var webpack = require('webpack');
var config = require('./webpack.config');

var newConfig = Object.assign(config, {
  devtool: '#source-map',
  entry: './src/index',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      '__DEVTOOLS__': false,
      'process.env': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    }),
  ],
});

newConfig.module.loaders = newConfig.module.loaders.map(function(loader) {
  var newLoader = {};
  Object.keys(loader).forEach(function(k) {
    var v = loader[k];
    if (k === 'loaders' && v instanceof Array) {
      newLoader[k] = loader[k].filter(function(val) {
        return val !== 'react-hot';
      });
      return newLoader[k];
    }
    newLoader[k] = loader[k];
  });
  return newLoader;
});

module.exports = newConfig;
