'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function lib(dir) {
  return path.join(__dirname, 'lib', dir);
}

module.exports = function (root, isProduction) {
  const projectRoot = path.join(root, 'src');
  const mode = isProduction ? 'production' : 'development';

  return {
    mode: mode,
    devtool: isProduction ? '#source-map' : 'cheap-module-eval-source-map',
    context: projectRoot,
    entry: {
      client: lib('client/index.js'),
      backend: lib('backend/index.js'),
    },
    output: {
      path: path.join(projectRoot, isProduction ? '../dist' : '../.debug'),
      publicPath: '',
      filename: 'js/[name].js',
      libraryTarget: 'this',
    },
    resolve: {
      alias: {
        '~': projectRoot,
        'pizza': 'pizzajs',
        'worker': lib(isProduction ? 'worker/production.js' : 'worker/development.js'),
      },
    },
    resolveLoader: {
      modules: [
        path.join(__dirname, 'node_modules'), path.join(__dirname, 'loaders')
      ]
    },
    module: {
      rules: [{
          test: /\.paml$/,
          loader: 'raw-loader',
        },

        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [require('@babel/preset-env')]
            }
          }
        },

        {
          test: /\.js$/,
          loader: 'script-loader',
          include: [projectRoot]
        },

        {
          test: /\.pass$/,
          loader: 'pass-loader',
          include: [projectRoot]
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"' + mode + '"'
        }
      }),

      new HtmlWebpackPlugin({
        template: lib('client/template.html'),
        chunks: ['client']
      })
    ]
  };
}