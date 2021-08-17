/* eslint no-undef: 0 */

import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (fixtureName) => path.resolve(process.cwd(), '__fixtures__', fixtureName);

const expectedResultStylish = readFileSync(getFixturePath('expectedStylish.txt'), 'utf-8');
const expectedResultPlain = readFileSync(getFixturePath('expectedPlain.txt'), 'utf-8');
const expectedResultJson = readFileSync(getFixturePath('expectedJson.txt'), 'utf-8');

test.each([
  { modeName: 'Stylish', result: genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')), expected: expectedResultStylish },
  { modeName: 'Plain', result: genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain'), expected: expectedResultPlain },
  { modeName: 'JSON', result: genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json'), expected: expectedResultJson },
])('Gendiff $modeName mode', (data) => {
  expect(data.result).toEqual(data.expected);
});
