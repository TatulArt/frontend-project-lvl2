import _ from 'lodash';

export const addElementsToObject = (object, ...elements) => {
  const elementsObject = _.fromPairs(_.chunk(elements, 2));

  return _.assign(object, elementsObject);
};

export const addElementsToArray = (array, ...elements) => [...array, ...elements];
