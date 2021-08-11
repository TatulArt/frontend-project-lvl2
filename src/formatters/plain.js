import _ from 'lodash';
import { addElementsToArray } from '../mutationLessUtilities.js';

const getValidValue = (data) => {
  if (typeof data !== 'string' && !_.isObject(data)) {
    return `${data}`;
  }

  return _.isObject(data) ? '[complex value]' : `'${data}'`;
};

const getMessageByType = (type, value) => {
  switch (type) {
    case 'changed':
      return `was updated. From ${getValidValue(value[0])} to ${getValidValue(value[1])}`;
    case 'added':
      return `was added with value: ${getValidValue(value)}`;
    case 'removed':
      return 'was removed';
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

const plain = (diff, path = '') => diff.reduce((acc, diffElement) => {
  if (diffElement.type === 'unchanged') {
    return acc;
  }

  const currentPath = `${path}${diffElement.key}`;

  if (diffElement.type === 'nested') {
    return addElementsToArray(acc, plain(diffElement.value, `${currentPath}.`));
  }

  const message = `Property '${currentPath}' ${getMessageByType(diffElement.type, diffElement.value)}`;
  return addElementsToArray(acc, message);
}, []).join('\n');

export default plain;
