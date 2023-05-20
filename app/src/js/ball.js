import Area from "./area";
export default class Ball extends Area {
  constructor(width, height, x1, y1, screenTop, screenRight, screenBottom, screenLeft) {
    super(width, height, x1, y1);
    this.screenTop = screenTop;
    this.screenRight = screenRight;
    this.screenBottom = screenBottom;
    this.screenLeft = screenLeft;

    this.speedStep = 0.5;
    this.speedX = Math.floor(Math.random() * 6) + 4;
    this.speedY = Math.floor(Math.random() * 6) + 4;
    this.directionX = Math.random() < 0.5 ? -1 : 1;
    this.directionY = Math.random() < 0.5 ? -1 : 1;
    this.hitSound = new Audio("./asset/audio/hit.mp3");
  }

  move() {
    //move
    this.x1 += this.speedX * this.directionX;
    this.y1 += this.speedY * this.directionY;
  }

  animate(ctx) {
    this.move();
    ctx.fillStyle = "#f00";
    ctx.fillRect(this.x1, this.y1, this.width, this.height);
  }

  setSpeedY(step = this.speedStep) {
    this.speedY += step;
  }

  setSpeedX(step = this.speedStep) {
    this.speedX += step;
  }

  getSpeedX()
  {
    return this.speedX;
  }

  getSpeedY()
  {
    return this.speedY;
  }

  hitPaddle() {
    this.hitSound.play();
    this.setSpeedX();
    this.directionX = -this.directionX;
  }

  hitBorder() {
    this.hitSound.play();
    this.setSpeedY();
    this.directionY = -this.directionY;
  }

  //check screen top border collision
  checkHitTop() {
    if (this.directionY < 0 && this.y1 < 0) {
      this.hitBorder();
    }
  }

  //check collision on Righ Wall
  checkHitRight() {
    return this.directionX > 0 && this.x1 >= this.screenRight;
  }

  // check screen bottom border collision
  checkHitBottom() {
    if (this.directionY > 0 && this.y2 > this.screenBottom) {
      this.hitBorder();
    }
  }

  //check collision on Left Wall
  checkHitLeft() {
    return this.directionX < 0 && this.x2 <= 0;
  }
}
