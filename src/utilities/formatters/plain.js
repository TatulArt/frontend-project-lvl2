import _ from 'lodash';

const plain = (diff, path = '') => {
  const plainDiff = [];

  const keys = Object.keys(diff);
  _.sortBy(keys).forEach((key) => {
    const currentPath = `${path}${key}`;

    if (diff[key].state === 'changed') {
      const previousValue = _.isObject(diff[key].value[0]) ? '[complex value]' : `'${diff[key].value[0]}'`;
      const presentValue = _.isObject(diff[key].value[1]) ? '[complex value]' : `'${diff[key].value[1]}'`;

      plainDiff.push(`Property '${currentPath}' was updated. From ${previousValue} to ${presentValue}`);
    }

    const value = typeof diff[key].value !== 'object' && diff[key].value !== null ? diff[key].value : '[complex value]';

    if (diff[key].state === 'same-name objects') {
      plainDiff.push(plain(diff[key].value, `${currentPath}.`));
    }

    if (diff[key].state === 'added') {
      plainDiff.push(`Property '${currentPath}' was added with value: ${value}`);
    }

    if (diff[key].state === 'removed') {
      plainDiff.push(`Property '${currentPath}' was removed.`);
    }
  });

  return plainDiff.flat().join('\n');
};

export default plain;
