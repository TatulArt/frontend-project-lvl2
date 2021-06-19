#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const commander = new Command();

commander
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')

  .action((filepath1, filepath2) => {
    (async () => {
      console.log(await genDiff(filepath1, filepath2));
    })();
  });

commander.parse(process.argv);

const options = commander.opts();
if (options.version) console.log('1.0.0');
if (options.format) console.log(`${options.format}`);
