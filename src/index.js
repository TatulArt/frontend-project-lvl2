import * as fs from 'fs/promises';
import hasIn from 'lodash/hasIn.js';

const genDiff = async (filepath1, filepath2) => {
  const promise1 = fs.readFile(filepath1, 'utf-8');
  const promise2 = fs.readFile(filepath2, 'utf-8');
  const [data1, data2] = await Promise.all([promise1, promise2]);

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  const result = {};

  const keysOfObj1 = Object.keys(obj1);

  keysOfObj1.forEach((key) => {
    switch (hasIn(obj2, key)) {
      case false:
        result[`- ${key}`] = obj1[key];
        break;
      case true:
        if (obj2[key] === obj1[key]) {
          result[`  ${key}`] = obj1[key];
        } else {
          result[`- ${key}`] = obj1[key];
          result[`+ ${key}`] = obj2[key];
        }
        break;
      default:
        break;
    }
  });

  return result;
};

export default genDiff;
