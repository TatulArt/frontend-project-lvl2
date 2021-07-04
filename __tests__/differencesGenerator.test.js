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

const expectedResultJson = '{"common":{"value":{"follow":{"value":false,"state":"added"},"setting1":{"value":"Value 1","state":"without changes"},"setting2":{"value":200,"state":"removed"},"setting3":{"value":[true,null],"state":"changed"},"setting4":{"value":"blah blah","state":"added"},"setting5":{"value":{"key5":"value5"},"state":"added"},"setting6":{"value":{"doge":{"value":{"wow":{"value":["","so much"],"state":"changed"}},"state":"same-name objects"},"key":{"value":"value","state":"without changes"},"ops":{"value":"vops","state":"added"}},"state":"same-name objects"}},"state":"same-name objects"},"group1":{"value":{"baz":{"value":["bas","bars"],"state":"changed"},"foo":{"value":"bar","state":"without changes"},"nest":{"value":[{"key":"value"},"str"],"state":"changed"}},"state":"same-name objects"},"group2":{"value":{"abc":12345,"deep":{"id":45}},"state":"removed"},"group3":{"value":{"deep":{"id":{"number":45}},"fee":100500},"state":"added"}}';

test('gendiffJson', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toEqual(expectedResultJson);
});
