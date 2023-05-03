const canvas = document.getElementById("snakecanva");
const canva = canvas.getContext("2d");
let speed = 7;
let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;
let xSpeed = 0;
let ySpeed = 0;
let foodAtX = 5;
let foodAtY = 5;
const snakeParts = [];
let tailLength = 2;

function startGame() {
  setScreen();
  drawSnake();
  changePosition();
  drawFood();
  setTimeout(startGame, 1000 / speed); // Rerender the screen 7 times a second
}
function setScreen() {
  canva.fillStyle = "Brown"; //Give any shape from this point the color of brown.
  canva.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight); // xposition yposition
}
function drawSnake() {
  canva.fillStyle = "orange"; // tells the canva to fill the shape color to orange after any shapes you draw from this point.
  canva.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize); //x,y,width and height
}
startGame();

document.body.addEventListener("keydown", keyDown);

function keyDown() {
  if (Event.keycode == 38) {
    // move in up direction
    if (ySpeed == 1) return;
    ySpeed = -1;
    xSpeed = 0;
  }
  if (Event.keycode == 40) {
    // move in down direction
    if (ySpeed == -1) return;
    ySpeed = 1;
    xSpeed = 0;
  }
  if (Event.keycode == 37) {
    // move in left direction
    if ((xSpeed = 1)) return;
    ySpeed = 0;
    xSpeed = -1;
  }
  if (Event.keycode == 39) {
    // move in right direction
    if (speed == -1) return;
    ySpeed = 0;
    xSpeed = 0;
  }
}
function changePosition() {
  headX = headX + xSpeed;
  headY = headY + ySpeed;
}
// Code to draw and establish the position of food
function drawFood() {
  canva.fillStyle = "blue";
  canva.fillRect(foodAtX * tileCount, foodAtY * tileCount, tileSize, tileSize);
}
//Incorporate food and score

function eatFood() {
  // function to make sure food is not generated at same place as the snake
  if (foodAtX == headX && foodAtY == headY) {
    foodAtX = Math.floor(Math.random() * tileCount);
    foodAtY = Math.floor(Math.random() * tileCount);
    tailLength++;
  }
}
//Make a prototype to make new parts in efficient manner
class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
function drawSnake() {
  canva.fillStyle = "blue";
  for (let i = 0; i < snakePart.length; i++) {
    let part = snakeParts[i];
    canva.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  //append parts to snakeParts
  snakeParts.push(new snakePart(headX, headY)); // append an item to end of the array
}
//score will be incremented along with the tail of the snake.
function drawScore() {
  abc.fillStyle = "black"; // set our text color to white
  abc.font = "12px verdena"; // font size to 12px
  abc.fillText("Score: " + score, canvas.clientWidth - 50, 10); // position our score at right hand corner
}
function eatFood() {
  if (foodAtX == headX && foodAtY == headY) {
    foodAtX = Math.floor(Math.random() * tileCount);
    foodAtY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++; //increase our score value
  }
}
// isGameOver() method to be invoked after the game becomes over
function isGameOver() {
  let gameisOver = false;
  //check if the game has begun
  if (ySpeed === 0 && xSpeed === 0) {
    return false;
  }
  if (headX < 0) {
    //condition if snake collides with the left wall
    gameisOver = true;
  } else if (headX === tileCount) {
    // condition if snake collides with the right wall
    gameisOver = true;
  } else if (headY < 0) {
    //if snake collides with wall at the top
    gameisOver = true;
  } else if (headY === tileCount) {
    //if snake collides with the wall at the bottom
    gameisOver = true;
  }

  //condition for collision with its own body

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      //check whether any part of the snake is occupying the same space
      gameisOver = true;
      break; // to break out of for loop
    }
  }

  return gameisOver; //Game execution will be terminated
}
