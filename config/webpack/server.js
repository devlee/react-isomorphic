const universalWebpack = require('universal-webpack');

const webpackNodeExternals = require('webpack-node-externals');

const settings = require('./setting');

let webpackConfig = require('../webpack');

delete webpackConfig.externals;

webpackConfig = universalWebpack.serverConfiguration(webpackConfig, settings);

webpackConfig.node = {
  __dirname: true,
  __filename: true
};

webpackConfig.externals = [webpackNodeExternals()];

module.exports = webpackConfig;
