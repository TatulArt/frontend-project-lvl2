import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import parceData from './parsers.js';
import objToStr from './objToStr.js';

const compareObjects = (obj1, obj2) => {
  const result = {};

  const obj1Keys = Object.keys(obj1);
  _.sortBy(obj1Keys).forEach((key) => {
    if (_.hasIn(obj1, key) && _.hasIn(obj2, key) && typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      result[`  ${key}`] = compareObjects(obj1[key], obj2[key]);
      return;
    }

    if (!_.hasIn(obj2, key)) {
      result[`- ${key}`] = obj1[key];
    }

    if (obj2[key] === obj1[key]) {
      result[`  ${key}`] = obj1[key];
    }
  });

  const obj2Keys = Object.keys(obj2);
  _.sortBy(obj2Keys).forEach((key) => {
    if (!_.hasIn(obj1, key)) {
      result[`+ ${key}`] = obj2[key];
      return;
    }

    if (obj2[key] !== obj1[key] && typeof obj2[key] !== 'object') {
      result[`- ${key}`] = obj1[key];
      result[`+ ${key}`] = obj2[key];
      return;
    }

    if (obj2[key] !== obj1[key] && typeof obj1[key] !== 'object' && typeof obj2[key] !== 'object') {
      result[`- ${key}`] = obj1[key];
      result[`+ ${key}`] = obj2[key];
    }
  });

  return result;
};

const genDiff = (filepath1, filepath2) => {
  if (filepath1 === '' || filepath2 === '') {
    return '{}';
  }

  const data1 = readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const extention1 = path.extname(filepath1);
  const obj1 = parceData(data1, extention1);

  const data2 = readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  const extention2 = path.extname(filepath2);
  const obj2 = parceData(data2, extention2);

  const result = compareObjects(obj1, obj2);
  return objToStr(result, 1);
};

export default genDiff;
