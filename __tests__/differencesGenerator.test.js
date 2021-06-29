/* eslint no-undef: 0 */
import genDiff from '../src/utilities/differencesGenerator.js';

const expectedResult = [];

expectedResult.push('{');
expectedResult.push('  - follow: {');
expectedResult.push('      key: value');
expectedResult.push('    }');
expectedResult.push('    host: hexlet.io');
expectedResult.push('  - proxy: 123.234.53.22');
expectedResult.push('  - timeout: 50');
expectedResult.push('  + timeout: 20');
expectedResult.push('  + verbose: true');
expectedResult.push('}');

test('emptyFilepaths', () => {
  expect(genDiff('', '')).toEqual('{}');
});

test('gendiff', () => {
  expect(genDiff('__fixtures__/filesForTests/file1.json', '__fixtures__/filesForTests/file2.json')).toEqual(expectedResult.join('\n'));
  expect(genDiff('__fixtures__/filesForTests/file1.yaml', '__fixtures__/filesForTests/file2.yaml')).toEqual(expectedResult.join('\n'));
  expect(genDiff('__fixtures__/filesForTests/file1.yaml', '__fixtures__/filesForTests/file2.json')).toEqual(expectedResult.join('\n'));
});
