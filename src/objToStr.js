import _ from 'lodash';
import addElementsToArray from './addElementsToArray.js';

const objToStr = (obj, depthLevel = 1, parentKey = ' ') => {
  const keys = Object.keys(obj);

  const resultPrototype = keys.reduce((acc, key) => {
    const indent = parentKey === ' ' ? '  '.repeat(depthLevel) : '  '.repeat(depthLevel + 1);

    if (_.isObject(obj[key]) && !Array.isArray(obj[key])) {
      return addElementsToArray(acc, [`${indent}${key}: ${objToStr(obj[key], depthLevel + 2, key[0])}`]);
    }

    return addElementsToArray(acc, [`${indent}${key}: ${obj[key]}`]);
  }, []).join('\n');

  const result = addElementsToArray([], ['{', resultPrototype, `${'  '.repeat(depthLevel - 1)}}`]);
  return result.join('\n');
};

export default objToStr;
