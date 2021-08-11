import _ from 'lodash';
import addElementsToArray from './addElementsToArray.js';

const objToStr = (obj, depthLevel = 1) => {
  const keys = Object.keys(obj);

  const resultPrototype = keys.reduce((acc, key) => {
    if (_.isObject(obj[key]) && !Array.isArray(obj[key])) {
      return addElementsToArray(acc, [`${'  '.repeat(depthLevel)}${key}: ${objToStr(obj[key], depthLevel + 2)}`]);
    }

    return addElementsToArray(acc, [`${'  '.repeat(depthLevel)}${key}: ${obj[key]}`]);
  }, []).join('\n');

  const result = addElementsToArray([], ['{', resultPrototype, `${'  '.repeat(depthLevel - 1)}}`]);
  return result.join('\n');
};

export default objToStr;
