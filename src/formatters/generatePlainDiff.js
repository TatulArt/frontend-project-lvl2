import _ from 'lodash';

const getValidValue = (data) => {
  if (typeof data !== 'string' && !_.isObject(data)) {
    return `${data}`;
  }

  return _.isObject(data) ? '[complex value]' : `'${data}'`;
};

const generatePlainDiff = (diff, path = '') => diff.map((diffElement) => {
  switch (diffElement.type) {
    case 'nested':
      return generatePlainDiff(diffElement.children, `${path}${diffElement.key}.`);
    case 'changed':
      return `Property ${path}${diffElement.key} was updated. From ${getValidValue(diffElement.value[0])} to ${getValidValue(diffElement.value[1])}`;
    case 'added':
      return `Property ${path}${diffElement.key} was added with value: ${getValidValue(diffElement.value)}`;
    case 'removed':
      return `Property ${path}${diffElement.key} was removed`;
    case 'unchanged':
      return;
    default:
      throw new Error(`Unknown type: ${diffElement.type}`);
  }
}).join('\n');

export default generatePlainDiff;
