import objToStr from '../objToStr.js';

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

    let newKey = '';

    switch (diff[key].state) {
      case 'added':
        newKey = `+ ${key}`;
        break;
      case 'without changes':
        newKey = `  ${key}`;
        break;
      case 'removed':
        newKey = `- ${key}`;
        break;
      default:
        break;
    }

    stylishDiff[newKey] = diff[key].value;
  });

  return stylishDiff;
};

const stylish = (diff) => {
  const stylishDiff = getStylishDiff(diff);
  return objToStr(stylishDiff);
};

export default stylish;
