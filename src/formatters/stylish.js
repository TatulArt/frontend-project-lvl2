import _ from 'lodash';

const stringifyValue = (value, depthLevel) => {
  if (_.isArray(value)) {
    return `[${value.join(', ')}]`;
  }

  if (_.isObject(value)) {
    const keys = Object.keys(value);

    const resultValue = keys.map((key) => {
      if (_.isObject(value[key]) && !Array.isArray(value[key])) {
        return `${'  '.repeat(depthLevel)}  ${key}: ${stringifyValue(value[key], depthLevel + 2)}`;
      }

      return `${'  '.repeat(depthLevel)}  ${key}: ${value[key]}`;
    }).join('\n');

    return ['{', resultValue, `${'  '.repeat(depthLevel - 1)}}`].join('\n');
  }

  return String(value);
};

const renderStylish = (tree, depthLevel = 1) => {
  const resultPrototype = tree.map((treeElement) => {
    switch (treeElement.type) {
      case 'nested':
        return `${'  '.repeat(depthLevel)}  ${treeElement.key}: ${renderStylish(treeElement.children, depthLevel + 2)}`;
      case 'changed':
        return `${'  '.repeat(depthLevel)}- ${treeElement.key}: ${stringifyValue(treeElement.value[0], depthLevel + 2)}\n${'  '.repeat(depthLevel)}+ ${treeElement.key}: ${stringifyValue(treeElement.value[1], depthLevel + 2)}`;
      case 'added':
        return `${'  '.repeat(depthLevel)}+ ${treeElement.key}: ${stringifyValue(treeElement.value, depthLevel + 2)}`;
      case 'unchanged':
        return `${'  '.repeat(depthLevel)}  ${treeElement.key}: ${stringifyValue(treeElement.value, depthLevel + 2)}`;
      case 'removed':
        return `${'  '.repeat(depthLevel)}- ${treeElement.key}: ${stringifyValue(treeElement.value, depthLevel + 2)}`;
      default:
        throw new Error(`Unknown type: ${treeElement.type}`);
    }
  }).join('\n');

  const result = ['{', resultPrototype, `${'  '.repeat(depthLevel - 1)}}`];
  return result.join('\n');
};

export default renderStylish;
