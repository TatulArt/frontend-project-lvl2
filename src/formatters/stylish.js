import _ from 'lodash';

const indent = (indentSize) => ' '.repeat(indentSize);

const stringifyValue = (value, depth) => {
  if (_.isArray(value)) {
    return `[${value.join(', ')}]`;
  }

  if (_.isObject(value)) {
    const indentSize = depth * 4 - 2;

    const keys = Object.keys(value);

    const resultValue = keys.map((key) => {
      if (_.isObject(value[key]) && !Array.isArray(value[key])) {
        return `${indent(indentSize)}  ${key}: ${stringifyValue(value[key], depth + 1)}`;
      }

      return `${indent(indentSize)}  ${key}: ${value[key]}`;
    }).join('\n');

    return ['{', resultValue, `${indent(indentSize - 2)}}`].join('\n');
  }

  return String(value);
};

const renderStylish = (tree, depth = 1) => {
  const indentSize = depth * 4 - 2;

  const result = tree.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${indent(indentSize)}  ${node.key}: ${renderStylish(node.children, depth + 1)}`;
      case 'changed':
        return [`${indent(indentSize)}- ${node.key}: ${stringifyValue(node.oldValue, depth + 1)}`, `${indent(indentSize)}+ ${node.key}: ${stringifyValue(node.newValue, depth + 1)}`].join('\n');
      case 'added':
        return `${indent(indentSize)}+ ${node.key}: ${stringifyValue(node.value, depth + 1)}`;
      case 'unchanged':
        return `${indent(indentSize)}  ${node.key}: ${stringifyValue(node.value, depth + 1)}`;
      case 'removed':
        return `${indent(indentSize)}- ${node.key}: ${stringifyValue(node.value, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  }).join('\n');

  return ['{', result, `${indent(indentSize - 2)}}`].join('\n');
};

export default (tree) => renderStylish(tree);
