import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import parceData from './parsers.js';

const compareObjects = (obj1, obj2) => {
  const result = [];
  result.push('{');

  const file1Diffs = [];
  const keysOfObj1 = Object.keys(obj1);
  _.sortBy(keysOfObj1).forEach((key) => {
    if (!_.hasIn(obj2, key)) {
      file1Diffs.push(`  - ${key}: ${obj1[key]}`);
    }

    if (obj2[key] === obj1[key]) {
      file1Diffs.push(`    ${key}: ${obj1[key]}`);
    }
  });

  const file2Diffs = [];
  const keysOfObj2 = Object.keys(obj2);
  _.sortBy(keysOfObj2).forEach((key) => {
    if (!_.hasIn(obj1, key)) {
      file2Diffs.push(`  + ${key}: ${obj2[key]}`);
    } else if (obj2[key] !== obj1[key]) {
      file2Diffs.unshift(`  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`);
    }
  });

  result.push(file1Diffs, file2Diffs);
  result.push('}');

  return result.flat().join('\n');
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
  return result;
};

export default genDiff;
