/* eslint-disable no-unused-vars */
import game from './js/game';

const canvas = () => {
  const canas = document.querySelector('canvas');
  canas.style.width = '100%';
  canas.style.height = '100%';
};
document.body.onload = () => canvas();