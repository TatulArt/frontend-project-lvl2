/* eslint no-undef: 0 */

import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const getFixturePath = (fixtureName) => path.resolve(process.cwd(), '__fixtures__', fixtureName);

const expectedResultStylish = readFileSync(getFixturePath('expectedStylish.txt'), 'utf-8');
const expectedResultPlain = readFileSync(getFixturePath('expectedPlain.txt'), 'utf-8');
const expectedResultJson = readFileSync(getFixturePath('expectedJson.txt'), 'utf-8');

test.each(['json', 'yaml'])('All formaters test. Format: %s', (format) => {
  const filepath1 = getFixturePath(`file1.${format}`);
  const filepath2 = getFixturePath(`file2.${format}`);
  expect(genDiff(filepath1, filepath2)).toEqual(expectedResultStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedResultPlain);
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedResultJson);
});