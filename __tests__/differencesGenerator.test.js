/* eslint no-undef: 0 */
import genDiff from '../src/differencesGenerator.js';

const expectedResultStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test('emptyFilepaths', () => {
  expect(genDiff('', '')).toEqual('{}');
});

test('differentFormats', () => {
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(expectedResultStylish);
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.json')).toEqual(expectedResultStylish);
});

test('gendiffStylish', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expectedResultStylish);
});

const expectedResultPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

test('gendiffPlain', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(expectedResultPlain);
});

const expectedResultJson = '{"common":{"follow":false,"setting1":"Value 1","setting2":200,"setting3":[true,null],"setting4":"blah blah","setting5":{"key5":"value5"},"setting6":{"doge":{"wow":["","so much"]},"key":"value","ops":"vops"}},"group1":{"baz":["bas","bars"],"foo":"bar","nest":[[{"key":"key","value":"value","state":"unchanged"}],"str"]},"group2":{"abc":12345,"deep":{"id":45}},"group3":{"deep":{"id":{"number":45}},"fee":100500}}';

test('gendiffJson', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toEqual(expectedResultJson);
});
