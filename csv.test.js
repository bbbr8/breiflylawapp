const test = require('node:test');
const assert = require('node:assert');
const { splitCSVLine, parseCSV } = require('./csv');

test('splitCSVLine handles quoted fields', () => {
  assert.deepStrictEqual(splitCSVLine('"a","b"'), ['a', 'b']);
});

test('splitCSVLine handles commas inside quotes', () => {
  assert.deepStrictEqual(splitCSVLine('"a,b",c'), ['a,b', 'c']);
});

test('splitCSVLine handles empty fields', () => {
  assert.deepStrictEqual(splitCSVLine('a,,c'), ['a', '', 'c']);
});

test('parseCSV handles uneven columns', () => {
  const csv = 'a,b,c\n1,2\n3,4,5,6';
  const rows = parseCSV(csv);
  assert.deepStrictEqual(rows, [
    { a: '1', b: '2', c: '' },
    { a: '3', b: '4', c: '5' },
  ]);
});

test('parseCSV handles quotes and commas', () => {
  const csv = 'name,age\n"Smith, Bob",30\nJane,\n"A,B",1';
  const rows = parseCSV(csv);
  assert.deepStrictEqual(rows, [
    { name: 'Smith, Bob', age: '30' },
    { name: 'Jane', age: '' },
    { name: 'A,B', age: '1' },
  ]);
});
