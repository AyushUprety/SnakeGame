const canvas = document.getElementById("snakecanva");
const canva = canvas.getContext("2d");
let speed = 7;
let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;
let xSpeed = 0;
let ySpeed = 0;

function startGame() {
  setScreen();
  setTimeout(startGame, 1000 / speed); // Rerender the screen 7 times a second
  drawSnake();
  changePosition();
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
