export default class Paddle {
  constructor(game, isLeft) {
    this.width = Math.floor(game.gameScreenHeight * 0.03);
    this.height = Math.floor(game.gameScreenHeight * 0.15);
    this.speed = 10;
    this.direction = 0;
    this.pad = 10;
    this.enabled = false;
    this.screenY1 = this.pad;
    this.screenY2 = game.gameScreenHeight - this.height - this.pad;
    this.positionX = isLeft ? this.pad : game.gameScreenWidth - this.width - this.pad;
    this.positionY = this.pad;
    this.areaX1 = this.positionX;
    this.areaX2 = this.positionX + this.width;
    this.areaY1 = 0;
    this.areaY2 = 0;
  }

  moveUp() {
    this.direction = -this.speed;
  }

  moveDown() {
    this.direction = this.speed;
  }

  move() {
    if (this.enabled) {
      this.positionY += this.direction;
      if (this.positionY < this.screenY1) {
        this.positionY = this.screenY1;
      }
      if (this.positionY > this.screenY2) {
        this.positionY = this.screenY2;
      }
      this.areaY1 = this.positionY;
      this.areaY2 = this.positionY + this.height;
    }
  }

  stop() {
    this.direction = 0;
  }

  draw(ctx) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
  }

  animate(ctx) {
    this.move();
    this.draw(ctx);
  }
}
