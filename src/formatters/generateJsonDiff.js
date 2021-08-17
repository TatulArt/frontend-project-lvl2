import _ from 'lodash';

const getDiffObject = (diff) => diff.reduce((acc, diffElement) => {
  if (diffElement.type === 'nested') {
    return _.assign(acc, { [diffElement.key]: getDiffObject(diffElement.children) });
  }

  return _.assign(acc, { [diffElement.key]: diffElement.value });
}, {});

const generateJsonDiff = (diff) => JSON.stringify(getDiffObject(diff));

export default generateJsonDiff;
