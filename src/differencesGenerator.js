import * as fs from 'fs/promises';
import _ from 'lodash';

const compareObjects = (obj1, obj2) => {
  const obj1Differences = {};

  const keysOfObj1 = Object.keys(obj1);
  keysOfObj1.sort().forEach((key) => {
    if (!_.hasIn(obj2, key)) {
      obj1Differences[`- ${key}`] = obj1[key];
    }

    if (obj2[key] === obj1[key]) {
      obj1Differences[`  ${key}`] = obj1[key];
    }
  });

  const obj2Differences = {};

  const keysOfObj2 = Object.keys(obj2);
  keysOfObj2.sort().forEach((key) => {
    if (!_.hasIn(obj1, key)) {
      obj2Differences[`+ ${key}`] = obj2[key];
    } else if (obj2[key] !== obj1[key]) {
      obj2Differences[`- ${key}`] = obj1[key];
      obj2Differences[`+ ${key}`] = obj2[key];
    }
  });

  const result = _.assign(obj1Differences, obj2Differences);
  return result;
};

const genDiff = async (filepath1, filepath2) => {
  const promise1 = fs.readFile(filepath1, 'utf-8');
  const promise2 = fs.readFile(filepath2, 'utf-8');
  const [data1, data2] = await Promise.all([promise1, promise2]);

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  const result = compareObjects(obj1, obj2);

  return result;
};

export default genDiff;
