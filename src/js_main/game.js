class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.canvas = document.getElementById("gameScreen");
    this.ctx = this.canvas.getContext("2d");
    this.divRank = document.getElementById("rank");
    this.rank = [];

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.float = "left";

    this.divRank.style.width = "20%";
    this.divRank.style.float = "right";
  }

  start() {
    this.speedX = Math.floor(Math.random() * 4) + 3;
    this.speedY = Math.floor(Math.random() * 4) + 3;
    this.directionX = Math.random() < 0.5 ? -this.speedX : this.speedX;
    this.directionY = Math.random() < 0.5 ? -this.speedY : this.speedY;

    this.ball = new Ball(this);
    this.paddleL = new Paddle(this, true);
    this.paddleR = new Paddle(this, false);
    this.startTime = new Date();

    this.gameObjects = [this.ball, this.paddleL, this.paddleR];

    new InputHandler(this.paddleL, this.paddleR);
  }

  restart() {
    this.rank.push(this.currentTimer);
    this.rank.sort();
    this.rank.reverse();
    if (this.rank.length > 5) {
      this.rank.pop();
    }
    this.divRank.innerHTML = "";
    this.rank.forEach((timer) => {
      this.divRank.innerHTML += "<p>" + this.formatTimer(timer) + "</p>";
    });
    this.start();
  }

  animate() {
    this.currentTimer = new Date(new Date() - this.startTime.getTime());
    this.timer = this.formatTimer(this.currentTimer);
    document.getElementById("timer").innerHTML = this.timer;

    this.gameObjects.forEach((object) => object.animate(this.ctx));
  }

  formatTimer(timer) {
    let hour = timer.getUTCHours();
    let minute = timer.getUTCMinutes();
    let second = timer.getUTCSeconds();
    let fHour = hour < 0 ? "00" : hour < 10 ? "0" + hour : hour;
    let fMinute = minute < 10 ? "0" + minute : minute;
    let fSecond = second < 10 ? "0" + second : second;
    return fHour + ":" + fMinute + ":" + fSecond;
  }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.animate(this.ctx);

    requestAnimationFrame((timestamp) => {
      this.gameLoop();
    });
  }

  run() {
    this.start();
    requestAnimationFrame((timestamp) => {
      this.gameLoop();
    });
  }
}
