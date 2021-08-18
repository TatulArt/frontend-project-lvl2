import generateStylishDiff from './generateStylishDiff.js';
import generatePlainDiff from './generatePlainDiff.js';

export default (formaterName) => {
  switch (formaterName) {
    case 'stylish':
      return generateStylishDiff;
    case 'plain':
      return generatePlainDiff;
    case 'json':
      return (tree) => JSON.stringify(tree);
    default:
      throw new Error(`Unknown formater name: ${formaterName}`);
  }
};
