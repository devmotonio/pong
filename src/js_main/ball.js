class Ball {
  constructor(game) {
    this.game = game;
    this.position = { x: Math.floor(this.game.width / 2), y: Math.floor(this.game.height / 2) };
    this.speed = { x: this.game.speedX, y: this.game.speedY };
    this.direction = { x: this.game.directionX, y: this.game.directionY };
    this.size = Math.floor(game.height*0.02);
  }

  draw(ctx) {
    ctx.fillStyle = "#f00";
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  move() {
    if (this.direction.x > 0) {
      this.game.paddleL.enabled = false;
      this.game.paddleR.enabled = true;
    } else {
      this.game.paddleL.enabled = true;
      this.game.paddleR.enabled = false;
    }

    //check top collision
    if (this.direction.y < 0 && this.position.y < 0) {
      this.speedUpY();
      this.direction.y = this.speed.y;
    }

    // check bottom collision
    if (this.direction.y > 0 && this.position.y + this.size > this.game.height) {
      this.speedUpY();
      this.direction.y = -this.speed.y;
    }

    //check collision on Left Paddle
    if (
      this.checkHitY(this.game.paddleL) &&
      this.position.x > this.game.paddleL.area.x1 &&
      this.position.x < this.game.paddleL.area.x2
    ) {
      this.speedUpX();
      this.direction.x = this.speed.x;
    }

    //check collision on Left Wall
    if (this.direction.x < 0 && this.position.x + this.size < 0) {
      this.game.restart();
    }

    //check collision on Righ Paddle
    if (
      this.checkHitY(this.game.paddleR) &&
      this.position.x + this.size > this.game.paddleR.area.x1 &&
      this.position.x + this.size < this.game.paddleR.area.x2
    ) {
      this.speedUpX();
      this.direction.x = -this.speed.x;
    }

    //check collision on Righ Wall
    if (this.direction.x > 0 && this.position.x > this.game.width) {
      this.game.restart();
    }
    
    //move
    this.position.x += this.direction.x;
    this.position.y += this.direction.y;
  }

  animate(ctx) {
    this.move();
    this.draw(ctx);
  }

  speedUpY() {
    this.speed.y += 0.5;
  }

  speedUpX() {
    this.speed.x += 0.5;
  }

  checkHitY(paddle) {
    return (
      (this.position.y > paddle.area.y1 && this.position.y < paddle.area.y2) ||
      (this.position.y + this.size > paddle.area.y1 && this.position.y + this.size < paddle.area.y2)
    );
  }
}
