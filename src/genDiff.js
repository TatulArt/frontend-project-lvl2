import { readFileSync } from 'fs';
import path from 'path';
import parse from './parser.js';
import getFormater from './formatters/index.js';
import buildTree from './treeBuilder.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).split('.')[1];
const getParsedData = (filepath) => parse(readFileSync(getFullPath(filepath), 'utf-8'), getFormat(filepath));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const parsedData1 = getParsedData(filepath1);
  const parsedData2 = getParsedData(filepath2);

  const diff = buildTree(parsedData1, parsedData2);

  const format = getFormater(formatName);
  return format(diff);
};

export default genDiff;
