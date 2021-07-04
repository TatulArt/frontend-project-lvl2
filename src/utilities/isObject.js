const isObject = (x) => {
  if (typeof x === 'object' && !Array.isArray(x) && x !== null && x !== undefined) {
    return true;
  }

  return false;
};

export default isObject;
