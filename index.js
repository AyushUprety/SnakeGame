const canvas = document.getElementById("snakecanva");
const canva = canvas.getContext("2d");
let speed = 7;

function startGame() {
  setScreen();
  setTimeout(startGame, 1000 / speed); // Rerender the screen 7 times a second
}
function setScreen() {
  canva.fillStyle = "Brown"; //make screen brown
  canva.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}
