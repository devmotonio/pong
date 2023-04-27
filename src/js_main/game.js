class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  start() {
    this.paddleL = new Paddle(this, true);
    this.paddleR = new Paddle(this, false);
    this.ball = new Ball(this);

    this.gameObjects = [this.ball, this.paddleL, this.paddleR];

    new InputHandler(this.paddleL, this.paddleR);
  }

  update(ctx) {
    this.gameObjects.forEach((object) => object.update(ctx));
  }
}
