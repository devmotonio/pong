export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 38: {
          event.preventDefault();
          game.paddleL.moveUp();
          game.paddleR.moveUp();
          break;
        }

        case 40: {
          event.preventDefault();
          game.paddleL.moveDown();
          game.paddleR.moveDown();
          break;
        }
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 38: {
          event.preventDefault();
          if (game.paddleL.direction < 0) game.paddleL.stop();
          if (game.paddleR.direction < 0) game.paddleR.stop();
          break;
        }

        case 40: {
          event.preventDefault();
          if (game.paddleL.direction > 0) game.paddleL.stop();
          if (game.paddleR.direction > 0) game.paddleR.stop();
          break;
        }
      }
    });

    game.canvas.addEventListener("click", (event) => {
      if (!game.isPlay) game.play();
    });
  }
}
