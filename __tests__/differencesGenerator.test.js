/* eslint no-undef: 0 */
import genDiff from '../src/utilities/differencesGenerator.js';

const flatFilesResult = [];

flatFilesResult.push('{');
flatFilesResult.push('  - follow: false');
flatFilesResult.push('    host: hexlet.io');
flatFilesResult.push('  - proxy: 123.234.53.22');
flatFilesResult.push('  - timeout: 50');
flatFilesResult.push('  + timeout: 20');
flatFilesResult.push('  + verbose: true');
flatFilesResult.push('}');

test('emptyFilepaths', () => {
  expect(genDiff('', '')).toEqual('{}');
});

test('flatFles', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(flatFilesResult.join('\n'));
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(flatFilesResult.join('\n'));
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.json')).toEqual(flatFilesResult.join('\n'));
});
