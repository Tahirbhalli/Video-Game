/* eslint-disable no-unused-vars */
import Game from './js/Game';

const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  Game();
  btn.style.display = 'none';
  document.querySelector('input').style.display = 'none';
  document.querySelector('span').style.display = 'none';
});
