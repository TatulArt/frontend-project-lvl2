import _ from 'lodash';

const diffToStr = (diff, depthLevel = 1) => diff.map((diffElement) => {
  if (_.isArray(diffElement[0])) {
    const [previousKey, previousValue] = diffElement[0];
    const [presentKey, presentValue] = diffElement[1];

    return `${previousKey}: ${previousValue}\n${'  '.repeat(depthLevel)}${presentKey}: ${presentValue}`;
  }

  const [key, value] = diffElement;

  if (_.isArray(value)) {
    return `${key}: {\n${'  '.repeat(depthLevel + 1)}${diffToStr(value, depthLevel + 1)}\n${'  '.repeat(depthLevel + 1)}}`;
  }

  return `${key}: '${value}'`;
}).join(`\n${'  '.repeat(depthLevel)}`);

export default diffToStr;
