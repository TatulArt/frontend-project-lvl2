import { readFileSync } from 'fs';
import path from 'path';
import parceData from './parser.js';
import stylish from './formaters.js';

const formaters = {
  stylish,
};

const genDiff = (filepath1, filepath2, format) => {
  if (filepath1 === '' || filepath2 === '') {
    return '{}';
  }

  const data1 = readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const extention1 = path.extname(filepath1);
  const obj1 = parceData(data1, extention1);

  const data2 = readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  const extention2 = path.extname(filepath2);
  const obj2 = parceData(data2, extention2);

  const selectedFormater = formaters[format];
  return selectedFormater(obj1, obj2);
};

export default genDiff;
