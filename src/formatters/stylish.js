import _ from 'lodash';
import objToStr from '../objToStr.js';

const modifyKeyByType = (type, key) => {
  switch (type) {
    case 'added':
      return `+ ${key}`;
    case 'nested':
      return `  ${key}`;
    case 'unchanged':
      return `  ${key}`;
    case 'removed':
      return `- ${key}`;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

const getStylishDiff = (data) => {
  if (!_.isArray(data)) {
    return data;
  }

  return data.reduce((acc, dataElement) => {
    if (dataElement.type === 'changed') {
      const [previousValue, presentValue] = dataElement.value;
      return _.assign(acc, { [`- ${dataElement.key}`]: getStylishDiff(previousValue), [`+ ${dataElement.key}`]: getStylishDiff(presentValue) });
    }

    const newKey = modifyKeyByType(dataElement.type, dataElement.key);
    return _.assign(acc, { [newKey]: getStylishDiff(dataElement.value) });
  }, {});
};

const stylish = (diff) => {
  const stylishDiff = getStylishDiff(diff);
  return objToStr(stylishDiff);
};

export default stylish;
