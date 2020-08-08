const Restart = () => {
  const div = document.createElement('div');
  const btn = document.createElement('button');
  btn.id = 'btnrestart';
  btn.innerText = 'Restart Game';
  btn.addEventListener('click', () => {
    window.location.reload();
  });
  div.appendChild(btn);
  return div;
};
module.exports = Restart;
