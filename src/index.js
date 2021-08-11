import { readFileSync } from 'fs';
import path from 'path';
import parse from './parser.js';
import formatters from './formatters/index.js';
import getDifferences from './getDifferences.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => filepath.split('.')[1];

const getParsedData = (filepath) => {
  const data = readFileSync(getFullPath(filepath), 'utf-8');
  const format = getFormat(filepath);

  return parse(data, format);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const parsedData1 = getParsedData(filepath1);
  const parsedData2 = getParsedData(filepath2);

  const diff = getDifferences(parsedData1, parsedData2);

  const selectedFormater = formatters[format];
  return selectedFormater(diff);
};

export default genDiff;
