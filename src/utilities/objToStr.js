const objToStr = (obj, depthLevel) => {
  const result = [];
  result.push('{');

  const keys = Object.keys(obj);
  keys.forEach((key) => {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      result.push(`${'  '.repeat(depthLevel)}${key}: ${objToStr(obj[key], depthLevel + 1)}`);
    } else {
      result.push(`${'  '.repeat(depthLevel)}${key}: ${obj[key]}`);
    }
  });

  result.push(`${'  '.repeat(depthLevel - 1)}}`);
  return result.join('\n');
};

export default objToStr;
