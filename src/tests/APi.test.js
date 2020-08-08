async function getUserAsync() {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/5R5Sah9tg5zSJ3GLqlDi/scores');
  const data = await response.json();
  return data;
}
async function senddata(username, totalscore) {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/5R5Sah9tg5zSJ3GLqlDi/scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: username, score: totalscore }),
  });
  await response.json();
  const data2 = await JSON.parse(response.json());
  return data2.result;
}
test('recieve data from api ', async () => {
  expect(typeof (getUserAsync())).toBe(typeof ({}));
});
test('send data', () => {
  expect(typeof (senddata('ali', 5))).toBe(typeof ({}));
});
