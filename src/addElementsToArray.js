import _ from 'lodash';

export default (array, data) => {
  if (!_.isArray(data)) {
    return [...array, data];
  }

  return [...array, ...data];
};
