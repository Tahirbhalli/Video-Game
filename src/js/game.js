/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

const config = {
  type: Phaser.WEBGL,
  width: 640,
  height: 480,
  backgroundColor: '#bfcc00',
  parent: 'phaser-example',
  scene: {
    preload,
    create,
    update,
  },
};
let snake;
let food;
let cursors;

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

const game = new Phaser.Game(config);

const food1 = require('../assets/food.png');
const body = require('../assets/body.png');

function preload() {
  this.load.image('food', food1);
  this.load.image('body', body);
}

function create() {
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

      const x = Phaser.Math.Between(0, 39);
      const y = Phaser.Math.Between(0, 29);

      this.setPosition(x * 16, y * 16);
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

          this.speed = 100;

          this.moveTime = 0;

          this.tail = new Phaser.Geom.Point(x, y);

          this.heading = RIGHT;
          this.direction = RIGHT;
        },

    // eslint-disable-next-line consistent-return
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
          console.log('excpetion');
          break;
      }

      this.direction = this.heading;

      Phaser.Actions.ShiftPosition(this.body.getChildren(),
        this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);

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

        return true;
      }

      return false;
    },

  });

  food = new Food(this, 3, 4);

  snake = new Snake(this, 8, 8);

  cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
  if (!snake.alive) {
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
    snake.collideWithFood(food);
  }
}