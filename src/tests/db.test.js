/* eslint-disable no-undef */
const DB = require('../js/db');
require('../index');

test('local storage', () => {
  DB.updatescore(1);
  expect(localStorage.getItem('score')).toBe('1');
});
