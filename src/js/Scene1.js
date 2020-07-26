/* eslint-disable no-undef */
class Scene1 extends Phaser.Scene {
  constructor() {
    super('boot Game');
  }

  create() {
    this.add.text(20, 20, 'game loading');
  }
}
export default Scene1;