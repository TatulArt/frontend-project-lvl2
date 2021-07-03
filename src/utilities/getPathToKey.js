const isobject = (x) => {
  if (typeof x === 'object' && !Array.isArray(x) && x !== null && x !== undefined) {
    return true;
  }

  return false;
};

const getPathToKey = (obj, value, prefix = '') => {
  const keys = Object.keys(obj);

  const path = keys.map((key) => {
    if (key === value) {
      return `${prefix}${key}`;
    }

    if (isobject(obj[key])) {
      getPathToKey(obj[key], value, `${prefix}${key}.`);
    }
  });

  console.log(path);
  return path;
};
export default getPathToKey;
