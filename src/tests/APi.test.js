async function getUserAsync() {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores/');
  const data = await response.json();
  return data;
}
test('recieve data from api ', async () => {
  expect(typeof (getUserAsync())).toBe(typeof ({}));
});
