import _ from 'lodash';

const getDiffObject = (diff) => diff.reduce((acc, diffElement) => {
  if (_.isArray(diffElement.value) && diffElement.type !== 'changed') {
    return _.assign(acc, { [diffElement.key]: getDiffObject(diffElement.value) });
  }

  return _.assign(acc, { [diffElement.key]: diffElement.value });
}, {});

const json = (diff) => JSON.stringify(getDiffObject(diff));

export default json;
