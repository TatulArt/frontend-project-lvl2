import generateStylishDiff from './generateStylishDiff.js';
import generatePlainDiff from './generatePlainDiff.js';
import generateJsonDiff from './generateJsonDiff.js';

export default (formaterName) => {
  switch (formaterName) {
    case 'stylish':
      return generateStylishDiff;
    case 'plain':
      return generatePlainDiff;
    case 'json':
      return generateJsonDiff;
    default:
      throw new Error(`Unknown formater name: ${formaterName}`);
  }
};
