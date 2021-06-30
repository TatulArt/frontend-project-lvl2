import _ from 'lodash';
import getPathToKey from '../getPathToKey.js';

const plain = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const result = [];

  const keys = _.union(obj1Keys, obj2Keys);
  _.sortBy(keys).forEach((key) => {
    if (!_.hasIn(obj2, key)) {
      result.push(`Property ${getPathToKey(obj1[key])} was removed`);
    }
    
    /* if (_.hasIn(obj1, key) && _.hasIn(obj2, key) && typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      
    }

    if (!_.hasIn(obj2, key)) {
      result.push(`Property ${getPathToKey(obj1[key])} was removed`);
    }

    if (obj2[key] === obj1[key]) {
      
    }

    if (!_.hasIn(obj1, key)) {
      
    }

    if (obj2[key] !== obj1[key] && typeof obj2[key] !== 'object') {
      
    }

    if (obj2[key] !== obj1[key] && typeof obj1[key] !== 'object' && typeof obj2[key] !== 'object') {
      
    } */
  });

  return result;
};

export default plain;
