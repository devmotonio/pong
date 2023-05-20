import Area from "./area";
import Paddle from "./paddle";
import Ball from "./ball";
import InputHandler from "./input.handler";

export default class Game {
  constructor() {
    let size = Math.floor(window.visualViewport.height * 0.7);

    this.canvas = document.getElementById("game_screen");
    this.ctx = this.canvas.getContext("2d");
    this.rank = [];
    this.speedX = 0;
    this.speedY = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.isPlay = false;
    this.canvas.height = size;
    this.canvas.width =
      Math.floor(size * 2.5) < window.visualViewport.width
        ? Math.floor(size * 2.5)
        : Math.floor(window.visualViewport.width * 0.8);
    this.gameScreen = new Area(Math.floor(this.canvas.width * 0.8), this.canvas.height, 0, 0);
    this.rankScreen = new Area(Math.floor(this.canvas.width * 0.2), this.canvas.height, this.gameScreen.x2, 0);
  }

  init() {
    let unit = Math.floor(this.gameScreen.height * 0.03);
    let pad = Math.floor(unit / 3);
    let ballX = Math.floor(this.gameScreen.width / 2);
    let ballY = Math.floor(this.gameScreen.height / 2);
    let paddleHeight = unit * 5;
    let screenTop = pad;
    let screenBottom = this.gameScreen.height - pad;
    let screenLeft = pad;
    let screenRight = this.gameScreen.width - unit - pad;
    this.point = 0;

    this.startTime = new Date();

    this.ball = new Ball(
      unit,
      unit,
      ballX,
      ballY,
      this.gameScreen.y1,
      this.gameScreen.x2,
      this.gameScreen.y2,
      this.gameScreen.x1
    );
    this.paddleL = new Paddle(unit, paddleHeight, screenLeft, screenTop, screenTop, screenBottom);
    this.paddleR = new Paddle(unit, paddleHeight, screenRight, screenTop, screenTop, screenBottom);
    this.gameObjects = [this.ball, this.paddleL, this.paddleR];

    //this.inputHandler = new InputHandler(this.paddleL, this.paddleR, this);
  }

  reset() {

    this.rank.push(this.point);
    this.rank.sort();
    this.rank.reverse();
    if (this.rank.length > 5) {
      this.rank.pop();
    }
    localStorage.setItem("rank", this.rank.join(","));
    this.init();
  }

  animate() {
    this.animateGameScreen();
    this.animateRankScreen();
  }

  animateGameScreen() {
    //game screen
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(this.gameScreen.x1, this.gameScreen.y1, this.gameScreen.width, this.gameScreen.height);

    if (this.ball.directionX > 0) {
      this.paddleL.enabled = false;
      this.paddleR.enabled = true;
    } else {
      this.paddleL.enabled = true;
      this.paddleR.enabled = false;
    }

    this.ball.checkHitTop();
    this.ball.checkHitBottom();
    this.checkHitPaddle(this.paddleL, this.ball);
    this.checkHitPaddle(this.paddleR, this.ball);

    if (this.ball.checkHitRight() || this.ball.checkHitLeft()) {
      this.reset();
    }

    this.gameObjects.forEach((object) => object.animate(this.ctx));
  }

  animateRankScreen() {
    let line = Math.floor(this.rankScreen.height * 0.06);
    let pad = Math.floor(line * 0.8);

    this.currentTimer = new Date(new Date() - this.startTime.getTime());

    //rank screen
    this.ctx.fillStyle = "#333";
    this.ctx.fillRect(this.rankScreen.x1, this.rankScreen.y1, this.rankScreen.width, this.rankScreen.height);

    this.ctx.fillStyle = "#fff";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.font = `${line}px sans-serif`;

    this.ctx.fillText("TIMER", this.rankScreen.x1 + this.rankScreen.width / 2, pad);
    this.ctx.fillText(this.point, this.rankScreen.x1 + this.rankScreen.width / 2, pad + line);
    this.ctx.fillText("RANK", this.rankScreen.x1 + this.rankScreen.width / 2, Math.floor(pad * 2 + line * 2));

    this.rank.forEach((rank, index) => {
      this.ctx.fillText(rank, this.rankScreen.x1 + this.rankScreen.width / 2, Math.floor(pad * 2 + line * 3) + line * index);
    });

    this.ctx.fillText("Use", this.rankScreen.x1 + this.rankScreen.width / 2, Math.floor(pad * 2 + line * 9));
    this.ctx.fillText("↑ and ↓ keys", this.rankScreen.x1 + this.rankScreen.width / 2, Math.floor(pad * 3 + line * 10));
    this.ctx.fillText("To play", this.rankScreen.x1 + this.rankScreen.width / 2, Math.floor(pad * 4 + line * 11));
  }

  checkHitPaddle(paddle, ball) {
    if (paddle.enabled) {
      if (paddle.containsArea(ball)) {
        this.point++;
        paddle.enabled = false;
        ball.hitPaddle();
      }
    }
  }

  // formatTimer(timer) {
  //   console.log(typeof timer);
  //   let hour = timer.getUTCHours();
  //   let minute = timer.getUTCMinutes();
  //   let second = timer.getUTCSeconds();
  //   let fHour = hour < 10 ? "0" + hour : hour; //hour < 0 ? '00' :
  //   let fMinute = minute < 10 ? "0" + minute : minute;
  //   let fSecond = second < 10 ? "0" + second : second;
  //   return fHour + ":" + fMinute + ":" + fSecond;
  // }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.animate();

    requestAnimationFrame((timestamp) => {
      this.gameLoop();
    });
  }

  play() {
    this.isPlay = true;
    this.init();
    this.gameLoop();
  }

  start() {
    let storageRank = localStorage.getItem("rank");
    let size = Math.floor(this.canvas.height * 0.1);

    this.rank = storageRank == null || storageRank == "" ? this.rank : storageRank.split(",").map((item) => isNaN(parseInt(item)) ? 0 : parseInt(item));
    this.inputHandler = new InputHandler(this);

    console.log("game.1", this.rank);

    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#f00";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.font = `${size}px sans-serif`;

    this.ctx.fillText("CLICK ANYWHERE TO START", Math.floor(this.canvas.width / 2), Math.floor(this.canvas.height / 2));
  }
}
