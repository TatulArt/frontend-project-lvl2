import _ from 'lodash';

const getValidValue = (data) => {
  if (typeof data !== 'string' && !_.isObject(data)) {
    return `${data}`;
  }

  return _.isObject(data) ? '[complex value]' : `'${data}'`;
};

const generatePlainDiff = (diff, path = '') => diff.map((diffElement) => {
  if (diffElement.type === 'unchanged') {
    return;
  }

  const currentPath = `${path}${diffElement.key}`;

  switch (diffElement.type) {
    case 'nested':
      return generatePlainDiff(diffElement.children, `${currentPath}.`);
    case 'changed':
      return `Property ${currentPath} was updated. From ${getValidValue(diffElement.value[0])} to ${getValidValue(diffElement.value[1])}`;
    case 'added':
      return `Property ${currentPath} was added with value: ${getValidValue(diffElement.value)}`;
    case 'removed':
      return `Property ${currentPath} was removed`;
    default:
      throw new Error(`Unknown type: ${diffElement.type}`);
  }
}).join('\n');

export default generatePlainDiff;
