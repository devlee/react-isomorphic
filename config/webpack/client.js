const path = require('path');

const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const OfflinePlugin = require('offline-plugin');

const webpackConfig = require('../webpack');

const rootFolder = path.resolve(__dirname, '../..');

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
  webpackConfig.plugins.unshift(
    new CopyWebpackPlugin([{
      from: path.resolve(rootFolder, './static'),
      to: path.resolve(rootFolder, './build')
    }])
  );
  webpackConfig.plugins.push(
    new OfflinePlugin({
      ServiceWorker: {
        navigateFallbackURL: '/'
      }
    })
  );
}

module.exports = webpackConfig;
