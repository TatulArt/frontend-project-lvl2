import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.sortBy(_.union(keys1, keys2));

  const diff = allKeys.map((key) => {
    if (!_.hasIn(obj1, key)) {
      return { key, value: obj2[key], type: 'added' };
    }

    if (!_.hasIn(obj2, key)) {
      return { key, value: obj1[key], type: 'removed' };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, children: buildTree(obj1[key], obj2[key]), type: 'nested' };
    }

    if (obj2[key] === obj1[key]) {
      return { key, value: obj1[key], type: 'unchanged' };
    }

    return {
      key,
      oldValue: obj1[key],
      newValue: obj2[key],
      type: 'changed',
    };
  });

  return diff;
};

export default buildTree;
