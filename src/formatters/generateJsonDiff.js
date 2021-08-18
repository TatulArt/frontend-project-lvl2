const generateJsonDiff = (tree) => tree.map((treeElement) => {
  if (treeElement.type === 'nested') {
    return generateJsonDiff(treeElement.children);
  }

  return JSON.stringify(treeElement);
}).join('');

export default generateJsonDiff;
