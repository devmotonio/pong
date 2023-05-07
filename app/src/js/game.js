import Paddle from './paddle.js';
import Ball from './ball.js';
import InputHandler from './input.js';

export default class Game {
  constructor(height) {
    this.canvas = document.getElementById('gameScreen');
    this.ctx = this.canvas.getContext('2d');
    this.divSide = document.getElementById('side');
    this.rank = [];
    this.speedX = 0;
    this.speedY = 0;
    this.directionX = 0;
    this.directionY = 0;

    this.canvas.width = Math.floor(window.innerWidth * 0.8);
    this.canvas.height = height;
    this.canvas.style.float = 'left';
    this.canvas.style.backgroundColor = '#000';

    this.divSide.style.float = 'left';
    this.divSide.style.textAlign = 'center';
    this.divSide.style.width = `${Math.floor(window.innerWidth * 0.16)}px`;
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
    let divRank = document.getElementById('rank');
    this.rank.push(this.currentTimer);
    this.rank.sort();
    this.rank.reverse();
    if (this.rank.length > 5) {
      this.rank.pop();
    }
    divRank.innerHTML = '';
    this.rank.forEach((timer) => {
      divRank.innerHTML += '<p>' + this.formatTimer(timer) + '</p>';
    });
    this.init();
  }

  animate() {
    this.currentTimer = new Date(new Date() - this.startTime.getTime());
    this.timer = this.formatTimer(this.currentTimer);
    document.getElementById('timer').innerHTML = this.timer;

    this.gameObjects.forEach((object) => object.animate(this.ctx));
  }

  formatTimer(timer) {
    let hour = timer.getUTCHours();
    let minute = timer.getUTCMinutes();
    let second = timer.getUTCSeconds();
    let fHour = hour < 10 ? '0' + hour : hour;//hour < 0 ? '00' : 
    let fMinute = minute < 10 ? '0' + minute : minute;
    let fSecond = second < 10 ? '0' + second : second;
    return fHour + ':' + fMinute + ':' + fSecond;
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
    requestAnimationFrame((timestamp) => {
      this.gameLoop();
    });
  }
}
