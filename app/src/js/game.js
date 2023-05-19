import Paddle from "./paddle.js";
import Ball from "./ball.js";
import InputHandler from "./input.handler.js";

export default class Game {
  constructor(height) {
    this.canvas = document.getElementById("game_screen");
    this.ctx = this.canvas.getContext("2d");
    this.rank = [];
    this.speedX = 0;
    this.speedY = 0;
    this.directionX = 0;
    this.directionY = 0;

    this.canvas.width = Math.floor(window.visualViewport.width * 0.8);
    this.canvas.height = height;

    this.gameScreenWidth = Math.floor(this.canvas.width * 0.8);
    this.gameScreenHeight = this.canvas.height;

    this.rankScreenWidth = Math.floor(this.canvas.width * 0.2);
    this.rankScreenHeight = this.canvas.height;
  }

  init() {
    this.speedX = Math.floor(Math.random() * 4) + 3;
    this.speedY = Math.floor(Math.random() * 4) + 3;
    this.directionX = Math.random() < 0.5 ? -this.speedX : this.speedX;
    this.directionY = Math.random() < 0.5 ? -this.speedY : this.speedY;

    this.startTime = new Date();

    this.ball = new Ball(this);
    this.paddleL = new Paddle(this, true);
    this.paddleR = new Paddle(this, false);
    this.gameObjects = [this.ball, this.paddleL, this.paddleR];

    new InputHandler(this.paddleL, this.paddleR);
  }

  reset() {
    this.rank.push(this.currentTimer);
    this.rank.sort();
    this.rank.reverse();
    if (this.rank.length > 5) {
      this.rank.pop();
    }
    this.init();
  }

  animate() {
    let size = 30;
    let pad = Math.floor(size / 2);
    let space = size * 1.1;

    this.currentTimer = new Date(new Date() - this.startTime.getTime());

    //game screen
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.gameScreenWidth, this.gameScreenHeight);

    this.gameObjects.forEach((object) => object.animate(this.ctx));

    //rank screen
    this.ctx.fillStyle = "#333";
    this.ctx.fillRect(this.gameScreenWidth, 0, this.rankScreenWidth, this.rankScreenHeight);

    this.ctx.fillStyle = "#fff";
    this.ctx.textBaseline = "top";
    this.ctx.textAlign = "center";
    this.ctx.font = `${size}px sans-serif`;
    this.ctx.fillText("TIMER", this.gameScreenWidth + this.rankScreenWidth / 2, pad);
    this.ctx.fillText(this.formatTimer(this.currentTimer), this.gameScreenWidth + this.rankScreenWidth / 2, pad + space);
    this.ctx.fillText("RANK", this.gameScreenWidth + this.rankScreenWidth / 2, Math.floor(pad * 2 + space * 2));
    this.rank.forEach((rank, index) => {
      this.ctx.fillText(
        this.formatTimer(rank),
        this.gameScreenWidth + this.rankScreenWidth / 2,
        Math.floor(pad * 2+ space * 3) + space * index
      );
    });
  }

  formatTimer(timer) {
    let hour = timer.getUTCHours();
    let minute = timer.getUTCMinutes();
    let second = timer.getUTCSeconds();
    let fHour = hour < 10 ? "0" + hour : hour; //hour < 0 ? '00' :
    let fMinute = minute < 10 ? "0" + minute : minute;
    let fSecond = second < 10 ? "0" + second : second;
    return fHour + ":" + fMinute + ":" + fSecond;
  }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.animate();

    requestAnimationFrame((timestamp) => {
      this.gameLoop();
    });
  }

  start() {
    this.init();
    this.gameLoop();
  }
}
