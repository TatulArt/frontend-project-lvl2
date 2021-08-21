import _ from 'lodash';

const stringifyValue = (value, depth) => {
  if (_.isArray(value)) {
    return `[${value.join(', ')}]`;
  }

  if (_.isObject(value)) {
    const keys = Object.keys(value);

    const resultValue = keys.map((key) => {
      if (_.isObject(value[key]) && !Array.isArray(value[key])) {
        return `${'  '.repeat(depth)}  ${key}: ${stringifyValue(value[key], depth + 2)}`;
      }

      return `${'  '.repeat(depth)}  ${key}: ${value[key]}`;
    }).join('\n');

    return ['{', resultValue, `${'  '.repeat(depth - 1)}}`].join('\n');
  }

  return String(value);
};

const renderStylish = (tree, depth = 1) => {
  const resultPrototype = tree.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${'  '.repeat(depth)}  ${node.key}: ${renderStylish(node.children, depth + 2)}`;
      case 'changed':
        return [`${'  '.repeat(depth)}- ${node.key}: ${stringifyValue(node.oldValue, depth + 2)}`, `${'  '.repeat(depth)}+ ${node.key}: ${stringifyValue(node.newValue, depth + 2)}`].join('\n');
      case 'added':
        return `${'  '.repeat(depth)}+ ${node.key}: ${stringifyValue(node.value, depth + 2)}`;
      case 'unchanged':
        return `${'  '.repeat(depth)}  ${node.key}: ${stringifyValue(node.value, depth + 2)}`;
      case 'removed':
        return `${'  '.repeat(depth)}- ${node.key}: ${stringifyValue(node.value, depth + 2)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  }).join('\n');

  const result = ['{', resultPrototype, `${'  '.repeat(depth - 1)}}`];
  return result.join('\n');
};

export default (tree) => renderStylish(tree);
