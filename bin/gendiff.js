#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../index.js';

const commander = new Command();

commander
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')

  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, commander.opts().format));
  });

commander.parse(process.argv);
