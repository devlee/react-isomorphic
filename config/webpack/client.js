const webpack = require('webpack');

const webpackConfig = require('../webpack');

delete webpackConfig.externals;

webpackConfig.plugins = webpackConfig.plugins || [];

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true)
    }
  })
);

module.exports = webpackConfig;
