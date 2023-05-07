export default class Ball {
  constructor(game) {
    this.game = game;
    this.positionX = Math.floor(this.game.canvas.width / 2);
    this.positionY = Math.floor(this.game.canvas.height / 2);
    this.speedX = this.game.speedX;
    this.speedY = this.game.speedY;
    this.directionX = this.game.directionX;
    this.directionY = this.game.directionY;
    this.size = Math.floor(this.game.canvas.height * 0.03);
    this.hitSound = new Audio('./assets/audio/hit.mp3');
  }

  draw(ctx) {
    ctx.fillStyle = '#f00';
    ctx.fillRect(this.positionX, this.positionY, this.size, this.size);
  }

  move() {
    if (this.directionX > 0) {
      this.game.paddleL.enabled = false;
      this.game.paddleR.enabled = true;
    } else {
      this.game.paddleL.enabled = true;
      this.game.paddleR.enabled = false;
    }

    //check top border collision
    if (this.directionY < 0 && this.positionY < 0) {
      this.hitBorder(this.speedY);
    }

    // check bottom border collision
    if (this.directionY > 0 && this.positionY + this.size > this.game.canvas.height) {
      this.hitBorder(-this.speedY);
    }

    //check collision on Left Paddle
    if (
      this.checkHitY(this.game.paddleL) &&
      this.positionX > this.game.paddleL.areaX1 &&
      this.positionX < this.game.paddleL.areaX2
    ) {
      this.hitPaddle(this.speedX);
    }

    //check collision on Left Wall
    if (this.directionX < 0 && this.positionX + this.size < 0) {
      this.game.reset();
    }

    //check collision on Righ Paddle
    if (
      this.checkHitY(this.game.paddleR) &&
      this.positionX + this.size > this.game.paddleR.areaX1 &&
      this.positionX + this.size < this.game.paddleR.areaX2
    ) {
      this.hitPaddle(-this.speedX);
    }

    //check collision on Righ Wall
    if (this.directionX > 0 && this.positionX > this.game.canvas.width) {
      this.game.reset();
    }

    //move
    this.positionX += this.directionX;
    this.positionY += this.directionY;
  }

  animate(ctx) {
    this.move();
    this.draw(ctx);
  }

  speedUpY() {
    this.speedY += 0.5;
  }

  speedUpX() {
    this.speedX += 0.5;
  }

  hitPaddle(speedX) {
    this.speedUpX();
    this.directionX = speedX;
    this.hitSound.play();
  }

  hitBorder(speedY) {
    this.speedUpY();
    this.directionY = speedY;
    this.hitSound.play();
  }

  checkHitY(paddle) {
    return (
      (this.positionY > paddle.areaY1 && this.positionY < paddle.areaY2) ||
      (this.positionY + this.size > paddle.areaY1 && this.positionY + this.size < paddle.areaY2)
    );
  }
}
