import _ from 'lodash';

const getTreeObject = (tree) => tree.reduce((acc, treeElement) => {
  if (treeElement.type === 'nested') {
    return _.assign(acc, { [treeElement.key]: getTreeObject(treeElement.children) });
  }

  return _.assign(acc, { [treeElement.key]: treeElement.value });
}, {});

const generateJsonDiff = (tree) => JSON.stringify(getTreeObject(tree));

export default generateJsonDiff;
