// import _ from 'lodash';
import objToStr from '../objToStr.js';

const modifyKeyByState = (state, key) => {
  switch (state) {
    case 'added':
      return `+ ${key}`;
    case 'unchanged':
      return `  ${key}`;
    case 'removed':
      return `- ${key}`;
    default:
      throw new Error(`Unknown state: ${state}`);
  }
};

/* const modifyValue = (value) => {
  if (_.isObject(value) && !Array.isArray(value)) {
    const keys = Object.keys(value);
    const result = {};

    keys.forEach((key) => {
      if (_.isObject(value[key]) && !Array.isArray(value[key])) {
        return {
          key: `  ${key}`,
          value: modifyValue(value[key]),
        };
      }

      return {
        key: `  ${key}`,
        value: value[key],
      };
    });

    return result;
  }

  return value;
}; */

const getStylishDiff = (diff) => {
  const stylishDiff = diff.map((diffElement) => {
    if (diffElement.state === 'same-name objects') {
      return {
        key: `  ${diffElement.key}`,
        value: getStylishDiff(diffElement.value),
      };
    }

    if (diffElement.state === 'changed') {
      const [previousValue, presentValue] = diffElement.value;

      return [
        {
          key: `- ${diffElement.key}`,
          value: previousValue,
        },
        {
          key: `+ ${diffElement.key}`,
          value: presentValue,
        },
      ];
    }

    const newKey = modifyKeyByState(diffElement.state, diffElement.key);
    return {
      key: newKey,
      value: diffElement.value,
    };
  });

  // console.log(stylishDiff.flat());
  return stylishDiff.flat();
};

const stylish = (diff) => {
  const stylishDiff = getStylishDiff(diff);
  return objToStr(stylishDiff);
};

export default stylish;
