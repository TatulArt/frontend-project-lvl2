import _ from 'lodash';

const objToStr = (obj, depthLevel = 1) => {
  const result = [];
  result.push('{');

  const keys = Object.keys(obj);
  keys.forEach((key) => {
    if (_.isObject(obj[key]) && !Array.isArray(obj[key])) {
      result.push(`${'  '.repeat(depthLevel)}${key}: ${objToStr(obj[key], depthLevel + 2)}`);
    } else {
      result.push(`${'  '.repeat(depthLevel)}${key}: ${obj[key]}`);
    }
  });

  result.push(`${'  '.repeat(depthLevel - 1)}}`);
  return result.join('\n');
};

export default objToStr;
