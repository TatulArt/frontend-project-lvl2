import _ from 'lodash';
import { addElementsToObject } from '../mutationLessUtilities.js';

const getDiffObject = (diff) => diff.reduce((acc, diffElement) => {
  if (_.isArray(diffElement.value) && diffElement.type !== 'changed') {
    return addElementsToObject(acc, diffElement.key, getDiffObject(diffElement.value));
  }

  return addElementsToObject(acc, diffElement.key, diffElement.value);
}, {});

const json = (diff) => JSON.stringify(getDiffObject(diff));

export default json;
