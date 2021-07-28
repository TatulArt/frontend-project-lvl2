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
  if (_.isArray(data)) {
    const stylishDiff = data.reduce((acc, dataElement) => {
      if (dataElement.state === 'changed') {
        const [previousValue, presentValue] = dataElement.value;

        const newAccPrototype = addElementsToObject(acc, `- ${dataElement.key}`, getStylishDiff(previousValue));
        return addElementsToObject(newAccPrototype, `+ ${dataElement.key}`, getStylishDiff(presentValue));
      }

      const newKey = modifyKeyByState(dataElement.state, dataElement.key);
      return addElementsToObject(acc, newKey, getStylishDiff(dataElement.value));
    }, {});

    return stylishDiff;
  }

  return data;
};

const stylish = (diff) => {
  const stylishDiff = getStylishDiff(diff);
  return objToStr(stylishDiff);
};

export default stylish;
