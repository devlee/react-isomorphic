const UniversalWebpack = require('universal-webpack');

const config = require('./config/webpack');

const settings = require('./config/webpack/setting');

UniversalWebpack.server(config, settings);
