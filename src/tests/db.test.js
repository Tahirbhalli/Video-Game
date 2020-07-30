/* eslint-disable no-undef */
const DB = require('../js/db');

test('local storage', () => {
  DB.updatescore(1);
  expect(localStorage.getItem('score')).toBe('1');
});
