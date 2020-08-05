/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import Restart from './restart';
import DB from './db';

const food1 = require('../assets/food.png');
const body = require('../assets/body.png');

let snake;
let food;
let cursors;
// eslint-disable-next-line prefer-const
let speed = () => {
  const b = document.querySelector('input');
  switch (b.value) {
    case '1':
      return 200;
    case '2':
      return 100;
    case 3:
      return 50;
    default:
      break;
  }
};

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

class Scene1 extends Phaser.Scene {
  constructor() {
    super('start game');
    this.score = 0;
    this.isover = 0;
  }

  preload() {
    this.load.image('food', food1);
    this.load.image('body', body);
  }

  create() {
    const Food = new Phaser.Class({

      Extends: Phaser.GameObjects.Image,

      initialize:

          function Food(scene, x, y) {
            Phaser.GameObjects.Image.call(this, scene);

            this.setTexture('food');
            this.setPosition(x * 16, y * 16);
            this.setOrigin(0);

            this.total = 0;

            scene.children.add(this);
          },

      eat() {
        this.total += 1;
      },

    });

    const Snake = new Phaser.Class({

      initialize:

          function Snake(scene, x, y) {
            this.headPosition = new Phaser.Geom.Point(x, y);

            this.body = scene.add.group();

            this.head = this.body.create(x * 16, y * 16, 'body');
            this.head.setOrigin(0);

            this.alive = true;

            this.speed = speed();
            this.moveTime = 0;

            this.tail = new Phaser.Geom.Point(x, y);

            this.heading = RIGHT;
            this.direction = RIGHT;
          },
      update(time) {
        if (time >= this.moveTime) {
          return this.move(time);
        }
      },

      faceLeft() {
        if (this.direction === UP || this.direction === DOWN) {
          this.heading = LEFT;
        }
      },

      faceRight() {
        if (this.direction === UP || this.direction === DOWN) {
          this.heading = RIGHT;
        }
      },

      faceUp() {
        if (this.direction === LEFT || this.direction === RIGHT) {
          this.heading = UP;
        }
      },

      faceDown() {
        if (this.direction === LEFT || this.direction === RIGHT) {
          this.heading = DOWN;
        }
      },

      move(time) {
        switch (this.heading) {
          case LEFT:
            this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);
            break;

          case RIGHT:
            this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);
            break;

          case UP:
            this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30);
            break;

          case DOWN:
            this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30);
            break;
          default:
            break;
        }

        this.direction = this.heading;

        Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16,
          this.headPosition.y * 16, 1, this.tail);
        const hitBody = Phaser.Actions.GetFirst(this.body.getChildren(),
          { x: this.head.x, y: this.head.y }, 1);

        if (hitBody) {
          this.alive = false;

          return false;
        }
        this.moveTime = time + this.speed;

        return true;
      },

      grow() {
        const newPart = this.body.create(this.tail.x, this.tail.y, 'body');

        newPart.setOrigin(0);
      },

      collideWithFood(food) {
        if (this.head.x === food.x && this.head.y === food.y) {
          this.grow();

          food.eat();

          if (this.speed > 20 && food.total % 5 === 0) {
            this.speed -= 5;
          }

          return true;
        }

        return false;
      },

      updateGrid(grid) {
        this.body.children.each((segment) => {
          const bx = segment.x / 16;
          const by = segment.y / 16;

          grid[by][bx] = false;
        });

        return grid;
      },

    });

    food = new Food(this, 3, 4);

    snake = new Snake(this, 8, 8);

    cursors = this.input.keyboard.createCursorKeys();
  }

  // eslint-disable-next-line no-unused-vars
  update(time, delta) {
    if (!snake.alive) {
      if (this.isover === 0) {
        this.isover = -1;
        const a = document.querySelector('canvas');
        document.body.removeChild(a);
        document.body.appendChild(Restart.start());
      }
      return;
    }

    if (cursors.left.isDown) {
      snake.faceLeft();
    } else if (cursors.right.isDown) {
      snake.faceRight();
    } else if (cursors.up.isDown) {
      snake.faceUp();
    } else if (cursors.down.isDown) {
      snake.faceDown();
    }

    if (snake.update(time)) {
      if (snake.collideWithFood(food)) {
        this.repositionFood();
      }
    }
  }

  repositionFood() {
    this.score += 1;
    DB.updatescore(this.score);
    DB.set();
    document.getElementById('score').innerHTML = this.score;
    const testGrid = [];

    for (let y = 0; y < 30; y += 1) {
      testGrid[y] = [];

      for (let x = 0; x < 40; x += 1) {
        testGrid[y][x] = true;
      }
    }

    snake.updateGrid(testGrid);


    const validLocations = [];

    for (let y = 0; y < 30; y += 1) {
      for (let x = 0; x < 40; x += 1) {
        if (testGrid[y][x] === true) {
          validLocations.push({ x, y });
        }
      }
    }

    if (validLocations.length > 0) {
      const pos = Phaser.Math.RND.pick(validLocations);

      food.setPosition(pos.x * 16, pos.y * 16);

      return true;
    }
    return false;
  }
}
export default Scene1;