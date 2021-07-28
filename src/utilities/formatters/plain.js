import _ from 'lodash';
import { addElementsToArray } from '../mutationLessUtilities.js';

const getValidValue = (data) => {
  if (typeof data !== 'string' && !_.isObject(data)) {
    return `${data}`;
  }

  return _.isObject(data) ? '[complex value]' : `'${data}'`;
};

const getMessageByState = (state, value) => {
  switch (state) {
    case 'changed':
      return `was updated. From ${getValidValue(value[0])} to ${getValidValue(value[1])}`;
    case 'added':
      return `was added with value: ${getValidValue(value)}`;
    case 'removed':
      return 'was removed';
    default:
      throw new Error(`Unknown state: ${state}`);
  }
};

const plain = (diff, path = '') => diff.reduce((acc, diffElement) => {
  if (diffElement.state === 'unchanged') {
    return acc;
  }

  const currentPath = `${path}${diffElement.key}`;

  if (diffElement.state === 'sameNameObjects') {
    return addElementsToArray(acc, plain(diffElement.value, `${currentPath}.`));
  }

  const message = `Property '${currentPath}' ${getMessageByState(diffElement.state, diffElement.value)}`;
  return addElementsToArray(acc, message);
}, []).join('\n');

export default plain;
