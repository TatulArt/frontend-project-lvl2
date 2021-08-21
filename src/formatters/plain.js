import _ from 'lodash';

const getValidValue = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }

  if (typeof data !== 'string') {
    return String(data);
  }

  return `'${data}'`;
};

const renderPlain = (tree, path = '') => {
  const filteredTree = tree.filter((node) => node.type !== 'unchanged');

  return filteredTree.map((node) => {
    switch (node.type) {
      case 'nested':
        return renderPlain(node.children, `${path}${node.key}.`);
      case 'changed':
        return `Property '${path}${node.key}' was updated. From ${getValidValue(node.oldValue)} to ${getValidValue(node.newValue)}`;
      case 'added':
        return `Property '${path}${node.key}' was added with value: ${getValidValue(node.value)}`;
      case 'removed':
        return `Property '${path}${node.key}' was removed`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  }).join('\n');
};

export default (tree) => renderPlain(tree);
