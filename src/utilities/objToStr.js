const diffToStr = (diff, depthLevel = 1) => diff.map((diffElement) => {
  /*if (Array.isArray(diffElement.value)) {
    return `${'  '.repeat(depthLevel)}${diffElement.key}: { ${diffToStr(depthLevel.value, depthLevel + 1)} }`;
  }*/

  return `${'  '.repeat(depthLevel)}${diffElement.key}: { ${depthLevel.value} }`;
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
