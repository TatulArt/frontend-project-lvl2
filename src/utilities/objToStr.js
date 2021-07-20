import _ from 'lodash';

const objectDecoder = (obj, depthLevel = 1) => {
  const objKeys = Object.keys(obj);

  return objKeys.map((key) => {
    if (_.isObject(obj[key]) && !Array.isArray(obj[key])) {
      return `${'  '.repeat(depthLevel)}${key}: ${objectDecoder(obj[key], depthLevel + 1)}`;
    }

    return `${'  '.repeat(depthLevel)}${key}: ${obj[key]}`;
  });
};

const diffToStr = (diff, depthLevel = 1) => diff.map((diffElement) => {
  if (Array.isArray(diffElement.value)) {
    const r = diffElement.value.map((innerDiff) => diffToStr(innerDiff, depthLevel + 1));
    return `${'  '.repeat(depthLevel)}${diffElement.key}: { ${r.join('\n')} }`;
  }

  if (_.isObject(diffElement.value) && !Array.isArray(diffElement.value)) {
    return `${'  '.repeat(depthLevel)}${diffElement.key}: { ${objectDecoder(diffElement.value)} }`;
  }

  return `${'  '.repeat(depthLevel)}${diffElement.key}: { ${diffElement.value} }`;
});

export default diffToStr;

/* const result = [];
  result.push('{');

  const keys = Object.keys(obj);
  keys.forEach((key) => {
    if (_.isObject(obj[key]) && !Array.isArray(obj[key])) {
      result.push(`${'  '.repeat(depthLevel)}${key}: ${objToStr(obj[key], depthLevel + 2)}`);
    } else {
      result.push(`${'  '.repeat(depthLevel)}${key}: ${obj[key]}`);
    }
  });

  result.push(`${'  '.repeat(depthLevel - 1)}}`);
  return result.join('\n'); */
