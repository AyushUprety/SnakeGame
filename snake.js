// get the canvas element and its context
const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

// define the size of each box in the game
const boxSize = 32;

// load images
const groundImage = new Image();
groundImage.src = "img/ground.png";

const foodImage = new Image();
foodImage.src = "img/food.png";

const congratsImage = new Image();
congratsImage.src = "img/congrats.png";

// load audio files
let deadSound = new Audio();
let eatSound = new Audio();
let upSound = new Audio();
let rightSound = new Audio();
let leftSound = new Audio();
let downSound = new Audio();

deadSound.src = "audio/dead.mp3";
eatSound.src = "audio/eat.mp3";
upSound.src = "audio/up.mp3";
rightSound.src = "audio/right.mp3";
leftSound.src = "audio/left.mp3";
downSound.src = "audio/down.mp3";

// initialize the snake
let snakeArray = [];
snakeArray[0] = {
  x: 9 * boxSize,
  y: 10 * boxSize,
};

// initialize the food
let foodObject = {
  x: Math.floor(Math.random() * 17 + 1) * boxSize,
  y: Math.floor(Math.random() * 15 + 3) * boxSize,
};

// initialize the score and a link to a website
let currentScore = 0;
let websiteLink = "https://meet.google.com/idb-cdem-rty";

// initialize some variables for keeping track of game state
let iteration = 0;
let isGameFinished = false;

// initialize the direction of the snake
let direction;

// listen for keyboard input to change the direction of the snake
document.addEventListener("keydown", updateDirection);

function updateDirection(event) {
  let key = event.keyCode;
  if (key == 37 && direction != "RIGHT") {
    leftSound.play();
    direction = "LEFT";
  } else if (key == 38 && direction != "DOWN") {
    direction = "UP";
    upSound.play();
  } else if (key == 39 && direction != "LEFT") {
    direction = "RIGHT";
    rightSound.play();
  } else if (key == 40 && direction != "UP") {
    direction = "DOWN";
    downSound.play();
  }
}

// check if the snake collides with itself or the walls
function checkCollision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

// function for handling game over
function endGame() {
  clearInterval(game);
  context.drawImage(congratsImage, 0, 0);
  isGameFinished = true;
}

// draw everything to the canvas
function draw() {
  context.drawImage(groundImage, 0, 0);

  // draw the snake
  for (let i = 0; i < snakeArray.length; i++) {
    context.fillStyle = i == 0 ? "green" : "white";
    context.fillRect(snakeArray[i].x, snakeArray[i].y, boxSize, boxSize);

    context.strokeStyle = "red";
    context.strokeRect(snakeArray[i].x, snakeArray[i].y, boxSize, boxSize);
  }

  // draw the food
  context.drawImage(foodImage, foodObject.x, foodObject.y);

  // calculate the position of the snake's head
  let snakeHeadX = snakeArray[0].x;
  let snakeHeadY = snakeArray[0].y;

  // move the snake's head based on the current direction
  if (direction == "LEFT") snakeHeadX -= boxSize;
  if (direction == "UP") snakeHeadY -= boxSize;
  if (direction == "RIGHT") snakeHeadX += boxSize;
  if (direction == "DOWN") snakeHeadY += boxSize;

  let start = 0;
  let end = 0;

  // check if the snake eats the food
  if (snakeHeadX == foodObject.x && snakeHeadY == foodObject.y) {
    currentScore++;
    eatSound.play();
    foodObject = {
      x: Math.floor(Math.random() * 17 + 1) * boxSize,
      y: Math.floor(Math.random() * 15 + 3) * boxSize,
    };
  } else {
    // remove the tail if the snake doesn't eat the food
    snakeArray.pop();
  }

  // add the new head to the snake
  let newHead = {
    x: snakeHeadX,
    y: snakeHeadY,
  };

  // check if the game is over
  if (
    snakeHeadX < boxSize ||
    snakeHeadX > 17 * boxSize ||
    snakeHeadY < 3 * boxSize ||
    snakeHeadY > 17 * boxSize ||
    checkCollision(newHead, snakeArray)
  ) {
    clearInterval(game);
    deadSound.play();
  }

  // add the new head to the beginning of the snake array
  snakeArray.unshift(newHead);

  // draw the score on the canvas
  context.fillStyle = isGameFinished ? "green" : "white";
  context.font = "45px Changa one";
  context.fillText(currentScore, 2 * boxSize, 1.6 * boxSize);
}

// function for changing the direction of the snake (used by external controls)
setDirection = function (dir) {
  if (dir == "left") {
    leftSound.play();
    direction = "LEFT";
  }
  if (dir == "right") {
    direction = "RIGHT";
    rightSound.play();
  }
  if (dir == "up") {
    direction = "UP";
    upSound.play();
  }
  if (dir == "down") {
    direction = "DOWN";
    downSound.play();
  }
};

// main game loop
let game = setInterval(draw, 100);
