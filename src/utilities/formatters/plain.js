import _ from 'lodash';
import getPathToKey from '../getPathToKey.js';

const plain = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const result = [];

  const keys = _.union(obj1Keys, obj2Keys);
  _.sortBy(keys).forEach((key) => {
    const value1 = typeof obj1[key] === 'object' && obj1[key] !== null ? '[complex value]' : `'${obj1[key]}'`;
    const value2 = typeof obj2[key] === 'object' && obj2[key] !== null ? '[complex value]' : `'${obj2[key]}'`;

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (JSON.stringify(obj1[key]) === JSON.stringify(obj2[key])) {
        return;
      }
      result.push(plain(obj1[key], obj2[key]));
      return;
    }

    if (!_.hasIn(obj2, key)) {
      result.push(`Property '${getPathToKey(obj1, key)}' was removed`);
      return;
    }

    if (!_.hasIn(obj1, key)) {
      result.push(`Property '${getPathToKey(obj2, key)}' was added with value: ${value2}`);
      return;
    }

    if (obj1[key] !== obj2[key]) {
      result.push(`Property '${getPathToKey(obj1, key)}' was updated. From ${value1} to ${value2}`);
    }
  });

  return result.flat().join('\n');
};

export default plain;
