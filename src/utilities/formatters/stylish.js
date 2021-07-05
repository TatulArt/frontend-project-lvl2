import _ from 'lodash';
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

const modifyValue = (value) => {
  if (_.isObject(value) && !Array.isArray(value)) {
    const keys = Object.keys(value);
    const result = {};

    keys.forEach((key) => {
      if (_.isObject(value[key]) && !Array.isArray(value[key])) {
        result[`  ${key}`] = modifyValue(value[key]);
        return;
      }

      result[`  ${key}`] = value[key];
    });

    return result;
  }

  return value;
};

const getStylishDiff = (diff) => {
  const stylishDiff = {};
  const keys = Object.keys(diff);

  keys.forEach((key) => {
    if (diff[key].state === 'same-name objects') {
      stylishDiff[`  ${key}`] = getStylishDiff(diff[key].value);
      return;
    }

    if (diff[key].state === 'changed') {
      const [previousValue, presentValue] = diff[key].value;

      stylishDiff[`- ${key}`] = modifyValue(previousValue);
      stylishDiff[`+ ${key}`] = modifyValue(presentValue);
      return;
    }

    const newKey = modifyKeyByState(diff[key].state, key);
    stylishDiff[newKey] = modifyValue(diff[key].value);
  });

  return stylishDiff;
};

const stylish = (diff) => {
  const stylishDiff = getStylishDiff(diff);
  return objToStr(stylishDiff);
};

export default stylish;
