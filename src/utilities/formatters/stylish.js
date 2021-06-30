import _ from 'lodash';
import objToStr from '../objToStr.js';

const stylish = (obj1, obj2) => {
  const result = {};

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const keys = _.union(obj1Keys, obj2Keys);

  _.sortBy(keys).forEach((key) => {
    if (_.hasIn(obj1, key) && _.hasIn(obj2, key) && typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      result[`  ${key}`] = stylish(obj1[key], obj2[key]);
      return;
    }

    if (!_.hasIn(obj2, key)) {
      result[`- ${key}`] = obj1[key];
      return;
    }

    if (obj2[key] === obj1[key]) {
      result[`  ${key}`] = obj1[key];
    }

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

  return objToStr(result, 1);
};

export default stylish;
