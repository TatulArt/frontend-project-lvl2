import objToStr from '../objToStr.js';

const modifyKeyByState = (state, key) => {
  switch (state) {
    case 'added':
      return `+ ${key}`;
    case 'without changes':
      return `  ${key}`;
    case 'removed':
      return `- ${key}`;
    default:
      break;
  }

  return key;
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

      stylishDiff[`- ${key}`] = previousValue;
      stylishDiff[`+ ${key}`] = presentValue;
      return;
    }

    const newKey = modifyKeyByState(diff[key].state, key);
    stylishDiff[newKey] = diff[key].value;
  });

  return stylishDiff;
};

const stylish = (diff) => {
  const stylishDiff = getStylishDiff(diff);
  return objToStr(stylishDiff);
};

export default stylish;
