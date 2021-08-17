import _ from 'lodash';

const stringifyValue = (value, depthLevel) => {
  if (_.isObject(value) && !_.isArray(value)) {
    const keys = Object.keys(value);

    const resultValue = keys.map((key) => {
      if (_.isObject(value[key]) && !Array.isArray(value[key])) {
        return `${'  '.repeat(depthLevel)}  ${key}: ${stringifyValue(value[key], depthLevel + 2)}`;
      }

      return `${'  '.repeat(depthLevel)}  ${key}: ${value[key]}`;
    }).join('\n');

    return ['{', resultValue, `${'  '.repeat(depthLevel - 1)}}`].join('\n');
  }

  return value;
};

const generateStylishDiff = (diff, depthLevel = 1) => {
  const resultPrototype = diff.map((diffElement) => {
    switch (diffElement.type) {
      case 'nested':
        return `${'  '.repeat(depthLevel)}  ${diffElement.key}: ${generateStylishDiff(diffElement.children, depthLevel + 2)}`;
      case 'changed':
        return `${'  '.repeat(depthLevel)}- ${diffElement.key}: ${stringifyValue(diffElement.value[0], depthLevel + 2)}\n${'  '.repeat(depthLevel)}+ ${diffElement.key}: ${stringifyValue(diffElement.value[1], depthLevel + 2)}`;
      case 'added':
        return `${'  '.repeat(depthLevel)}+ ${diffElement.key}: ${stringifyValue(diffElement.value, depthLevel + 2)}`;
      case 'unchanged':
        return `${'  '.repeat(depthLevel)}  ${diffElement.key}: ${stringifyValue(diffElement.value, depthLevel + 2)}`;
      case 'removed':
        return `${'  '.repeat(depthLevel)}- ${diffElement.key}: ${stringifyValue(diffElement.value, depthLevel + 2)}`;
      default:
        throw new Error(`Unknown type: ${diffElement.type}`);
    }
  }).join('\n');

  const result = ['{', resultPrototype, `${'  '.repeat(depthLevel - 1)}}`];
  return result.join('\n');
};

export default generateStylishDiff;
