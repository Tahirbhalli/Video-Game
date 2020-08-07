/* eslint-disable no-undef */
const DB = require('../js/db');


test('set user name', () => {
  DB.setusername('tahir');
  expect(localStorage.getItem('user')).toBe('tahir');
});
test('table ', () => {
  expect(typeof (DB.datatable([1, 2, 3]))).toBe(typeof (document.createElement('table')));
});
