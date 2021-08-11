/* eslint no-undef: 0 */

import genDiff from '../src/index.js';
import expectedResultStylish from '../__fixtures__/expected_result_fixtures/expectedStylish.js';
import expectedResultPlain from '../__fixtures__/expected_result_fixtures/expectedPlain.js';
import expectedResultJson from '../__fixtures__/expected_result_fixtures/expectedJson.js';

test('differentFormats', () => {
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(expectedResultStylish);
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.json')).toEqual(expectedResultStylish);
});

test.each([
  { modeName: 'Stylish', result: genDiff('__fixtures__/file1.json', '__fixtures__/file2.json'), expected: expectedResultStylish },
  { modeName: 'Plain', result: genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain'), expected: expectedResultPlain },
  { modeName: 'JSON', result: genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json'), expected: expectedResultJson },
])('Gendiff $modeName mode', (data) => {
  expect(data.result).toEqual(data.expected);
});
