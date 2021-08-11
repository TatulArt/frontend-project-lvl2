import { readFileSync } from 'fs';
import path from 'path';
import parse from './parser.js';
import formatters from './formatters/index.js';
import getDifferences from './getDifferences.js';

const parseData = (filepath) => {
  const data = readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
  const format = filepath.split('.').pop();

  return parse(data, format);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  if (filepath1 === '' || filepath2 === '') {
    throw new Error('Error! Filepath is not readable.');
  }

  const parsedData1 = parseData(filepath1);
  const parsedData2 = parseData(filepath2);

  const diff = getDifferences(parsedData1, parsedData2);

  const selectedFormater = formatters[format];
  return selectedFormater(diff);
};

export default genDiff;
