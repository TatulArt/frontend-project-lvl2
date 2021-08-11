/* eslint no-undef: 0 */

import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const expectedResultStylish = readFileSync('__fixtures__/expectedStylish.txt', 'utf-8');
const expectedResultPlain = readFileSync('__fixtures__/expectedPlain.txt', 'utf-8');
const expectedResultJson = readFileSync('__fixtures__/expectedJson.txt', 'utf-8');

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
