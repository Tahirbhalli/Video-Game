/* eslint-disable no-undef */
const DB = require('../js/db');


test('local storage', () => {
  DB.updatescore(1);
  expect(localStorage.getItem('score')).toBe('1');
});
test('table ', () => {
  expect(typeof (DB.datatable([1, 2, 3]))).toBe(typeof (document.createElement('table')));
});
