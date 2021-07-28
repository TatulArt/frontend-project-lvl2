import _ from 'lodash';
import { addElementsToArray } from '../mutationLessUtilities.js';

const getValidValue = (data) => {
  if (typeof data !== 'string' && !_.isObject(data)) {
    return `${data}`;
  }

  return _.isObject(data) ? '[complex value]' : `'${data}'`;
};

const plain = (diff, path = '') => diff.reduce((acc, diffElement) => {
  const currentPath = `${path}${diffElement.key}`;

  if (diffElement.state === 'changed') {
    const previousValue = getValidValue(diffElement.value[0]);
    const presentValue = getValidValue(diffElement.value[1]);

    const message = `Property '${currentPath}' was updated. From ${previousValue} to ${presentValue}`;
    return addElementsToArray(acc, message);
  }

  if (diffElement.state === 'sameNameObjects') {
    return addElementsToArray(acc, plain(diffElement.value, `${currentPath}.`));
  }

  const value = getValidValue(diffElement.value);

  if (diffElement.state === 'added') {
    const message = `Property '${currentPath}' was added with value: ${value}`;
    return addElementsToArray(acc, message);
  }

  if (diffElement.state === 'removed') {
    const message = `Property '${currentPath}' was removed`;
    return addElementsToArray(acc, message);
  }

  return acc;
}, []).join('\n');

export default plain;
