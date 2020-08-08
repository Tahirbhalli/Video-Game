/* eslint-disable prefer-destructuring */
const DB = (() => {
  const setusername = (name) => {
    localStorage.setItem('user', name);
  };
  const datatable = (data) => {
    const table = document.getElementById('results');
    try {
      document.getElementById('1').innerHTML = 'You';
      document.getElementById('2').innerHTML = localStorage.getItem('score');
      data.result.forEach(element => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td1.innerHTML = element.user;
        td2.innerHTML = element.score;
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
      });
    } catch (error) {
      console.log('no');
    }
    return table;
  };

  const get = () => {
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/5R5Sah9tg5zSJ3GLqlDi/scores')
      .then(respons => respons.json()).then(data => datatable(data))
      .catch(err => console.log(err));
  };
  const setscore = (username, totalscore) => {
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/5R5Sah9tg5zSJ3GLqlDi/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username, score: totalscore }),
    }).then(res => res.json()).then(res => console.log(res)).catch(err => console.log(err));
  };
  return {
    setusername,
    get,
    setscore,
    datatable,
  };
})();
module.exports = DB;