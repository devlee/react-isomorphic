const webpack = require('webpack');

const OfflinePlugin = require('offline-plugin');

const webpackConfig = require('../webpack');

const pwa = Boolean(process.env.PWA);

delete webpackConfig.externals;

webpackConfig.plugins = webpackConfig.plugins || [];

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      CLIENT: JSON.stringify(true)
    }
  })
);

if (pwa) {
  webpackConfig.plugins.push(
    new OfflinePlugin()
  );
}

module.exports = webpackConfig;
