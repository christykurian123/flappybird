//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; //width/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

//pipes
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth / 1.5;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

let velocityX = -2; //pipes moving left speed
let velocityY = 0; //bird jump speed
let gravity = 0.4;

board = document.getElementById("board");
context = board.getContext("2d");

const RUNNING = "RUNNING";
const GAME_OVER = "GAME_OVER";

let gameState = RUNNING;

window.onload = function () {
  board.height = boardHeight;
  board.width = boardWidth;
  //load images
  birdImg = new Image();
  birdImg.src = "./flappybird.png";
  birdImg.onload = function () {
    //draw flappy bird
    //context.drawImage(Variable that holds the image, Image X Position, Image Y Position, Image Width, Image Height);
    context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
  };
  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png";
  topPipeImg.onload = function () {
    context.drawImage(topPipeImg, pipeX, pipeY, pipeWidth, pipeHeight / 2);
  };

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";
  bottomPipeImg.onload = function () {
    context.drawImage(
      bottomPipeImg,
      pipeX - 90,
      pipeY + 375,
      pipeWidth,
      pipeHeight / 2.5
    );
  };
  requestAnimationFrame(update);
  document.addEventListener("keydown", moveBird);
};

document.addEventListener("keydown", (e) => {
  if (e.key === "r" || e.key === "R") {
    if (gameState === GAME_OVER) {
      restartGame();
    }
  }
});

board.addEventListener("click", () => {
  if (gameState === GAME_OVER) {
    restartGame();
  } else if (gameState === RUNNING) {
    velocityY = -6;
  }
});

// Main game loop
function update() {
  console.log("Game updating...");
  context.clearRect(0, 0, board.width, board.height); // Clears the entire canvas
  // Updates the bird's position
  velocityY += gravity; //0 -> 0.4 -> 0.8 -> 1.2 ...
  birdY += velocityY;
  pipeX += velocityX; //move pipe to left

  birdY = Math.max(0, Math.min(birdY, boardHeight - birdHeight));
  drawBird();
  drawTopPipe();
  drawBottomPipe();
  if (
    gameState === RUNNING &&
    (birdY === 0 || birdY === boardHeight - birdHeight)
  ) {
    gameState = GAME_OVER;
  } else if (gameState === GAME_OVER) {
    console.log("gameState: " + gameState);
    drawGameOver();
  }
  requestAnimationFrame(update);
}

function drawBird() {
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
}

function drawTopPipe() {
  context.drawImage(topPipeImg, pipeX, pipeY, pipeWidth, pipeHeight / 2);
}

function drawBottomPipe() {
  context.drawImage(
    bottomPipeImg,
    pipeX,
    pipeY + 375,
    pipeWidth,
    pipeHeight / 2.5
  );
}

function moveBird(e) {
  if (
    gameState === RUNNING &&
    (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX")
  ) {
    console.log("inside moveBird If loop");
    velocityY = -6; //jump
  }
}

function drawGameOver() {
  context.clearRect(0, 0, board.width, board.height);
  drawBird();
  context.fillStyle = "White";
  context.font = "40px Arial";
  context.textAlign = "center";
  context.fillText("GAME OVER", boardWidth / 2, board.height / 2);

  context.font = "17px Arial";
  context.fillText(
    "Press R or Click to Restart",
    boardWidth / 2,
    board.height / 2 + 40
  );
}

function restartGame() {
  console.log("Inside restartGame");
  birdY = 150;
  velocityY = 0;
  pipeX = boardWidth;
  gameState = RUNNING;
}
