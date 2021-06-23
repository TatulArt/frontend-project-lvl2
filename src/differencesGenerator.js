import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const compareObjects = (obj1, obj2) => {
  const result = [];
  result.push('{');

  const keysOfObj1 = Object.keys(obj1);
  _.sortBy(keysOfObj1).forEach((key) => {
    if (!_.hasIn(obj2, key)) {
      result.push(`  - ${key}: ${obj1[key]}`);
    }

    if (obj2[key] === obj1[key]) {
      result.push(`    ${key}: ${obj1[key]}`);
    }
  });

  const keysOfObj2 = Object.keys(obj2);
  _.sortBy(keysOfObj2).forEach((key) => {
    if (!_.hasIn(obj1, key)) {
      result.push(`  + ${key}: ${obj2[key]}`);
    } else if (obj2[key] !== obj1[key]) {
      result.push(`  - ${key}: ${obj1[key]}`);
      result.push(`  + ${key}: ${obj2[key]}`);
    }
  });

  result.push('}');
  return result.join('\n');
};

const genDiff = (filepath1, filepath2) => {
  if (filepath1 === '' || filepath2 === '') {
    return '{}';
  }

  try {
    readFileSync(path.resolve(process.cwd(), filepath1));
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log(`Error! File "${process.cwd()}/${filepath1}" not found.`);
    }
    return '';
  }

  try {
    readFileSync(path.resolve(process.cwd(), filepath2));
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('Error!');
      console.log(`Error! File "${process.cwd()}/${filepath2}" not found.`);
    }
    return '';
  }

  const obj1 = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8'));
  const obj2 = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8'));
  const result = compareObjects(obj1, obj2);
  return result;
};

export default genDiff;
