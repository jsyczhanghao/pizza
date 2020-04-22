'use strict';

const webpack = require('webpack');
const Server = require('webpack-dev-server');
const getConfigs = require('./config');

module.exports = function (root, isProductionMode = false) {
  const configs = getConfigs(root, isProductionMode);

  if (!isProductionMode) {
    require('./port').then((port) => {
      new Server(webpack(configs), {
        compress: true,
        open: true,
      }).listen(port, '0.0.0.0', function (err) {
        if (err) {
          console.log(err);
        }
      });

      console.log(`listen at http://localhost:${port}`);
    });
  } else {
    const ora = require('ora');
    const chalk = require('chalk');
    const rm = require('rimraf');
    const spinner = ora('building for production...');

    spinner.start();

    rm(configs.output.path, err => {
      if (err) throw err;
      webpack(configs, (err, stats) => {
        spinner.stop();
        if (err) throw err;
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
          console.log(chalk.red('  Build failed with errors.\n'));
          process.exit(1);
        }

        console.log(chalk.cyan('  Build complete.\n'));
        console.log(chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
          '  Opening index.html over file:// won\'t work.\n'
        ));
      });
    });
  }
};