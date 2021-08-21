import _ from 'lodash';

const stringifyValue = (value, depth) => {
  if (_.isArray(value)) {
    return `[${value.join(', ')}]`;
  }

  if (_.isObject(value)) {
    const indent = depth * 4 - 2;

    const keys = Object.keys(value);

    const resultValue = keys.map((key) => {
      if (_.isObject(value[key]) && !Array.isArray(value[key])) {
        return `${' '.repeat(indent)}  ${key}: ${stringifyValue(value[key], depth + 1)}`;
      }

      return `${' '.repeat(indent)}  ${key}: ${value[key]}`;
    }).join('\n');

    return ['{', resultValue, `${' '.repeat(indent - 2)}}`].join('\n');
  }

  return String(value);
};

const renderStylish = (tree, depth = 1) => {
  const indent = depth * 4 - 2;

  const resultPrototype = tree.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${' '.repeat(indent)}  ${node.key}: ${renderStylish(node.children, depth + 1)}`;
      case 'changed':
        return [`${' '.repeat(indent)}- ${node.key}: ${stringifyValue(node.oldValue, depth + 1)}`, `${' '.repeat(indent)}+ ${node.key}: ${stringifyValue(node.newValue, depth + 1)}`].join('\n');
      case 'added':
        return `${' '.repeat(indent)}+ ${node.key}: ${stringifyValue(node.value, depth + 1)}`;
      case 'unchanged':
        return `${' '.repeat(indent)}  ${node.key}: ${stringifyValue(node.value, depth + 1)}`;
      case 'removed':
        return `${' '.repeat(indent)}- ${node.key}: ${stringifyValue(node.value, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  }).join('\n');

  const result = ['{', resultPrototype, `${' '.repeat(indent - 2)}}`];
  return result.join('\n');
};

export default (tree) => renderStylish(tree);
