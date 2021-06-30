import _ from 'lodash';

const getPathToKey = (obj, key) => {
  if (_.has(obj, key)) {
    return key;
  }

  const objKeys = Object.keys(obj);
  keys.forEach((objKey) => {
    if (typeof obj[objKey] !== 'object') {
      return;
    }

    const path = getPathToKey(obj[objKey], key);
    if(path) return props[i] + '.' + path;
  });
};

export default getPathToKey;
