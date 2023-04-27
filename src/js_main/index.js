const GAME_WIDTH = 700;
const GAME_HEIGHT = 500;

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

game.start();

function gameLoop() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
