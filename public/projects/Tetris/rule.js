var running = false;
var timeBackup = 0;
var timeStampBackup = 0;
var speed = 64;
var speedMultiplyer = 48;
var playPiece;
var next1PlayPiece;
var next2PlayPiece;
var next3PlayPiece;
var field = [];
var playPieceShape = [];
var next1PlayPieceShape = [];
var next2PlayPieceShape = [];
var next3PlayPieceShape = [];
var level = 0;
var points = 0;
var lines = 0;
var alreadySpawned = "";

const OPTIONS = 'oiszljt';
const GREY = 'rgb(40,40,40)';
const ERROR = 'rgb(155,155,155)';
const CYAN = 'rgb(000,240,240)';
const BLUE = 'rgb(000,000,240)';
const ORANGE = 'rgb(240,160,000)';
const YELLOW = 'rgb(240,240,000)';
const GREEN = 'rgb(000,160,000)';
const PURPLE = 'rgb(160,000,240)';
const RED = 'rgb(240,000,000)';

const squaresize = 39;
const squarepadd = 1;
const squaretotl = squaresize + squarepadd;
const unit = 'px';

window.onload = function init() {
  start(0, 0);
}

function render(timestamp, previousTimestamp) {
  timeBackup = timestamp;

  if (timestamp - previousTimestamp > speed * speedMultiplyer) {
    timeStampBackup = timestamp;
    tick();
  }

  window.requestAnimFrame(function (time) {
    if (running) render(time, timeStampBackup);
  });
}

function tick() {
  if (playPiece != null) {
    if (!check(0, 1, playPieceShape)) {
      playPiece.y = parseInt(playPiece.y) + 1;
    } else {
      for (var i = 0; i < playPieceShape.length; i++) {
        for (var j = 0; j < playPieceShape.length; j++) {
          if(parseInt(playPiece.y) + i < 0) {
            running = false;
            console.log("reee");
            document.body.style.backgroundColor = 'white';
            //todo if this is called, game over

          } else {
            if (playPieceShape[i][j] == 1) {
              field[parseInt(playPiece.y) + i][parseInt(playPiece.x) + j] = parseInt(playPiece.c);
            }
          }
        }
      }
      var linefull = true;
      var linecounter = 0;
      for (var k = field.length - 2; k > 0; k--) {
        linefull = true;
        for (var l = 0; l < field[k].length; l++) {
          if (field[k][l] < 1) {
            linefull = false;
            l = 999;
          }
        }
        if (linefull) {
          deleteLine(k);
          k++;
          linecounter++;
          lines++;
        }
      }
      

      /*
      if(lve > 9) {
        if (level >= 10 && level <= 12) speedMultiplyer = 5;
        if (level >= 13 && level <= 15) speedMultiplyer = 4;
        if (level >= 16 && level <= 18) speedMultiplyer = 3;
        if (level >= 19 && level <= 28) speedMultiplyer = 2;
        if (level >= 29) speedMultiplyer = 1;
      } else {
        switch (key) {
          case value:
            
            break;
        
          default:
            break;
        }
      }

      if (level == 0) speedMultiplyer = 48;
      if (level == 1) speedMultiplyer = 43;
      if (level == 2) speedMultiplyer = 38;
      if (level == 3) speedMultiplyer = 33;
      if (level == 4) speedMultiplyer = 28;
      if (level == 5) speedMultiplyer = 23;
      if (level == 6) speedMultiplyer = 18;
      if (level == 7) speedMultiplyer = 13;
      if (level == 8) speedMultiplyer = 8;
      if (level == 9) speedMultiplyer = 6;*/

      level = parseInt(lines / 10) + 1;

      if (level == 0) speedMultiplyer = 48;
      if (level == 1) speedMultiplyer = 43;
      if (level == 2) speedMultiplyer = 38;
      if (level == 3) speedMultiplyer = 33;
      if (level == 4) speedMultiplyer = 28;
      if (level == 5) speedMultiplyer = 23;
      if (level == 6) speedMultiplyer = 18;
      if (level == 7) speedMultiplyer = 13;
      if (level == 8) speedMultiplyer = 8;
      if (level == 9) speedMultiplyer = 6;
      if (level >= 10 && level <= 12) speedMultiplyer = 5;
      if (level >= 13 && level <= 15) speedMultiplyer = 4;
      if (level >= 16 && level <= 18) speedMultiplyer = 3;
      if (level >= 19 && level <= 28) speedMultiplyer = 2;
      if (level >= 29) speedMultiplyer = 1;

      if (linecounter == 1) points += 40 * (level + 1);
      if (linecounter == 2) points += 100 * (level + 1);
      if (linecounter == 3) points += 300 * (level + 1);
      if (linecounter == 4) points += 1200 * (level + 1);
      spawnRandomPiece();
    }
    drawObjects();
  }
}

function deleteLine(line) {
  for (var i = line; i > 0; i--) {
    for (var j = 0; j < field[i].length; j++) {
      field[i][j] = field[i - 1][j];
    }
  }
  for (var j = 0; j < field[0].length; j++) {
    field[0][j] = 0;
  }
}

function spawnRandomPiece() {
  if(alreadySpawned.length >= OPTIONS.length) alreadySpawned = "";

  var opt = "";
  for(var i = 0; i < OPTIONS.length; i++) {
    if(!alreadySpawned.includes(OPTIONS.charAt(i))) opt += OPTIONS.charAt(i);
  }

  var letter = "i";
  letter = opt.charAt(Math.random(1) * opt.length);
  spawnPiece(letter);
  alreadySpawned += letter;
}

function drawObjects() {
  //draw Movable Piece
  var canvastop = document.getElementById('canvastop');
  canvastop.innerHTML = '';
  for (var i = 0; i < playPieceShape.length; i++) {
    for (var j = 0; j < playPieceShape.length; j++) {
      if (playPieceShape[i][j] == 1) {
        var square = generateSquareAbs(numberToColor(playPiece.c));
        square.style.marginLeft = '' + ((parseInt(playPiece.x) + j) * squaretotl) + unit;
        square.style.marginTop = '' + ((parseInt(playPiece.y) + i) * squaretotl) + unit;
        canvastop.appendChild(square);
      }
    }
  }
  //draw movable piece at the bottom
  var distance = -2;

  for (var i = 0; i < field.length - parseInt(playPiece.y); i++) {
    if (!check(0, i - 1, playPieceShape)) {
      distance++;
    } else {
      i = 999;
    }
  }

  for (var i = 0; i < playPieceShape.length; i++) {
    for (var j = 0; j < playPieceShape.length; j++) {
      if (playPieceShape[i][j] == 1) {
        var square = generateSquareAbs(numberToColor(playPiece.c));
        square.style.marginLeft = '' + ((parseInt(playPiece.x) + j) * squaretotl) + unit;
        square.style.marginTop = '' + ((parseInt(playPiece.y) + i + distance) * squaretotl) + unit;
        square.style.boxSizing = 'border-box';
        square.style.borderStyle = 'solid';
        square.style.borderWidth = '4px';
        square.style.borderTopColor = 'rgba(255, 255, 255, 0.1)';
        square.style.borderLeftColor = 'rgba(0, 0, 0, 0.2)';
        square.style.borderRightColor = 'rgba(0, 0, 0, 0.2)';
        square.style.borderBottomColor = 'rgba(0, 0, 0, 0.5)';
        square.style.backgroundColor = 'rgba' + square.style.backgroundColor.slice(3, -1) + ',0.2)';

        canvastop.appendChild(square);
      }
    }
  }

  //draw next three pieces
  var p1 = generatePiece(next1PlayPiece.type);
  var p2 = generatePiece(next2PlayPiece.type);
  var p3 = generatePiece(next3PlayPiece.type);

  //draw example pieces
  if (p1.style != null && p2.style != null && p3.style != null) {
    p1.style.marginTop = "16vh";
    p2.style.marginTop = "8vh";
    p3.style.marginTop = "8vh";
    p1.style.position = "relative";
    p2.style.position = "relative";
    p3.style.position = "relative";

    var canvasnext = document.getElementById('canvasnext');
    canvasnext.innerHTML = '';
    canvasnext.appendChild(p1);
    canvasnext.appendChild(p2);
    canvasnext.appendChild(p3);
  }

  //draw points and level
  document.getElementById('lvl').innerHTML = 'Level: ' + level;
  document.getElementById('pts').innerHTML = 'Points: ' + points;

  //draw field
  var canvas = document.getElementById('canvas');
  canvas.innerHTML = '';
  for (var i = 0; i < field.length; i++) {
    for (var j = 0; j <= field[i].length - 1; j++) {
      if (field[i][j] != 0) {
        var square = generateSquareAbs(numberToColor(field[i][j]));

        square.style.marginLeft = '' + ((j) * squaretotl) + unit;
        square.style.marginTop = '' + ((i) * squaretotl) + unit;
        canvas.appendChild(square);
      }

    }
  }

  //draw borders
  for (var i = 0; i <= 20; i++) {
    //left
    var square = generateSquareAbs(GREY);
    square.style.marginLeft = '' + ((-1) * squaretotl) + unit;
    square.style.marginTop = '' + ((i) * squaretotl) + unit;
    canvas.appendChild(square);

    //right
    var square = generateSquareAbs(GREY);
    square.style.marginLeft = '' + ((10) * squaretotl) + unit;
    square.style.marginTop = '' + ((i) * squaretotl) + unit;
    canvas.appendChild(square);

    for (var j = -1; j <= 10; j++) {
      //bottom
      if (i == 20) {
        square = generateSquareAbs(GREY);
        square.style.marginLeft = '' + ((j) * squaretotl) + unit;
        square.style.marginTop = '' + ((i) * squaretotl) + unit;
        canvas.appendChild(square);
      }
    }
  }
}

function numberToColor(number) {
  if (number == 0) return;
  if (number == 1) return GREY;
  if (number == 2) return YELLOW;
  if (number == 3) return CYAN;
  if (number == 4) return GREEN;
  if (number == 5) return RED;
  if (number == 6) return ORANGE;
  if (number == 7) return BLUE;
  if (number == 8) return PURPLE;
  if (number == -1) return ERROR;

  return GREY;
}

function check(offsetX, offsetY, ppS) {
  if (ppS != null) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if(parseInt(playPiece.x) + j + offsetX < -1 ) {
          console.log('faggot');
        }
        if (ppS[i][j] == 1 &&
          parseInt(playPiece.y) + i + offsetY >= 0 &&
          parseInt(playPiece.x) + j + offsetX >= 0 &&
          parseInt(playPiece.y) + i + offsetY < field.length &&
          parseInt(playPiece.x) + j + offsetX < field[i].length) {

          if (field[parseInt(playPiece.y) + i + offsetY][parseInt(playPiece.x) + j + offsetX] > 0) {
            return true;
          }
        }
      }
    }
  }
  return false;
}


function start() {
  running = true;
  mode = 'play';

  generateField();

  spawnRandomPiece();
  spawnRandomPiece();
  spawnRandomPiece();
  spawnRandomPiece();

  generateLines();

  var exO = generatePiece('o');
  var exI = generatePiece('i');
  var exS = generatePiece('s');
  var exZ = generatePiece('z');
  var exL = generatePiece('l');
  var exJ = generatePiece('j');
  var exT = generatePiece('t');

  exO.style.marginLeft = "5vw";
  exI.style.marginLeft = "5vw";
  exS.style.marginLeft = "5vw";
  exZ.style.marginLeft = "5vw";
  exL.style.marginLeft = "5vw";
  exJ.style.marginLeft = "5vw";
  exT.style.marginLeft = "5vw";

  /*
  var examples = document.getElementById('examples');
 
  examples.appendChild(exO);
  examples.appendChild(exI);
  examples.appendChild(exS);
  examples.appendChild(exZ);
  examples.appendChild(exL);
  examples.appendChild(exJ);
  examples.appendChild(exT);*/

  //controls
  document.addEventListener("keydown", (event) => {
    if (event.keyCode === 38) {
      if (!check(0, 0, rotate()) && !checkBounds(false, false, true, rotate())) playPieceShape = rotate();
      drawObjects();
    }
    if (event.keyCode === 40) {
      timeStampBackup = 0;
      points++;
      drawObjects();
    }
    if (event.keyCode === 37) {
      if (!check(-1, 0, playPieceShape) && !checkBounds(true, false, false, playPieceShape)) playPiece.x = parseInt(playPiece.x) - 1;
      drawObjects();
    }
    if (event.keyCode === 39) {
      if (!check(1, 0, playPieceShape) && !checkBounds(false, true, false, playPieceShape)) playPiece.x = parseInt(playPiece.x) + 1;
      drawObjects();
    }
    if (event.keyCode === 32) {
      var distance = -2;
      for (var i = 0; i < field.length - parseInt(playPiece.y); i++) {
        if (!check(0, i - 1, playPieceShape)) distance++;
        else i = 999;
      }
      playPiece.y = parseInt(playPiece.y) + distance;
      timeStampBackup = 0;
      drawObjects();
    }
  });

  document.onkeydown = function (e) {
    return false;
  }

  document.addEventListener("keyup", (event) => {
    if (event.keyCode === 38) { up = false; }
    if (event.keyCode === 40) { down = false; }
    if (event.keyCode === 37) { left = false; }
    if (event.keyCode === 39) { right = false; }
  });

  tick();

  window.requestAnimFrame(function (time) {
    if (running) render(timeStampBackup, time);
  });
}

function checkBounds(left, right, rotate, ppS) {
  if (ppS != null) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (ppS[j][i] == 1) {
          if (rotate) {
            if (parseInt(playPiece.x) + i < 0) return true;
            if (parseInt(playPiece.x) + i > 9) return true;
          }
          if (left && parseInt(playPiece.x) + i < 1) return true;
          if (right && parseInt(playPiece.x) + i > 8) return true;
        }
      }
    }
  }
  return false;
}

function rotate() {
  var temp = [];
  var output = [];
  var row = [];
  var row2 = [];

  for (var i = 0; i < 4; i++) {
    row = [];
    row2 = [];
    for (var j = 0; j < 4; j++) {
      row.push(playPieceShape[i][j]);
      row2.push(0);
    }
    temp.push(row);
    output.push(row2);
  }

  if (playPiece.type == 'i' || playPiece.type == 'o') {
    for (var i = 0; i < 4; i++) {
      for (var j = 3; j >= 0; j--) {
        output[i][j] = temp[j][playPieceShape.length - i - 1];
      }
    }
  } else {
    for (var i = 0; i < 3; i++) {
      for (var j = 2; j >= 0; j--) {
        output[i][j] = temp[j][playPieceShape.length - i - 2];
      }
    }
  }

  return output;
}

function generateField() {
  var row = [];
  for (var i = 0; i < 20; i++) {
    row = [];
    for (var j = 0; j < 10; j++) {
      row.push(0);
    }
    field.push(row);
  }

  row = [];
  for (var i = 0; i < 10; i++) {
    row.push(1);
  }
  field.push(row);
}

function logField() {
  console.log('FIELD: ');
  for (var i = 0; i < field.length; i++) {
    var row = field[i];
    console.log('' + row[0] + row[1] + row[2] + row[3] + row[4] + row[5] + row[6] + row[7] + row[8]);
  }
}

function spawnPiece(shape) {
  playPiece = next1PlayPiece;
  next1PlayPiece = next2PlayPiece;
  next2PlayPiece = next3PlayPiece;
  next3PlayPiece = document.createElement('div');

  if (playPiece == null) { playPieceShape = generateShape(shape); } else { playPieceShape = generateShape(playPiece.type); }

  switch (shape) {
    case 'o':
      next3PlayPiece.color = YELLOW;
      next3PlayPiece.c = '2';
      break;
    case 'i':
      next3PlayPiece.color = CYAN;
      next3PlayPiece.c = '3';
      break;
    case 's':
      next3PlayPiece.color = GREEN;
      next3PlayPiece.c = '4';
      break;
    case 'z':
      next3PlayPiece.color = RED;
      next3PlayPiece.c = '5';
      break;
    case 'l':
      next3PlayPiece.color = ORANGE;
      next3PlayPiece.c = '6';
      break;
    case 'j':
      next3PlayPiece.color = BLUE;
      next3PlayPiece.c = '7';
      break;
    case 't':
      next3PlayPiece.color = PURPLE;
      next3PlayPiece.c = '8';
      break;
    default:
      console.log('no shape given');
  }

  next3PlayPiece.type = shape;
  next3PlayPiece.x = '3';
  next3PlayPiece.y = '-1';
  next3PlayPiece.rot = '0';
}

function generateShape(shape) {
  var output = [];
  var row = [];
  switch (shape) {
    case 'o':
      output.push([0, 0, 0, 0]);
      output.push([0, 1, 1, 0]);
      output.push([0, 1, 1, 0]);
      output.push([0, 0, 0, 0]);
      break;
    case 'i':
      output.push([0, 0, 0, 0]);
      output.push([1, 1, 1, 1]);
      output.push([0, 0, 0, 0]);
      output.push([0, 0, 0, 0]);
      break;
    case 's':
      output.push([0, 1, 1, 0]);
      output.push([1, 1, 0, 0]);
      output.push([0, 0, 0, 0]);
      output.push([0, 0, 0, 0]);
      break;
    case 'z':
      output.push([1, 1, 0, 0]);
      output.push([0, 1, 1, 0]);
      output.push([0, 0, 0, 0]);
      output.push([0, 0, 0, 0]);
      break;
    case 'l':
      output.push([1, 0, 0, 0]);
      output.push([1, 1, 1, 0]);
      output.push([0, 0, 0, 0]);
      output.push([0, 0, 0, 0]);
      break;
    case 'j':
      output.push([0, 0, 1, 0]);
      output.push([1, 1, 1, 0]);
      output.push([0, 0, 0, 0]);
      output.push([0, 0, 0, 0]);
      break;
    case 't':
      output.push([0, 1, 0, 0]);
      output.push([1, 1, 1, 0]);
      output.push([0, 0, 0, 0]);
      output.push([0, 0, 0, 0]);
      break;
    default:
      console.log('no shape given');
  }
  return output;
}

function generatePiece(shape) {
  switch (shape) {
    case 'o':
      var piece = document.createElement('div');

      var square1 = generateSquare(YELLOW);
      var square2 = generateSquare(YELLOW);
      var square3 = generateSquare(YELLOW);
      var square4 = generateSquare(YELLOW);

      square2.style.marginTop = '' + (-squaresize) + unit;
      square2.style.marginLeft = '' + (squaretotl) + unit;
      square3.style.marginTop = '' + (squarepadd) + unit;
      square4.style.marginTop = '' + (-squaresize) + unit;
      square4.style.marginLeft = '' + (squaretotl) + unit;

      piece.appendChild(square1);
      piece.appendChild(square2);
      piece.appendChild(square3);
      piece.appendChild(square4);

      return piece;
      break;
    case 'i':
      var piece = document.createElement('div');

      var square1 = generateSquare(CYAN);
      var square2 = generateSquare(CYAN);
      var square3 = generateSquare(CYAN);
      var square4 = generateSquare(CYAN);

      square2.style.marginTop = '' + (squarepadd) + unit;
      square3.style.marginTop = '' + (squarepadd) + unit;
      square4.style.marginTop = '' + (squarepadd) + unit;

      piece.appendChild(square1);
      piece.appendChild(square2);
      piece.appendChild(square3);
      piece.appendChild(square4);

      return piece;
      break;
    case 's':
      var piece = document.createElement('div');

      var square1 = generateSquare(GREEN);
      var square2 = generateSquare(GREEN);
      var square3 = generateSquare(GREEN);
      var square4 = generateSquare(GREEN);

      square1.style.marginTop = '' + (squaretotl) + unit;
      square2.style.marginTop = '' + (-squaresize) + unit;
      square2.style.marginLeft = '' + (squaretotl) + unit;
      square3.style.marginTop = '' + (-2 * squaresize - squarepadd) + unit;
      square3.style.marginLeft = '' + (squaretotl) + unit;
      square4.style.marginTop = '' + (-squaresize) + unit;
      square4.style.marginLeft = '' + (2 * squaresize + 2 * squarepadd) + unit;

      piece.appendChild(square1);
      piece.appendChild(square2);
      piece.appendChild(square3);
      piece.appendChild(square4);

      return piece;
      break;
    case 'z':
      var piece = document.createElement('div');

      var square1 = generateSquare(RED);
      var square2 = generateSquare(RED);
      var square3 = generateSquare(RED);
      var square4 = generateSquare(RED);

      square2.style.marginTop = '' + (-squaresize) + unit;
      square2.style.marginLeft = '' + (squaretotl) + unit;
      square3.style.marginTop = '' + (squarepadd) + unit;
      square3.style.marginLeft = '' + (squaretotl) + unit;
      square4.style.marginTop = '' + (-squaresize) + unit;
      square4.style.marginLeft = '' + (2 * squaresize + 2 * squarepadd) + unit;

      piece.appendChild(square1);
      piece.appendChild(square2);
      piece.appendChild(square3);
      piece.appendChild(square4);

      return piece;
      break;
    case 'l':
      var piece = document.createElement('div');

      var square1 = generateSquare(ORANGE);
      var square2 = generateSquare(ORANGE);
      var square3 = generateSquare(ORANGE);
      var square4 = generateSquare(ORANGE);

      square2.style.marginTop = '' + (squarepadd) + unit;
      square3.style.marginTop = '' + (squarepadd) + unit;
      square4.style.marginTop = '' + (-squaresize) + unit;
      square4.style.marginLeft = '' + (squaretotl) + unit;

      piece.appendChild(square1);
      piece.appendChild(square2);
      piece.appendChild(square3);
      piece.appendChild(square4);

      return piece;
      break;
    case 'j':
      var piece = document.createElement('div');

      var square1 = generateSquare(BLUE);
      var square2 = generateSquare(BLUE);
      var square3 = generateSquare(BLUE);
      var square4 = generateSquare(BLUE);

      square1.style.marginLeft = '' + (squaretotl) + unit;
      square2.style.marginTop = '' + (squarepadd) + unit;
      square2.style.marginLeft = '' + (squaretotl) + unit;
      square3.style.marginTop = '' + (squarepadd) + unit;
      square3.style.marginLeft = '' + (squaretotl) + unit;
      square4.style.marginTop = '' + (-squaresize) + unit;

      piece.appendChild(square1);
      piece.appendChild(square2);
      piece.appendChild(square3);
      piece.appendChild(square4);

      return piece;
      break;
    case 't':
      var piece = document.createElement('div');

      var square1 = generateSquare(PURPLE);
      var square2 = generateSquare(PURPLE);
      var square3 = generateSquare(PURPLE);
      var square4 = generateSquare(PURPLE);

      square2.style.marginTop = '' + (-squaresize) + unit;
      square2.style.marginLeft = '' + (squaretotl) + unit;
      square3.style.marginTop = '' + (-squaresize) + unit;
      square3.style.marginLeft = '' + (2 * squaresize + 2 * squarepadd) + unit;
      square4.style.marginTop = '' + (squarepadd) + unit;
      square4.style.marginLeft = '' + (squaretotl) + unit;

      piece.appendChild(square1);
      piece.appendChild(square2);
      piece.appendChild(square3);
      piece.appendChild(square4);

      return piece;
      break;
    default:
      console.log('no shape given');
  }
}

function generateLines() {
  var lines = document.getElementById('linesHorizontal');
  for (var i = 0; i < 19; i++) {
    var line = document.createElement('div');
    line.style.borderStyle = 'solid';
    line.style.borderColor = 'rgb(0, 0, 0)';
    line.style.borderBottomColor = 'rgb(10, 10, 10)';
    line.style.borderWidth = '1px';
    line.style.width = '100%';
    line.style.height = '' + (squaretotl - 2) + unit;

    lines.appendChild(line);
  }
  var lines = document.getElementById('linesVertical');
  for (var i = 0; i < 9; i++) {
    var line = document.createElement('div');
    line.style.borderStyle = 'solid';
    line.style.borderColor = 'rgb(0, 0, 0)';
    line.style.borderRightColor = 'rgb(10, 10, 10)';
    line.style.borderWidth = '1px';
    line.style.width = '' + (squaretotl - 2) + unit;
    line.style.height = '100%';

    lines.appendChild(line);
  }
}

function generateSquare(color) {
  var square = document.createElement('div');
  square.style.width = '' + squaresize + unit;
  square.style.height = '' + squaresize + unit;
  square.style.backgroundColor = color;
  square.style.position = 'relative';
  square.style.boxSizing = 'border-box';
  square.style.borderStyle = 'solid';
  square.style.borderWidth = '4px';
  square.style.borderTopColor = 'rgba(255, 255, 255, 0.5)';
  square.style.borderLeftColor = 'rgba(0, 0, 0, 0.2)';
  square.style.borderRightColor = 'rgba(0, 0, 0, 0.2)';
  square.style.borderBottomColor = 'rgba(0, 0, 0, 0.5)';

  return square;
}

function generateSquareAbs(color) {
  var square = document.createElement('div');
  square.style.width = '' + squaresize + unit;
  square.style.height = '' + squaresize + unit;
  square.style.backgroundColor = color;
  square.style.position = 'absolute';
  square.style.boxSizing = 'border-box';
  square.style.borderStyle = 'solid';
  square.style.borderWidth = '4px';
  square.style.borderTopColor = 'rgba(255, 255, 255, 0.5)';
  square.style.borderLeftColor = 'rgba(0, 0, 0, 0.2)';
  square.style.borderRightColor = 'rgba(0, 0, 0, 0.2)';
  square.style.borderBottomColor = 'rgba(0, 0, 0, 0.5)';

  return square;
}

function equalStrings(str1, str2) {
  if (str1.length != str2.length) { return false; }

  for (var i = 0; i < str1.length; i++) {
    if (str1.charAt(i) != str2.charAt(i)) { return false; }
  }
  return true;
}

Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback, element) {
      window.setTimeout(callback, 1000 / 60);
    };
})();