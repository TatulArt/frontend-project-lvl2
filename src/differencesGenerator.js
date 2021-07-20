import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import parceData from './utilities/parser.js';
import formatters from './utilities/formatters/index.js';

const differencesGenerator = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const keys = _.union(obj1Keys, obj2Keys);

  const filesDiffrences = _.sortBy(keys).map((key) => {
    if (_.hasIn(obj1, key) && _.hasIn(obj2, key) && obj1[key] !== obj2[key]) {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return {
          key,
          value: differencesGenerator(obj1[key], obj2[key]),
          state: 'same-name objects',
        };
      }

      return {
        key,
        value: [obj1[key], obj2[key]],
        state: 'changed',
      };
    }

    if (obj2[key] === obj1[key]) {
      return {
        key,
        value: obj1[key],
        state: 'unchanged',
      };
    }

    if (!_.hasIn(obj1, key)) {
      return {
        key,
        value: obj2[key],
        state: 'added',
      };
    }

    if (!_.hasIn(obj2, key)) {
      return {
        key,
        value: obj1[key],
        state: 'removed',
      };
    }

    throw new Error('Unknown state');
  });

  return filesDiffrences;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  if (filepath1 === '' || filepath2 === '') {
    return '{}';
  }

  const data1 = readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const extention1 = path.extname(filepath1);
  const obj1 = parceData(data1, extention1);

  const data2 = readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  const extention2 = path.extname(filepath2);
  const obj2 = parceData(data2, extention2);

  const diff = differencesGenerator(obj1, obj2);

  const selectedFormater = formatters[format];
  return selectedFormater(diff);
};

export default genDiff;
