import _ from 'lodash';
import objToStr from '../objToStr.js';
import { addElementsToObject } from '../mutationLessUtilities.js';

const modifyKeyByState = (state, key) => {
  switch (state) {
    case 'added':
      return `+ ${key}`;
    case 'sameNameObjects':
      return `  ${key}`;
    case 'unchanged':
      return `  ${key}`;
    case 'removed':
      return `- ${key}`;
    default:
      throw new Error(`Unknown state: ${state}`);
  }
};

const getStylishDiff = (data) => {
  if (!_.isArray(data)) {
    return data;
  }

  return data.reduce((acc, dataElement) => {
    if (dataElement.state === 'changed') {
      const [previousValue, presentValue] = dataElement.value;
      return addElementsToObject(acc, `- ${dataElement.key}`, getStylishDiff(previousValue), `+ ${dataElement.key}`, getStylishDiff(presentValue));
    }

    const newKey = modifyKeyByState(dataElement.state, dataElement.key);
    return addElementsToObject(acc, newKey, getStylishDiff(dataElement.value));
  }, {});
};

const stylish = (diff) => {
  const stylishDiff = getStylishDiff(diff);
  return objToStr(stylishDiff);
};

export default stylish;
