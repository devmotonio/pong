class InputHandler {
  constructor(paddle1, paddle2) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 38: {
          paddle1.moveUp();
          paddle2.moveUp();
          break;
        }

        case 40: {
          paddle1.moveDown();
          paddle2.moveDown();
          break;
        }
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 38: {
          if (paddle1.direction < 0) paddle1.stop();
          if (paddle2.direction < 0) paddle2.stop();
          break;
        }

        case 40: {
          if (paddle1.direction > 0) paddle1.stop();
          if (paddle2.direction > 0) paddle2.stop();
          break;
        }
      }
    });
  }
}
