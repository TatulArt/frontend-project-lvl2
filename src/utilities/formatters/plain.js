import _ from 'lodash';

const getValidValue = (data) => {
  if (typeof data !== 'string' && !_.isObject(data)) {
    return `${data}`;
  }

  return _.isObject(data) ? '[complex value]' : `'${data}'`;
};

const plain = (diff, path = '') => {
  const plainDiff = [];

  const keys = Object.keys(diff);
  _.sortBy(keys).forEach((key) => {
    const currentPath = `${path}${key}`;

    if (diff[key].state === 'changed') {
      const previousValue = getValidValue(diff[key].value[0]);
      const presentValue = getValidValue(diff[key].value[1]);

      plainDiff.push(`Property '${currentPath}' was updated. From ${previousValue} to ${presentValue}`);
    }

    const value = getValidValue(diff[key].value);

    if (diff[key].state === 'same-name objects') {
      plainDiff.push(plain(diff[key].value, `${currentPath}.`));
    }

    if (diff[key].state === 'added') {
      plainDiff.push(`Property '${currentPath}' was added with value: ${value}`);
    }

    if (diff[key].state === 'removed') {
      plainDiff.push(`Property '${currentPath}' was removed`);
    }
  });

  return plainDiff.join('\n');
};

export default plain;
