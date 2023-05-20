import Area from "./area";
export default class Paddle extends Area{
  constructor(width, height, x1, y1, screenTop, screenBottom) {
    super(width, height, x1, y1);
    this.speed = 10;
    this.direction = 0;
    this.enabled = false;
    this.screenTop = screenTop;
    this.screenBottom = screenBottom;
  }

  moveUp() {
    this.direction = -this.speed;
  }

  moveDown() {
    this.direction = this.speed;
  }

  getSpeed()
  {
    return this.speed;
  }

  setSpeed(speed)
  {
    this.speed += speed;
  }

  move() {
    if (this.enabled) {
      this.y1 += this.direction;
      if (this.y1 < this.screenTop) {
        this.y1 = this.screenTop;
      }
      if (this.y2 > this.screenBottom) {
        this.y1 = this.screenBottom - this.height;
      }
    }
  }

  stop() {
    this.direction = 0;
  }

  animate(ctx) {
    this.move();
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x1, this.y1, this.width, this.height);
  }
}
