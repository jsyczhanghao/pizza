#!/usr/bin/env node

'use strict';
const path = require('path');
const { program } = require('commander');
const version = require('../package.json').version;

program
  .option('-p, --production', 'use production mode')
  .version(version);
 
program.parse(process.argv);

const root = path.join(process.cwd(), program.args[0] || '');
 
require('..')(root, program.production);