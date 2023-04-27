class Ball {
  constructor(game) {
    this.position = { x: 50, y: 50 };
    this.speed = { x: 2, y: 3 };
    this.direction = { x: this.speed.x, y: this.speed.y };
    this.size = 30;
    this.gameArea = {
      y1: 0,
      y2: game.height,
    };
  }

  draw(ctx) {
    ctx.fillStyle = "#f00";
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  move() {
    //move
    this.position.x += this.direction.x;
    this.position.y += this.direction.y;

    // check bottom collision
    if (this.position.y + this.size > this.gameArea.y2) {
      this.direction.y = -this.speed.y;
    }

    //check top collision
    if (this.position.y < this.gameArea.y1) {
      this.direction.y = this.speed.y;
    }

    //check collision on Righ Paddle
    if (this.direction.x > 0) {
      if (
        ((this.position.y > game.paddleR.area.y1 &&
          this.position.y < game.paddleR.area.y2) ||
          (this.position.y + this.size > game.paddleR.area.y1 &&
            this.position.y + this.size < game.paddleR.area.y2)) &&
        this.position.x + this.size > game.paddleR.area.x1 &&
        this.position.x + this.size < game.paddleR.area.x2
      ) {
        this.direction.x = -this.speed.x;
      }
    }

    //check collision on Left Paddle
    if (this.direction.x < 0) {
      if (
        ((this.position.y > game.paddleL.area.y1 &&
          this.position.y < game.paddleL.area.y2) ||
          (this.position.y + this.size > game.paddleL.area.y1 &&
            this.position.y + this.size < game.paddleL.area.y2)) &&
        this.position.x > game.paddleL.area.x1 &&
        this.position.x < game.paddleL.area.x2
      ) {
        this.direction.x = this.speed.x;
      }
    }
  }

  update(ctx) {
    this.move();
    this.draw(ctx);
  }
}
