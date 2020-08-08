const speed = require('../js/speed');

test('default spped', () => {
  expect(speed(12)).toBe(100);
});
test('high speed', () => {
  const temp = document.createElement('input');
  temp.value = '3';

  expect(speed(temp)).toBe(50);
});
test('medium speed speed', () => {
  const temp = document.createElement('input');
  temp.value = '2';

  expect(speed(temp)).toBe(100);
});
test('medium speed speed', () => {
  const temp = document.createElement('input');
  temp.value = '1';

  expect(speed(temp)).toBe(200);
});