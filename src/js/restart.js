/* eslint-disable import/no-cycle */
// eslint-disable-next-line no-unused-vars
import Game from './Game';

const Restart = (() => {
  const start = () => {
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
  return {
    start,
  };
})();

export default Restart;
