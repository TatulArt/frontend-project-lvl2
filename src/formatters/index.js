import renderStylish from './stylish.js';
import renderPlain from './plain.js';

export default (formaterName) => {
  switch (formaterName) {
    case 'stylish':
      return renderStylish;
    case 'plain':
      return renderPlain;
    case 'json':
      return (tree) => JSON.stringify(tree);
    default:
      throw new Error(`Unknown formater name: ${formaterName}`);
  }
};
