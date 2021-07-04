import _ from 'lodash';

const plain = (diff, path = '') => {
  const plainDiff = [];

  const keys = Object.keys(diff);
  _.sortBy(keys).forEach((key) => {
    const currentPath = `${path}${key}`;

    if (diff[key].state === 'changed') {
      let previousValue = _.isObject(diff[key].value[0]) ? '[complex value]' : `'${diff[key].value[0]}'`;
      if (typeof diff[key].value[0] !== 'string' && !_.isObject(diff[key].value[0])) {
        previousValue = `${diff[key].value[0]}`;
      }

      let presentValue = _.isObject(diff[key].value[1]) ? '[complex value]' : `'${diff[key].value[1]}'`;
      if (typeof diff[key].value[1] !== 'string' && !_.isObject(diff[key].value[1])) {
        presentValue = `${diff[key].value[1]}`;
      }

      plainDiff.push(`Property '${currentPath}' was updated. From ${previousValue} to ${presentValue}`);
    }

    let value = _.isObject(diff[key].value) ? '[complex value]' : `'${diff[key].value}'`;

    if (typeof diff[key].value !== 'string' && !_.isObject(diff[key].value)) {
      value = `${diff[key].value}`;
    }

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

  return plainDiff.flat().join('\n');
};

export default plain;
