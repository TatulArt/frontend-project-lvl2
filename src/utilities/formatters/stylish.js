import _ from 'lodash';
import objToStr from '../objToStr.js';

const modifyKeyByState = (state, key) => {
  switch (state) {
    case 'added':
      return `+ ${key}`;
    case 'sameNameObjects':
      return `  ${key}`;
    case 'unchanged':
      return `  ${key}`;
    case 'unchangedObject':
      return `  ${key}`;
    case 'removed':
      return `- ${key}`;
    default:
      throw new Error(`Unknown state: ${state}`);
  }
};

const getStylishDiff = (diff) => {
  if (_.isArray(diff)) {
    const stylishDiff = diff.map((diffElement) => {
      if (diffElement.state === 'changed') {
        const [previousValue, presentValue] = diffElement.value;

        return [
          [`- ${diffElement.key}`, getStylishDiff(previousValue)],
          [`+ ${diffElement.key}`, getStylishDiff(presentValue)],
        ];
      }

      const newKey = modifyKeyByState(diffElement.state, diffElement.key);
      return [newKey, getStylishDiff(diffElement.value)];
    });

    console.log(stylishDiff);
    return stylishDiff;
  }

  return diff;
};

const stylish = (diff) => {
  const stylishDiff = getStylishDiff(diff);
  return objToStr(stylishDiff); // поменяй
};

export default stylish;
