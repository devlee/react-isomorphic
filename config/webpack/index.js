const path = require('path');

const webpack = require('webpack');

const ip = require('ip');

const postcssImport = require('postcss-import');

const postcssNested = require('postcss-nested');

const postcssCssNext = require('postcss-cssnext');

const extractTextWebpackPlugin = require('extract-text-webpack-plugin');

const config = require('../../config');

const rootFolder = path.resolve(__dirname, '../..');

const env = process.env.NODE_ENV || 'development';

const assetConfig = config.asset;

const assetConfigPort = assetConfig[env].port;

const assetPath = `//${ip.address()}:${assetConfigPort}/asset/`;

const webpackConfig = {
  context: rootFolder,
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json'
    ]
  },
  entry: {
    common: [
      'normalize.css',
      './src/client/css/font-icons/style.css',
      './src/client/css/common.pcss'
    ],
    app: [
      './src/client/index.jsx'
    ]
  },
  output: {
    publicPath: assetPath,
    path: path.resolve(rootFolder, './dist/client'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: extractTextWebpackPlugin.extract(
          'style',
          'css?-autoprefixer'
        )
      },
      {
        test: /\.pcss$/,
        loader: extractTextWebpackPlugin.extract(
          'isomorphic-style',
          'css?modules&localIdentName=[hash:base64:5]&-autoprefixer&importLoaders=1!postcss'
        )
      },
      {
        test: /\.(jpg|jpeg)$/i,
        loader: 'file'
      },
      {
        test: /\.(ico|gif|png|woff|woff2|eot|ttf|svg)$/i,
        loader: 'url'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    /* eslint-disable new-cap */
    new extractTextWebpackPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: assetConfigPort
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter'
  },
  regular_expressions: {
    javascript: /\.(js|jsx)$/,
    styles: /\.(css|pcss)$/
  },
  postcss: () => {
    return [
      postcssImport(),
      postcssCssNext({ browsers: ['> 0%'] }),
      postcssNested()
    ];
  }
};

module.exports = webpackConfig;
