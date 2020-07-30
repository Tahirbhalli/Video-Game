/* eslint-disable prefer-destructuring */
const DB = (() => {
  const updatescore = (score) => {
    localStorage.setItem('score', score);
  };
  const datatable = (data) => {
    const table = document.getElementById('results');
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
    document.getElementById('1').innerHTML = 'You';
    document.getElementById('2').innerHTML = localStorage.getItem('score');
  };

  const set = () => {
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores/')
      .then(respons => respons.json()).then(data => datatable(data))
      .catch(err => console.log(err));
  };
  return {
    updatescore,
    set,
  };
})();
export default DB;