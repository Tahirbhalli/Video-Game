/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import Scene1 from './Scene1';

const config = {
  type: Phaser.WEBGL,
  width: 640,
  height: 480,
  backgroundColor: '#bfcc00',
  parent: 'phaser-example',
  scene: [Scene1],
};

const Game = () => new Phaser.Game(config);
export default Game;