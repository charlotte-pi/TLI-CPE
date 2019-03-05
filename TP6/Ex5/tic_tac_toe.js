/*Initialisation du matrice 3*3 */
var pion = new Array(3);
for (i = 0; i < 3; i++) {
  pion[i] = new Array(3);
  for (j = 0; j < 3; j++) {
    pion[i][j] = 0; //vide
  }
}

var curserPosition = {x:0, y:0};
var fini = false;
var turnX = false;
const id = document.getElementById("tic_tac_toe");
const cursorPanel = document.getElementById("cursorPanel");
const game = document.getElementById("game");
var context = id.getContext("2d");
tic_tac_toe();
drawCursor();

/*Detection du clic souris*/
game.onmousedown = function (event) {
  event = event || window.event;
  event.preventDefault();
  handleClick(this, event);
}

document.onkeydown = function (event) {
  event = event || window.event;
  event.preventDefault();
  handleKey(event);
}


function ligne(type, x, y) {
  context.strokeStyle = "#ff0000";
  context.lineWidth = 10;
  context.beginPath();
  if (type == 'horizontal') {
    context.moveTo(0, y + 100);
    context.lineTo(600, y + 100);
  }
  else if (type == 'vertical') {
    context.moveTo(x + 100, 0);
    context.lineTo(x + 100, 600);
  }
  else if (type == 'diagonal-left') {
    context.moveTo(0, 0);
    context.lineTo(600, 600);
  }
  else if (type == 'diagonal-right') {
    context.moveTo(0, 600);
    context.lineTo(600, 0);
  }
  context.closePath();
  context.stroke();
}

function lignes(x, y) {
  context.strokeStyle = "#00b33c";
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(x + 20, y + 20);
  context.lineTo(x + 180, y + 180);
  context.moveTo(x + 180, y + 20);
  context.lineTo(x + 20, y + 180);
  context.closePath();
  context.stroke();
}

function cirque(x, y) {
  context.strokeStyle = "#00b33c";
  context.lineWidth = 10;
  context.beginPath();
  context.arc(x, y, 80, 0, 2 * Math.PI);
  context.closePath();
  context.stroke();
}

function tic_tac_toe() {
  context.strokeStyle = "#ffb33c";
  context.lineWidth = 10;
  context.moveTo(0, 200);
  context.lineTo(600, 200);
  context.moveTo(0, 400);
  context.lineTo(600, 400);

  context.moveTo(200, 0);
  context.lineTo(200, 600);
  context.moveTo(400, 0);
  context.lineTo(400, 600);
  context.stroke();
}

function indiceDiagonale(indexX, indexY) {
  if ((indexX == 0 && indexY == 0) ||
    (indexX == 1 && indexY == 1) ||
    (indexX == 2 && indexY == 2) ||
    (indexX == 2 && indexY == 0) ||
    (indexX == 0 && indexY == 2)) {
    return true;
  }
  return false;
}

/*Verification*/
function verifier(indexX, indexY) {
  var milieu = false;
  if (indiceDiagonale(indexX, indexY)) {
    if (pion[indexX][indexY] == pion[0][0] &&
      pion[0][0] == pion[1][1] &&
      pion[1][1] == pion[2][2]) {
      ligne('diagonal-left', 0, 0);
      fini = true;
      return;
    }
    else if (pion[indexX][indexY] == pion[0][2] &&
      pion[0][2] == pion[1][1] &&
      pion[1][1] == pion[2][0]) {
      ligne('diagonal-right', 0, 0);
      fini = true;
      return;
    }
  }
  if (pion[indexX][indexY] == pion[0][indexY] &&
    (pion[0][indexY] == pion[1][indexY] &&
      pion[1][indexY] == pion[2][indexY])) {
    ligne('horizontal', 0, indexY * 200);
    fini = true;
    return;
  }
  if (pion[indexX][indexY] == pion[indexX][0] &&
    pion[indexX][0] == pion[indexX][1] &&
    pion[indexX][1] == pion[indexX][2]) {
    ligne('vertical', indexX * 200, 0);
    fini = true;
  }
}

/*Ajouter un pion*/
function handleClick(canvas, event) {
  if (fini) {
    return;
  }

  console.log(event);

  var posX = event.pageX - canvas.offsetLeft;
  var posY = event.pageY - canvas.offsetTop;
  var indexX = -1;
  var indexY = -1;

  if (posX < 200) {
    indexX = 0;
  }
  else if (posX >= 200 && posX < 400) {
    indexX = 1;
  }
  else if (posX >= 400 && posX < 600) {
    indexX = 2;
  }
  if (posY < 200) {
    indexY = 0;
  }
  else if (posY >= 200 && posY < 400) {
    indexY = 1;
  }
  else if (posY >= 400 && posY < 600) {
    indexY = 2;
  }

  console.log(posX + " " + posY);
  console.log(indexX + " " + indexY);
  if (indexX != -1 && indexY != -1) {
      drawSymbole(indexX, indexY);
  }
}

function drawSymbole(indexX, indexY) {
  if (pion[indexX][indexY] != 0) return;

  if (turnX) {
    lignes(indexX * 200, indexY * 200);
    turnX = false;
    pion[indexX][indexY] = 1;
  }
  else {
    cirque(indexX * 200 + 100, indexY * 200 + 100);
    turnX = true;
    pion[indexX][indexY] = 2;
  }

  verifier(indexX, indexY);
}

function handleKey(event){

  var key = event.key;

  switch(key){
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "Enter":
      drawSymbole(curserPosition.x, curserPosition.y);
  }

  drawCursor();
}

function moveDown(){
  if (curserPosition.y >= 2) return;
  curserPosition.y++
}

function moveUp(){
  if (curserPosition.y <= 0) return;
  curserPosition.y--
}

function moveRight(){
  if (curserPosition.x >= 2) return;
  curserPosition.x++
}

function moveLeft(){
  if (curserPosition.x <= 0) return;
  curserPosition.x--
}

function clearCursorPanel(){
  var context = cursorPanel.getContext('2d');
  context.clearRect(0,0, cursorPanel.width, cursorPanel.height)
}

function drawCursor(){
  clearCursorPanel()
  var context = cursorPanel.getContext('2d');
  context.beginPath();
  context.strokeStyle="blue";   
  context.lineWidth="2";
  var x = curserPosition.x;
  var y = curserPosition.y;

  context.rect(10+x*200,10+y*200,180,180);
  context.stroke();
}