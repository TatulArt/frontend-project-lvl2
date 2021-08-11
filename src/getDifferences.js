import _ from 'lodash';

const processUnchangedObject = (value) => {
  if (_.isObject(value) && !_.isArray(value)) {
    const objKeys = Object.keys(value);

    return objKeys.map((key) => {
      const result = {
        key,
        value: value[key],
        type: 'unchanged',
      };

      if (_.isObject(value[key]) && !_.isArray(value[key])) {
        return _.assign(result, { value: processUnchangedObject(value[key]) });
      }

      return result;
    });
  }

  return value;
};

const getDifferences = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const unitedKeys = _.sortBy(_.union(keys1, keys2));

  const filesDiffrences = unitedKeys.map((key) => {
    if (!_.hasIn(obj1, key)) {
      return { key, value: processUnchangedObject(obj2[key]), type: 'added' };
    }

    if (!_.hasIn(obj2, key)) {
      return { key, value: processUnchangedObject(obj1[key]), type: 'removed' };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, value: getDifferences(obj1[key], obj2[key]), type: 'nested' };
    }

    if (obj2[key] === obj1[key]) {
      return { key, value: processUnchangedObject(obj1[key]), type: 'unchanged' };
    }

    return { key, value: [processUnchangedObject(obj1[key]), processUnchangedObject(obj2[key])], type: 'changed' };
  });

  return filesDiffrences;
};

export default getDifferences;
