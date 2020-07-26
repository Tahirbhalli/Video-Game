/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Scene1 from './Scene1';

const config = {
  type: Phaser.AUTO,
  background: 0x000000,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [Scene1],
};

const game = new Phaser.Game(config);
