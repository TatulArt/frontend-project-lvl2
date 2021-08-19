import _ from 'lodash';

const getValidValue = (data) => {
  if (typeof data !== 'string' && !_.isObject(data)) {
    return `${data}`;
  }

  return _.isObject(data) ? '[complex value]' : `'${data}'`;
};

const renderPlain = (tree, path = '') => {
  const treeWithoutUnchangedElements = tree.filter((treeElement) => treeElement.type !== 'unchanged');

  return treeWithoutUnchangedElements.map((treeElement) => {
    switch (treeElement.type) {
      case 'nested':
        return renderPlain(treeElement.children, `${path}${treeElement.key}.`);
      case 'changed':
        return `Property '${path}${treeElement.key}' was updated. From ${getValidValue(treeElement.value[0])} to ${getValidValue(treeElement.value[1])}`;
      case 'added':
        return `Property '${path}${treeElement.key}' was added with value: ${getValidValue(treeElement.value)}`;
      case 'removed':
        return `Property '${path}${treeElement.key}' was removed`;
      default:
        throw new Error(`Unknown type: ${treeElement.type}`);
    }
  }).join('\n');
};

export default renderPlain;
