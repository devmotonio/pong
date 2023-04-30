class Paddle {
  constructor(game, isLeft) {
    this.width = 30;
    this.height = 150;
    this.speed = 10;
    this.direction = 0;
    this.pad = 10;
    this.enabled = false;
    this.gameArea = {
      y1: this.pad,
      y2: game.height - this.height - this.pad,
    };

    this.position = {
      x: isLeft ? this.pad : game.width - this.width - this.pad,
      y: this.pad,
    };

    this.area = {
      x1: this.position.x,
      x2: this.position.x + this.width,
      y1: 0,
      y2: 0,
    };
  }

  moveUp() {
    this.direction = -this.speed;
  }

  moveDown() {
    this.direction = this.speed;
  }

  move() {
    if (this.enabled) {
      this.position.y += this.direction;
      if (this.position.y < this.gameArea.y1) {
        this.position.y = this.gameArea.y1;
      }
      if (this.position.y > this.gameArea.y2) {
        this.position.y = this.gameArea.y2;
      }
      this.area.y1 = this.position.y;
      this.area.y2 = this.position.y + this.height;
    }
  }

  stop() {
    this.direction = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#000";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  animate(ctx) {
    this.move();
    this.draw(ctx);
  }
}
