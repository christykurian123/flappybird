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
let pipeX = boardWidth;
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
    context.fillStyle = "#71c0ca";
    context.fillRect(50, 300, 40, 30);
    //context.drawImage(Variable that holds the image, Image X Position, Image Y Position, Image Width, Image Height);
    context.drawImage(birdImg, 50, 300, 40, 30);
  };

  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png";
  topPipeImg.onload = function () {
    //draw top pipe
    context.drawImage(topPipeImg, 250, 0, 50, 250);
  };

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";
  bottomPipeImg.onload = function () {
    //draw bottom pipe
    context.drawImage(bottomPipeImg, 150, 379, 50, 200);
  };
};
