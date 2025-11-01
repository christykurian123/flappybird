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

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d"); //used for drawing on the board

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
    //draw top pipe
    context.drawImage(topPipeImg, pipeX, pipeY, pipeWidth, pipeHeight / 2);
  };

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";
  bottomPipeImg.onload = function () {
    //draw bottom pipe
    context.drawImage(
      bottomPipeImg,
      pipeX - 90,
      pipeY + 375,
      pipeWidth,
      pipeHeight / 2.5
    );
  };
  requestAnimationFrame(update);
};

function drawBird() {
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
}

function handleKeyDown(event) {
  if (event.code === "Space") {
    console.log("inside handleKeyDown If loop");
    birdY = birdY - 50;
  }
}

document.addEventListener("keydown", handleKeyDown);

// Main game loop
function update() {
  console.log("Game updating...");

  // Clears the entire canvas
  context.clearRect(0, 0, board.width, board.height);

  // Updates the bird's position
  birdY = birdY + 1; // Gravity effect: bird falls down each frame

  // Draws the bird at its new position

  drawBird();
  requestAnimationFrame(update);
}
