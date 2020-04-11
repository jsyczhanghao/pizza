'use strict';

const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.env.NODE_ENV != 'development';
const root = path.resolve(process.cwd(), process.argv.pop());

function resolve(dir = '') {
  return path.resolve(root, dir);
}

module.exports = {
  devServer: {
    useLocalIp: true,
    host: '0.0.0.0',
    // disableHostCheck: true,
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: '/index.html'
      }, ]
    },
    hot: true,
    compress: true,
    open: true,
    overlay: true,
    publicPath: '/',
    quiet: false
  },

  mode: process.env.NODE_ENV,
  devtool: isProduction ? '#source-map' : 'cheap-module-eval-source-map',
  context: root,
  output: {
    path: isProduction ? resolve('.dist') : resolve('.debug'),
    publicPath: '',
    ...(isProduction ? {
      filename: 'js/[name].js',
      chunkFilename: 'js/[id].js'
    } : {
      filename: 'js/[name].js'
    }),
    globalObject: 'this',
  },
  entry: {
    backend: path.resolve(__dirname, './lib/mini/background'),
    client: path.resolve(__dirname, './lib/mini/client'),
  },
  resolve: {
    alias: {
      '~': root,
      'pizza': path.resolve(__dirname, '../pizzajs'),
      'app': path.resolve(__dirname, 'example')
    },
  },
  resolveLoader: {
    modules: [
      'node_modules', path.resolve(__dirname, 'loaders')
    ]
  },
  module: {
    rules: [
      {
        test: /\.paml$/,
        use: 'raw-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader!pizza-loader',
        include: [resolve()]
      },
      {
        test: /background\/index\.js$/, // 以.worker.js结尾的文件将被worker-loader加载
        use: { loader: 'worker-loader' }
      }
    ]
  },

  plugins: [
    ...(
      isProduction ? [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"' + process.env.NODE_ENV + '"'
          }
        }),
        // new UglifyJsPlugin({
        //   uglifyOptions: {
        //     compress: {
        //       warnings: false
        //     },
        //     mangle: {
        //       safari10: true
        //     }
        //   },
        //   parallel: true
        // }),
        // new OptimizeCSSPlugin({
        //   cssProcessorOptions: {
        //     safe: true,
        //     map: {
        //       inline: false
        //     }
        //   }
        // }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'vendor',
        //   minChunks: function (module, count) {
        //     return (
        //       module.resource &&
        //       /\.js$/.test(module.resource) &&
        //       module.resource.indexOf(path.join(context, './node_modules')) === 0
        //     );
        //   }
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'v~',
        //   minChunks: function (module, count) {
        //     return (
        //       module.resource &&
        //       /vue\.js|vuex|vue-/.test(module.resource) &&
        //       module.resource.indexOf(path.join(context, './node_modules')) === 0
        //     )
        //   }
        // }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'manifest',
        //   minChunks: Infinity
        // }),
        // This instance extracts shared chunks from code splitted chunks and bundles them
        // in a separate chunk, similar to the vendor chunk
        // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
        // new webpack.optimize.CommonsChunkPlugin({
        //   async: 'children-async',
        //   children: true,
        //   minChunks: 2
        // })
      ] : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin()
      ]
    )
  ]
}