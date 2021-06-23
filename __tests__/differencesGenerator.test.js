/* eslint no-undef: 0 */
import genDiff from '../src/differencesGenerator.js';

const flatJSONResult = [];

flatJSONResult.push('{');
flatJSONResult.push('  - follow: false');
flatJSONResult.push('    host: hexlet.io');
flatJSONResult.push('  - proxy: 123.234.53.22');
flatJSONResult.push('  - timeout: 50');
flatJSONResult.push('  + timeout: 20');
flatJSONResult.push('  + verbose: true');
flatJSONResult.push('}');

test('flatJSON', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(flatJSONResult.join('\n'));
  expect(genDiff('thisFileDontExist', 'thisFileDontExist')).toEqual('');
  expect(genDiff('', '')).toEqual('{}');
});
