/* eslint-disable no-unused-vars */
import Game from './js/Game';
import DB from './js/db';

const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  if (document.querySelector('#username').value === '') {
    alert('Please enter the user name');
    return;
  }
  DB.setusername(document.querySelector('#username').value);
  Game();
  btn.style.display = 'none';
  document.querySelector('input').style.display = 'none';
  document.querySelector('span').style.display = 'none';
  document.querySelector('#username').style.display = 'none';
});
DB.get();
