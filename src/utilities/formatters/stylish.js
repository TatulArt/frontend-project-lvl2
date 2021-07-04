import objToStr from '../objToStr.js';

const getStylishDiff = (diff) => {
  const stylishDiff = {};
  const keys = Object.keys(diff);

  keys.forEach((key) => {
    if (diff[key].state === 'same-name objects') {
      stylishDiff[`  ${key}`] = getStylishDiff(diff[key].value);
      return;
    }

    if (diff[key].state === 'without changes') {
      stylishDiff[`  ${key}`] = diff[key].value;
      return;
    }

    if (diff[key].state === 'added') {
      stylishDiff[`+ ${key}`] = diff[key].value;
      return;
    }

    if (diff[key].state === 'removed') {
      stylishDiff[`- ${key}`] = diff[key].value;
      return;
    }

    if (diff[key].state === 'changed') {
      const [previousValue, presentValue] = diff[key].value;

      stylishDiff[`- ${key}`] = previousValue;
      stylishDiff[`+ ${key}`] = presentValue;
    }
  });

  return stylishDiff;
};

const stylish = (diff) => {
  const stylishDiff = getStylishDiff(diff);
  return objToStr(stylishDiff);
};

export default stylish;
