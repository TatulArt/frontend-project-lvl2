import { readFileSync } from 'fs';
import path from 'path';
import parse from './parser.js';
import getFormater from './formatters/index.js';
import generateDiffTree from './generateDiffTree.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).split('.')[1];
const getParsedData = (filepath) => parse(readFileSync(getFullPath(filepath), 'utf-8'), getFormat(filepath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const parsedData1 = getParsedData(filepath1);
  const parsedData2 = getParsedData(filepath2);

  const diff = generateDiffTree(parsedData1, parsedData2);

  const selectedFormater = getFormater(format);
  return selectedFormater(diff);
};

export default genDiff;
