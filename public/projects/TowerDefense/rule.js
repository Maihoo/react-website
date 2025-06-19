var running = false;
var lvl = 0;
var myHP = 1000;
var timeStampBackup;
var building = 'void';
var mode = 'building';
var field = [];
var path1 = [];
var path2 = [];
var entities = [];
var towers = [];
var shots = [];
var explosions = [];
var fieldButtons = [];
var searchList = [];
var soundOn = true;
var wave = 1;
var bikeAmount  = 10;
var jeepAmount  = 5;
var lorryAmount = 0;
var lavAmount   = 0;
var tankAmount  = 0;
var waveDistance = 700;
var waitTick = '1';
var start1 = [4, -1];
var start2 = [8, -1];
var finish = [6, 15];


window.onload = function init() {
  preloadImages();
  generateField();
  fillShop();
  render(0, 0);
  setVehicleNumbers(wave);

  generatePath([4, 0], [6, 14], true);
  path1 = check(optimize(reversePath(path1)));

  generatePath([8, 0], [6, 14], false);
  path2 = check(optimize(reversePath(path2)));

  showPath();
}



function coordinatesOnField(i, j) {
  return [10 + 64 * i, 445 + 64 * j];
}

function render(timestamp, previousTimestamp) {
  timeStampBackup = previousTimestamp;

  if (!running) { return; }

  entityMove(timestamp, previousTimestamp);
  towerMove(timestamp, previousTimestamp);
  moveShots(timestamp);
  moveExplosion(timestamp);

  window.requestAnimFrame(function (time) {
    if (running) render(time, timestamp);
  });
}

function marginToInt(input) {
  return parseInt(input.slice(0, -2));
}

function radiansToDegrees(radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
}

function moveExplosion(newTimeStamp) {
  for(var i = 0; i < explosions.length; i++) {
    explosion = explosions[i];
    if(newTimeStamp - explosion.timestamp > 1500) { explosion.style.zIndex = '1'; }
    if(newTimeStamp - explosion.timestamp > 4000) {
      const index = explosions.indexOf(explosion);
      if (index > -1) { explosions.splice(index, 1); }
      explosion.remove();
    }
  }
}

function moveShots(newTimeStamp) {
  for(var i = 0; i < shots.length; i++) {
    var shot = shots[i];

    var tower;
    var entity;

    if(document.getElementById(shot.source) == null || document.getElementById(shot.target) == null ) {
      tower = null;
      entity = null;
    } else {
      tower = document.getElementById(shot.source);
      entity = document.getElementById(shot.target);
    }

    switch (shot.type.charAt(0)) {
      case 'n':
        if(tower == null || entity == null ) {
          const index = shots.indexOf(shot);
          if (index > -1) { shots.splice(index, 1); }
          shot.remove();
          return;
        }
        var startPoint = [];
        startPoint.push(parseInt(shot.startX));
        startPoint.push(parseInt(shot.startY) + 32);
        var endPoint = [];
        endPoint.push(parseInt(shot.endX) + 32);
        endPoint.push(parseInt(shot.endY) + 64);
        var diffX = parseInt(endPoint[0]) - parseInt(startPoint[0]);
        var diffY = parseInt(endPoint[1]) - parseInt(startPoint[1]);

        var progress = parseFloat(parseFloat(newTimeStamp - shot.startTime) / parseFloat(shot.bulletTime));

        shot.style.marginTop  = '' + parseInt(startPoint[0] + (diffX * progress)) + 'px';
        shot.style.marginLeft = '' + parseInt(startPoint[1] + (diffY * progress)) + 'px';

        if(newTimeStamp - parseInt(shot.startTime) > parseInt(shot.bulletTime)) {
          entity.children[1].style.opacity = '1.0';
          entity.hp = '' + (parseInt(entity.hp) - parseInt(shot.dmg));
          var corrected = parseInt(42.0*(parseFloat(entity.hp) / parseFloat(entity.maxhp)));
          if(corrected > 0 && corrected <= 42) { entity.children[1].src = 'res/UI/health/health_' + corrected + '.png'; }
          else { removeEntity(entity); }

          const index = shots.indexOf(shot);
          if (index > -1) { shots.splice(index, 1); }
          shot.remove();
        }
        break;

      case 'm':
        var startPoint = [];
        startPoint.push(parseInt(shot.startX));
        startPoint.push(parseInt(shot.startY) + 32);
        var endPoint = [];
        endPoint.push(parseInt(shot.endX) + 32);
        endPoint.push(parseInt(shot.endY) + 64);
        var diffX = parseInt(endPoint[0]) - parseInt(startPoint[0]);
        var diffY = parseInt(endPoint[1]) - parseInt(startPoint[1]);

        var progress = parseFloat(parseFloat(newTimeStamp - shot.startTime) / parseFloat(shot.bulletTime));

        var extraX = -150 * Math.sin(Math.PI * progress);

        shot.style.marginTop  = '' + parseInt(startPoint[0] + extraX + (diffX * progress)) + 'px';
        shot.style.marginLeft = '' + parseInt(startPoint[1] + (diffY * progress)) + 'px';

        if(newTimeStamp - parseInt(shot.startTime) > parseInt(shot.bulletTime)) {
          var explosion = document.createElement('img');
          explosion.id = 'explosion_' + explosions.length;
          explosion.src = 'res/Entities/explosion.gif'+"?a="+Math.random();
          explosion.timestamp = '' + newTimeStamp;
          explosion.style.position   = 'absolute';
          explosion.style.height     = '128px';
          explosion.style.width      = '128px';
          explosion.style.marginTop  = '' + (parseInt(shot.style.marginTop.slice(0, -2))  - 32) + 'px';
          explosion.style.marginLeft = '' + (parseInt(shot.style.marginLeft.slice(0, -2)) - 75) + 'px';
          explosion.style.zIndex     = '100001000';
          explosion.style.color      = '#fff';
          document.body.appendChild(explosion);
          explosions.push(explosion);
          if(soundOn) {
            var audio = new Audio('res/Sounds/mortar_explosion.mp3');
            audio.play();
          }

          for(var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            var distX = marginToInt(shot.style.marginTop) -  (marginToInt(entity.style.marginTop ) + 45);
            var distY = marginToInt(shot.style.marginLeft) - (marginToInt(entity.style.marginLeft) + 45);
            var distance = (Math.sqrt((distX * distX) + (distY * distY)));

            var explosionRadius = 150;

            if (distance < explosionRadius && entity.active == 'a') {
              entity.children[1].style.opacity = '1.0';
              entity.hp = '' + (parseInt(entity.hp) - parseInt(   shot.dmg * parseFloat(explosionRadius - distance) / explosionRadius   ));
              var corrected = parseInt(42.0*(parseFloat(entity.hp) / parseFloat(entity.maxhp)));
              if(corrected > 0 && corrected <= 42) { entity.children[1].src = 'res/UI/health/health_' + corrected + '.png'; }
              else {
                removeEntity(entity);
              }
            }
          }
          const index = shots.indexOf(shot);
          if (index > -1) { shots.splice(index, 1); }
          shot.remove();
        }

        break;

      case 'l':
        if(tower == null || entity == null ) {
          const index = shots.indexOf(shot);
          if (index > -1) { shots.splice(index, 1); }
          shot.remove();
          drawLaser([0,0], [0,0], true);
          return;
        }
        var startPoint = [];
        startPoint.push(parseInt(shot.startX));
        startPoint.push(parseInt(shot.startY) + 32);
        var endPoint = [];
        endPoint.push(parseInt(shot.endX) + 32);
        endPoint.push(parseInt(shot.endY) + 64);

        shot.style.opacity = '0.0';

        drawLaser(startPoint, endPoint, false);

        if(newTimeStamp - parseInt(shot.startTime) > parseInt(shot.bulletTime)) {
          entity.children[1].style.opacity = '1.0';
          entity.hp = '' + (parseInt(entity.hp) - parseInt(shot.dmg));
          var corrected = parseInt(42.0*(parseFloat(entity.hp) / parseFloat(entity.maxhp)));
          if(corrected > 0 && corrected <= 42) { entity.children[1].src = 'res/UI/health/health_' + corrected + '.png'; }
          else { removeEntity(entity); }
          const index = shots.indexOf(shot);
          if (index > -1) { shots.splice(index, 1); }
          shot.remove();
          drawLaser([0,0], [0,0], true);
        }
        break;

      default:
        break;
    }
  }
}

function removeEntity(entity) {
  const index = entities.indexOf(entity);
  if (index > -1) { entities.splice(index, 1); }
  var money = document.getElementById('money');
  money.textContent = '$' + (parseInt(money.textContent.slice(1,money.textContent.length)) + (parseInt(entity.maxhp)/4) );
  entity.children.remove;
  entity.remove();
  if(entities.length == 0) { endWave(); }
}

function endWave() {
  wave++;
  document.getElementById('startWaveText').textContent = document.getElementById('startWaveText').textContent.slice(0, -1) + wave;
  pause();
  running = false;
  startWaveText.textContent = 'START WAVE ' + wave;
  var startWave = document.getElementById('shopb-5-0');
  try{ startWave.removeEventListener('click', pause);  } catch(e) {}
  try{ startWave.removeEventListener('click', resume); } catch(e) {}
  startWave.addEventListener('click', start);
  setVehicleNumbers(wave);


  document.getElementById('modeText').textContent = 'BUILDING';
}

function startShot(entity, tower, timestamp) {
  var shot = document.createElement('div');
  shot.id = '' + tower.id + '_bullet';
  shot.startTime  = '' + timestamp;
  shot.startX     = '' + tower.style.marginTop;
  shot.startY     = '' + tower.style.marginLeft;
  shot.endX       = '' + entity.style.marginTop;
  shot.endY       = '' + entity.style.marginLeft;
  shot.currentX   = '' + tower.style.marginTop;
  shot.currentY   = '' + tower.style.marginLeft;
  shot.type       = '' + tower.type;
  shot.target     = '' + entity.id;
  shot.source     = '' + tower.id;
  shot.dmg        = '' + tower.dmg;
  shot.bulletTime = '' + tower.bulletTime;
  shot.style.zIndex     = '100000100';
  shot.style.position   = 'absolute';
  shot.style.color      = 'black';
  shot.style.width      = '10px';
  shot.style.height     = '10px';
  shot.style.border     = '50px';
  shot.style.backgroundColor = 'black';
  shot.style.borderRadius = '250px';
  shot.style.marginTop  = '' + tower.style.marginTop;
  shot.style.marginLeft = '' + tower.style.marginLeft;

  shots.push(shot);
  document.body.appendChild(shot);

}

function towerMove(timestamp, previousTimestamp) {
  for (var i = 0; i < towers.length; i++) {
    var tower = towers[i];

    tower.style.zIndex = '' + (2000 + parseInt(tower.style.marginTop.slice(0, -2)));

    if(tower.type.charAt(0) == 'n' || tower.type.charAt(0) == 's' || tower.type.charAt(0) == 'm' || tower.type.charAt(0) == 'l') {
      loop2:
      for (var j = 0; j < entities.length; j++) {

        var entity = entities[j];
        var distX = marginToInt(tower.style.marginTop) - marginToInt(entity.style.marginTop);
        var distY = marginToInt(tower.style.marginLeft) - marginToInt(entity.style.marginLeft);
        var distance = (Math.sqrt((distX * distX) + (distY * distY)));

        if (distance < parseInt(tower.radius) && entity.active == 'a') {

          if(timestamp - parseInt(tower.lastShot) > parseInt(tower.delay)) {
            tower.lastShot = '' + timestamp;

            if(soundOn) {
              if(tower.type.charAt(0) == 'n') {
                var audio = new Audio('res/Sounds/normal_shot.mp3');
                audio.play();
              }
              if(tower.type.charAt(0) == 'm') {
                var audio = new Audio('res/Sounds/mortar_shot.mp3');
                audio.play();
              }
            }

            startShot(entity, tower, timestamp);
          }
          if(tower.type.charAt(0) == 'n' || tower.type.charAt(0) == 'm') {
            if(tower.type.charAt(0) == 'n') {
              if(distX == 0) { distX = 1; }
              if(distY == 0) { distY = 1; }
              var angle = radiansToDegrees(Math.atan((parseFloat(distY) / parseFloat(distX))));
              if (distX > 0 && distY > 0) { angle = 360 - angle; }
              if (distX > 0 && distY < 0) { angle = angle * (-1); }
              if (distX < 0 && distY < 0) { angle = 180 - angle; }
              if (distX < 0 && distY > 0) { angle = angle * (-1); angle = 180 + angle; }

              angle = parseInt(angle);

              if (angle >= 349 || angle <=  11) { tower.className = 'img img-normal_up'             ; break loop2; }
              if (angle >=  12 && angle <=  33) { tower.className = 'img img-normal_upupright'      ; break loop2; }
              if (angle >=  34 && angle <=  56) { tower.className = 'img img-normal_upright'        ; break loop2; }
              if (angle >=  57 && angle <=  77) { tower.className = 'img img-normal_uprightright'   ; break loop2; }
              if (angle >=  78 && angle <= 100) { tower.className = 'img img-normal_right'          ; break loop2; }
              if (angle >= 101 && angle <= 122) { tower.className = 'img img-normal_rightrightdown' ; break loop2; }
              if (angle >= 123 && angle <= 145) { tower.className = 'img img-normal_rightdown'      ; break loop2; }
              if (angle >= 146 && angle <= 167) { tower.className = 'img img-normal_rightdowndown'  ; break loop2; }
              if (angle >= 168 && angle <= 190) { tower.className = 'img img-normal_down'           ; break loop2; }
              if (angle >= 191 && angle <= 212) { tower.className = 'img img-normal_downdownleft'   ; break loop2; }
              if (angle >= 213 && angle <= 235) { tower.className = 'img img-normal_downleft'       ; break loop2; }
              if (angle >= 236 && angle <= 257) { tower.className = 'img img-normal_downleftleft'   ; break loop2; }
              if (angle >= 258 && angle <= 280) { tower.className = 'img img-normal_left'           ; break loop2; }
              if (angle >= 281 && angle <= 302) { tower.className = 'img img-normal_leftleftup'     ; break loop2; }
              if (angle >= 303 && angle <= 325) { tower.className = 'img img-normal_leftup'         ; break loop2; }
              if (angle >= 326 && angle <= 348) { tower.className = 'img img-normal_leftupup'       ; break loop2; }

              break loop2;
            }
            if(tower.type.charAt(0) == 'm') {
              if(distX == 0) { distX = 1; }
              if(distY == 0) { distY = 1; }
              var angle = radiansToDegrees(Math.atan((parseFloat(distY) / parseFloat(distX))));
              if (distX > 0 && distY > 0) { angle = 360 - angle; }
              if (distX > 0 && distY < 0) { angle = angle * (-1); }
              if (distX < 0 && distY < 0) { angle = 180 - angle; }
              if (distX < 0 && distY > 0) { angle = angle * (-1); angle = 180 + angle; }

              angle = parseInt(angle);

              if (angle >= 315 || angle <=   44) { tower.className = 'img img-mortar_up'    ; break loop2; }
              if (angle >=  45 && angle <=  134) { tower.className = 'img img-mortar_right' ; break loop2; }
              if (angle >= 135 && angle <=  224) { tower.className = 'img img-mortar_down'  ; break loop2; }
              if (angle >= 225 && angle <=  314) { tower.className = 'img img-mortar_left'  ; break loop2; }

              break loop2;
            }
          }
        }
      }
      if(timestamp - parseInt(tower.lastShot) < 100 && !parseInt(tower.lastShot) == 0) {
        if(!tower.className.includes('fire')) { tower.className = tower.className + '_fire'; }
      } else {
        if(tower.className.includes('fire')) { tower.className = tower.className.slice(0, -5); }
      }
    }
  }
}

function entityMove(timestamp, previousTimestamp) {

  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];

    entity.delta = parseInt(entity.delta) + timestamp - previousTimestamp;

    var intPP = parseInt(entity.pathPlace);

    var originalPosX = entity.originalPosX;
    var originalPosY = entity.originalPosY;
    var intOPX = parseInt(originalPosX);
    var intOPY = parseInt(originalPosY);

    var path = [];

    if(entity.path.charAt(0) == '1') { path = reversePath(reversePath(path1)); }
    else                             { path = reversePath(reversePath(path2)); }

    switch (entity.active.charAt(0)) {
      case 'a':
        var diffX = 0;
        var diffY = 0;

        if (intPP < path.length && intPP > 0) {
          var now = path[intPP - 1];
          var then = path[intPP];
          diffX = then[0] - now[0];
          diffY = then[1] - now[1];
        }

        if(intPP > path.length - 1) {
          entity.active = 'x';
          break;
        }

        if((parseInt(marginToInt(entity.style.marginLeft)/20)).mod(2) == 0) {
          bump = 1;
        } else {
          bump = 0;
        }

        var tempDistance = 100000000;
        var temp = -1;
        var tempDiffX = 0;
        var tempDiffY = 0;

        for(var j = 0; j < entities.length; j++) {
          var searchEntity = entities[j];
          if(i != j) {
            var distX = marginToInt(entity.style.marginTop)  - (marginToInt(searchEntity.style.marginTop ));
            var distY = marginToInt(entity.style.marginLeft) - (marginToInt(searchEntity.style.marginLeft));
            var distance = (Math.sqrt((distX * distX) + (distY * distY)));

            if(distance < 64 && parseInt(entity.giveWayX) == 0 && parseInt(entity.giveWayY.charAt(0)) == 0 && distance < tempDistance) {
              tempDistance = distance;
              temp = j;
              tempDiffX = diffX;
              tempDiffY = diffY;
            }
          }
        }

        if(temp != -1 && parseInt(entity.giveWayX) == 0 && parseInt(entity.giveWayY.charAt(0)) == 0) {
          var searchEntity = entities[temp];
          if(Math.abs(tempDiffX) < Math.abs(tempDiffY) ) {
            if(entity.path.charAt(0) == '1')  { entity.giveWayX = '-1'; searchEntity.giveWayX = '1' ; }
            else                              { entity.giveWayX = '1' ; searchEntity.giveWayX = '-1'; }
          } else {
            if(entity.path.charAt(0) == '1')  { entity.giveWayY = '-1'; searchEntity.giveWayY = '1' ; }
            else                              { entity.giveWayY = '1' ; searchEntity.giveWayY = '-1'; }
          }
        }/*else {
          if(parseInt(entity.giveWayX      ) < 0 && parseInt(entity.giveWayX      ) > -10) { entity.giveWayX       = '' + (parseInt(entity.giveWayX      ) -1); }
          if(parseInt(entity.giveWayX      ) > 0 && parseInt(entity.giveWayX      ) <  10) { entity.giveWayX       = '' + (parseInt(entity.giveWayX      ) +1); }
          if(parseInt(searchEntity.giveWayX) < 0 && parseInt(searchEntity.giveWayX) > -10) { searchEntity.giveWayX = '' + (parseInt(searchEntity.giveWayX) -1); }
          if(parseInt(searchEntity.giveWayX) > 0 && parseInt(searchEntity.giveWayX) <  10) { searchEntity.giveWayX = '' + (parseInt(searchEntity.giveWayX) +1); }
        }*/

        if(parseInt(entity.giveWayX      ) < 0 && parseInt(entity.giveWayX      ) > -10) { entity.giveWayX       = '' + (parseInt(entity.giveWayX      ) -1); }
        if(parseInt(entity.giveWayX      ) > 0 && parseInt(entity.giveWayX      ) <  10) { entity.giveWayX       = '' + (parseInt(entity.giveWayX      ) +1); }
        if(parseInt(searchEntity.giveWayX) < 0 && parseInt(searchEntity.giveWayX) > -10) { searchEntity.giveWayX = '' + (parseInt(searchEntity.giveWayX) -1); }
        if(parseInt(searchEntity.giveWayX) > 0 && parseInt(searchEntity.giveWayX) <  10) { searchEntity.giveWayX = '' + (parseInt(searchEntity.giveWayX) +1); }

        entity.style.marginTop  = '' + (bump + parseInt(entity.giveWayX) + intOPX + diffX * parseInt(parseFloat(parseInt(entity.delta) * 64) / 1000.0)) + 'px';
        entity.style.marginLeft = '' + (     + parseInt(entity.giveWayY) + intOPY + diffY * parseInt(parseFloat(parseInt(entity.delta) * 64) / 1000.0)) + 'px';

        entity.style.zIndex = '' + (2000 + parseInt(entity.style.marginTop.slice(0, -2)));

        if (diffX < 0) { entity.children[0].src = 'res/Entities/' + entity.type + '/' + entity.type + '_up.png'; }
        if (diffX > 0) { entity.children[0].src = 'res/Entities/' + entity.type + '/' + entity.type + '_down.png'; }
        if (diffY < 0) { entity.children[0].src = 'res/Entities/' + entity.type + '/' + entity.type + '_left.png'; }
        if (diffY > 0) { entity.children[0].src = 'res/Entities/' + entity.type + '/' + entity.type + '_right.png'; }

        if (parseInt(entity.delta) > 1000) {
          var coords = path[intPP];
          var coordsInPixel = coordinatesOnField(coords[0], coords[1]);
          entity.originalPosX = coordsInPixel[0];
          entity.originalPosY = coordsInPixel[1];

          entity.delta = parseInt(entity.delta) - 1000;
          entity.pathPlace = '' + (intPP + 1);
        }
        break;

      case 'd':
        if(entity.bodge.charAt(0) == '0') { entity.bodge = '' + i }
        var tempString = '';
        if(entity.path.charAt(0) == '1') {
          tempString = '' + (-100 + parseInt(parseFloat((parseInt(entity.delta) - waveDistance * parseInt(entity.bodge)) * 64) / 1000.0)) + 'px';
          entity.children[0].src    = 'res/Entities/' + entity.type + '/' + entity.type + '_down.png';
        } else {
          tempString = '' + ( 970 - parseInt(parseFloat((parseInt(entity.delta) - waveDistance * parseInt(entity.bodge)) * 64) / 1000.0)) + 'px';
          entity.children[0].src    = 'res/Entities/' + entity.type + '/' + entity.type + '_up.png';
        }
        entity.style.marginTop = tempString;
        entity.style.zIndex = '' + (2000 + parseInt(entity.style.marginTop.slice(0, -2)));
        var strt = path[0];
        try{
          var rslt = coordinatesOnField(strt[0], strt[1]);
          if (entity.path.charAt(0) == '1' && parseInt((entity.style.marginTop).slice(0, -2)) > rslt[0]) {
            entity.active = 'm';
            entity.delta  = '0';
            entity.originalPosX = tempString;
            entity.children[0].src    = 'res/Entities/' + entity.type + '/' + entity.type + '_right.png';
          }
          if (entity.path.charAt(0) == '2' && parseInt((entity.style.marginTop).slice(0, -2)) < rslt[0]) {
            entity.active = 'm';
            entity.delta  = '0';
            entity.originalPosX = tempString;
            entity.children[0].src    = 'res/Entities/' + entity.type + '/' + entity.type + '_right.png';
          }
        } catch(e) {}

        break;

      case 'm':
        var tempString = '' + (380 + parseInt(parseFloat((parseInt(entity.delta)) * 64) / 1000.0)) + 'px';
        entity.style.marginLeft = tempString;
        var strt = path[0];
        var rslt = coordinatesOnField(strt[0], strt[1]);
        if (parseInt((entity.style.marginLeft).slice(0, -2)) > rslt[1]) { entity.active = 'a'; entity.originalPosY = tempString; }

        break;

      case 'x':
        if(parseInt(entity.style.marginLeft.slice(0,-2)) > 1400) {
          myHP = myHP - parseInt(entity.hp);
          document.getElementById('hpText').textContent = 'HP: ' + myHP;
          entity.hp     = '0';
          entity.active = 'y';
          entity.children[0].src = 'res/Entities/' + entity.type + '/' + entity.type + '_up.png';
        }
        entity.children[0].src = 'res/Entities/' + entity.type + '/' + entity.type + '_right.png';
        var tempString = '' + (1270 + parseInt(parseFloat((parseInt(entity.delta)) * 64) / 1000.0)) + 'px';
        entity.style.marginLeft = tempString;
        break;

      case 'y':
        entity.children[0].src = 'res/Entities/' + entity.type + '/' + entity.type + '_up.png';
        var tempString  = '' + (530 - parseInt(parseFloat((parseInt(entity.delta)) * 64) / 1000.0)) + 'px';
        entity.style.marginTop = tempString;
        entity.style.zIndex = '' + (2000 + parseInt(entity.style.marginTop.slice(0, -2)));
        break;

      default:
        break;
    }
  }
}

function setVehicleNumbers(wave) {
  switch (wave) {
    case 1:
      bikeAmount   = 5;
      jeepAmount   = 5;
      lorryAmount  = 5;
      lavAmount    = 2;
      tankAmount   = 2;
      waveDistance = 700;
      /*
      jeepAmount   = 5;
      lorryAmount  = 2;
      lavAmount    = 0;
      tankAmount   = 0;
      waveDistance = 700;*/
      break;
    case 2:
      bikeAmount   = 8;
      jeepAmount   = 5;
      lorryAmount  = 1;
      lavAmount    = 0;
      tankAmount   = 0;
      waveDistance = 600;
      break;
    case 3:
      bikeAmount   = 5;
      jeepAmount   = 8;
      lorryAmount  = 2;
      lavAmount    = 1;
      tankAmount   = 0;
      waveDistance = 600;
      break;
    case 3:
      bikeAmount   = 4;
      jeepAmount   = 6;
      lorryAmount  = 10;
      lavAmount    = 5;
      tankAmount   = 0;
      waveDistance = 500;
      break;
    case 5:
      bikeAmount   = 2;
      jeepAmount   = 5;
      lorryAmount  = 5;
      lavAmount    = 8;
      tankAmount   = 2;
      waveDistance = 500;
      break;
    case 6:
      bikeAmount   = 8;
      jeepAmount   = 0;
      lorryAmount  = 5;
      lavAmount    = 10;
      tankAmount   = 10;
      waveDistance = 400;
      break;
    default:
      break;
  }
  document.getElementById('bikeText').textContent  = '× ' + bikeAmount;
  document.getElementById('jeepText').textContent  = '× ' + jeepAmount;
  document.getElementById('lorryText').textContent = '× ' + lorryAmount;
  document.getElementById('lavText').textContent   = '× ' + lavAmount;
  document.getElementById('tankText').textContent  = '× ' + tankAmount;
}

function generateWave() {
  entities = [];
  for (var i = 0; i < bikeAmount; i++) {
    createEntity('bike' , 10 );
  }
  for (var i = 0; i < jeepAmount; i++) {
    createEntity('jeep' , 20 );
  }
  for (var i = 0; i < lorryAmount; i++) {
    createEntity('lorry', 40 );
  }
  for (var i = 0; i < lavAmount; i++) {
    createEntity('lav'  , 100);
  }
  for (var i = 0; i < tankAmount; i++) {
    createEntity('tank' , 250);
  }
}

function createEntity(name, maxhp) {
  var entity = document.createElement('img');
  entity.src = 'res/Entities/' + name + '/' + name + '_down.png';

  entity.style.position   = 'absolute';
  entity.style.height     = '128px';
  entity.style.width      = '128px';
  entity.style.marginTop  = '-16px';
  entity.style.marginLeft = '-16px';
  entity.style.zIndex     = 10;
  entity.style.color      = '#fff';

  var hpBar = document.createElement('img');
  hpBar.id  = '' + name + 'HpBar' + entities.length;
  hpBar.src = 'res/UI/health/health_42.png';
  hpBar.style.position    = 'relative';
  hpBar.style.marginTop   = '-16px';
  hpBar.style.marginLeft  = '-16px';
  hpBar.style.opacity     = '0.0';
  hpBar.style.zIndex      = '100000000000';

  var divEntity = document.createElement('div');
  divEntity.className         = 'largeimageholder';
  divEntity.id                = '' + name + entities.length;
  divEntity.hp                = '' + maxhp;
  divEntity.maxhp             = '' + maxhp;
  divEntity.active            = 'd';
  divEntity.delta             = '0';
  divEntity.bodge             = '0';
  divEntity.pathPlace         = '0';
  divEntity.originalPosX      = '0';
  divEntity.originalPosY      = '0';
  divEntity.type              = '' + name;
  divEntity.path              = '' + (entities.length.mod(2) + 1);
  divEntity.giveWayX          = '0';
  divEntity.giveWayY          = '0';
  divEntity.style.height      = '128px';
  divEntity.style.width       = '128px';
  if(divEntity.path.charAt(0) == '1') { divEntity.style.marginTop   = '' + (-128) + 'px'; }
  else                                { divEntity.style.marginTop   = '' + (1128) + 'px'; }
  divEntity.style.marginLeft  = '' + (-32 + 475 - 1 * 64) + 'px';
  divEntity.appendChild(entity);
  divEntity.appendChild(hpBar);
  document.body.appendChild(divEntity);

  entities.push(divEntity);
}

function fillShop() {

  var crate = createButton(0, 0, 'btn btn-shop', 'position:absolute; margin-top:  77px; margin-left: 40px', 'absolute', '0px', '0px', '$10', 'shop');
  crate.style.color = '#fff';
  crate.addEventListener('click', function () { buildButtonClick(crate, 'crate'); });

  var spikes = createButton(0, 1, 'btn btn-shop', 'position:absolute; margin-top:  77px; margin-left:  140px', 'absolute', '0px', '0px', '$20', 'shop');
  spikes.style.color = '#fff';
  spikes.addEventListener('click', function () { buildButtonClick(spikes, 'spikes'); });

  var normal = createButton(0, 2, 'btn btn-shop', 'position:absolute; margin-top:  77px; margin-left: 240px', 'absolute', '0px', '0px', '$50', 'shop');
  normal.style.color = '#fff';
  normal.addEventListener('click', function () { buildButtonClick(normal, 'normal_left'); });

  var mortar = createButton(1, 0, 'btn btn-shop', 'position:absolute; margin-top:  155px; margin-left: 40px', 'absolute', '0px', '0px', 'locked', 'shop');
  mortar.style.color = 'red';
  mortar.addEventListener('click', function () { buildButtonClick(mortar, 'mortar_left'); });

  createButton(1, 1, 'btn btn-shop', 'position:absolute; margin-top: 155px; margin-left: 140px', 'absolute', '0px', '0px', 'locked', 'shop');
  createButton(1, 2, 'btn btn-shop', 'position:absolute; margin-top: 155px; margin-left: 240px', 'absolute', '0px', '0px', 'locked', 'shop');

  createButton(2, 0, 'btn btn-shop', 'position:absolute; margin-top: 232px; margin-left:  40px', 'absolute', '0px', '0px', 'locked', 'shop');

  var laser = createButton(2, 1, 'btn btn-shop', 'position:absolute; margin-top:  232px; margin-left: 140px', 'absolute', '0px', '0px', 'locked', 'shop');
  laser.style.color = 'red';
  laser.addEventListener('click', function () { buildButtonClick(laser, 'laser'); });

  createButton(2, 2, 'btn btn-shop', 'position:absolute; margin-top: 232px; margin-left: 240px', 'absolute', '0px', '0px', 'locked', 'shop');

  var trash = createButton(3, 0, 'btn btn-shop', 'position:absolute; margin-top:  315px; margin-left: 25px', 'absolute', '0px', '0px', '', 'shop');
  trash.style.color = 'red';
  trash.addEventListener('click', function () { buildButtonClick(trash, 'trash'); });

  var modeText = document.createElement('h1');
  modeText.id               = 'modeText';
  modeText.className        = 'amountText';
  modeText.style.marginLeft = '80px';
  modeText.style.marginTop  = '444px';
  modeText.textContent      = 'BUILDING';
  document.body.appendChild(modeText);

  var bikeText = document.createElement('h1');
  bikeText.id                = 'bikeText';
  bikeText.className         = 'amountText';
  bikeText.textContent       = '× 10';
  bikeText.style.marginTop   = '570px';
  bikeText.style.marginLeft  = '230px';
  bikeText.style.width       = '100px';
  document.body.appendChild(bikeText);

  var jeepText = document.createElement('h1');
  jeepText.id                = 'jeepText';
  jeepText.className         = 'amountText';
  jeepText.textContent       = '× 5';
  jeepText.style.marginTop   = '610px';
  jeepText.style.marginLeft  = '230px';
  jeepText.style.width       = '100px';
  document.body.appendChild(jeepText);

  var lorryText = document.createElement('h1');
  lorryText.id                = 'lorryText';
  lorryText.className         = 'amountText';
  lorryText.textContent       = '× 5';
  lorryText.style.marginTop   = '650px';
  lorryText.style.marginLeft  = '230px';
  lorryText.style.width       = '100px';
  document.body.appendChild(lorryText);

  var lavText = document.createElement('h1');
  lavText.id                = 'lavText';
  lavText.className         = 'amountText';
  lavText.textContent       = '× 2';
  lavText.style.marginTop   = '690px';
  lavText.style.marginLeft  = '230px';
  lavText.style.width      = '100px';
  document.body.appendChild(lavText);

  var tankText = document.createElement('h1');
  tankText.id               = 'tankText';
  tankText.className        = 'amountText';
  tankText.textContent      = '× 2';
  tankText.style.marginTop  = '730px';
  tankText.style.marginLeft = '230px';
  tankText.style.width      = '100px';
  document.body.appendChild(tankText);

  var startWave = createButton(5, 0, 'btn btn-start', '', 'absolute', '0px', '0px', '', 'shop');
  var startWaveText = document.createElement('h1');
  startWaveText.id                = 'startWaveText';
  startWaveText.className         = 'amountText';
  startWaveText.style.marginTop   = '-45px';
  startWaveText.style.marginLeft  = '-78px';
  startWaveText.style.fontSize    = '32px';
  startWaveText.textContent       = 'START WAVE 1';
  startWave.appendChild(startWaveText);
  startWave.addEventListener('click', start);

  var hpText = document.createElement('h1');
  hpText.id               = 'hpText';
  hpText.className        = 'amountText';
  hpText.style.marginLeft = '1660px';
  hpText.style.marginTop  = '60px';
  hpText.style.zIndex     = '100000001';
  hpText.textContent      = 'HP: ' + myHP;
  document.body.appendChild(hpText);

  var sound = createButton(6, 0, 'btn btn-menu', '', 'absolute', '0px', '0px', '', 'shop');
  sound.style.zIndex = '10000000006';
  var soundImg = document.createElement('img');
  soundImg.id                   = 'soundImg';
  soundImg.src                  = 'res/UI/soundon.png';
  soundImg.style.width          = '45px';
  soundImg.style.height         = '45px';
  soundImg.style.marginTop      = '204px';
  soundImg.style.marginLeft     = '1593px';
  soundImg.style.zIndex         = '10000000005';
  soundImg.style.pointerEvents  = 'none';
  document.body.appendChild(sound);
  document.body.appendChild(soundImg);

  sound.addEventListener('click', () => {
    soundOn = !soundOn;
    if(soundOn) { soundImg.src = 'res/UI/soundon.png' ; }
    else        { soundImg.src = 'res/UI/soundoff.png'; }
 });
}

function start() {
  setVehicleNumbers(wave);
  running = true;
  mode = 'wave';
  document.getElementById('modeText').textContent = 'WAVE';
  var startWave = document.getElementById('shopb-5-0');
  entities = [];
  generateWave();
  path1 = [];
  path2 = [];
  generatePath([4, 0], [6, 14], true);
  generatePath([8, 0], [6, 14], false);
  path1 = check(optimize(reversePath(path1)));
  path2 = check(optimize(reversePath(path2)));

  showPath();

  startWaveText.textContent = 'PAUSE';
  try{ startWave.removeEventListener('click', start); } catch(e) {}
  startWave.addEventListener('click', pause);

  window.requestAnimFrame(function (time) {
    if (running) render(timeStampBackup, time);
  });
}

function pathToCoords(input) {
  var result = [];
  for(var i = 0; i < input.length; i++) {
    result.push(pathToCoordsSub(input[i]));
  }
  return result;
}

function pathToCoordsSub(input) {
  return [492 + 64 * input[1], 80 + 64 * input[0]];
}

function showPath() {
  var temp1 = reversePath(path1);

  temp1.push(start1);
  temp1.push([-2, -1]);
  temp1 = reversePath(temp1);
  temp1.push(finish);
  drawPath(pathToCoords(temp1), true);

  var temp2 = reversePath(path2);
  temp2.push(start2);
  temp2.push([15, -1]);
  temp2 = reversePath(temp2);
  temp2.push(finish);
  temp2.push([-2, 15]);
  drawPath(pathToCoords(temp2), false);


  for(var i = 0; i < 13; i++) {
    for(var j = 0; j < 15; j++) {
      document.getElementById('p-' + i + '-' + j).textContent = '';
    }
  }

  for(var i = 0; i < path1.length; i++) {
    var temp = path1[i];
    //document.getElementById('p-' + (temp[0] + 1) + '-' + (temp[1] + 1)).textContent = '' + i;
  }
  for(var i = 0; i < path2.length; i++) {
    var temp = path2[i];
    //document.getElementById('p-' + (temp[0] + 1) + '-' + (temp[1] + 1)).textContent = '' + i;
  }
}

function drawPath(input, reset) {
  const canvas = document.querySelector('#canvas');
  canvas.style.zIndex = '0';

  if (!canvas.getContext) { return; }
  const ctx = canvas.getContext('2d');

  if(reset) { ctx.clearRect(0, 0, canvas.width, canvas.height); }

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 45;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for(var i = 0; i < input.length-1; i++) {
    from = input[i];
    to   = input[i+1];

    ctx.beginPath();
    ctx.moveTo(from[0], from[1]);
    ctx.lineTo(to[0], to[1]);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgb(150, 190, 100)';
  ctx.lineWidth = 40;

  for(var i = 0; i < input.length-1; i++) {
    from = input[i];
    to   = input[i+1];

    ctx.beginPath();
    ctx.moveTo(from[0], from[1]);
    ctx.lineTo(to[0], to[1]);
    ctx.stroke();
  }

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 20;
  ctx.lineCap = 'round';

  for(var i = 0; i < input.length-1; i++) {
    from = input[i];
    to   = input[i+1];

    ctx.beginPath();
    ctx.moveTo(from[0], from[1]);
    ctx.lineTo(to[0], to[1]);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgb(0, 150, 0)';
  ctx.lineWidth = 15;
  ctx.lineCap = 'round';

  for(var i = 0; i < input.length-1; i++) {
    from = input[i];
    to   = input[i+1];

    ctx.beginPath();
    ctx.moveTo(from[0], from[1]);
    ctx.lineTo(to[0], to[1]);
    ctx.stroke();
  }
}

function drawLaser(startPoint, endPoint, clear) {
  const canvas = document.querySelector('#lasercanvas');
  canvas.style.zIndex = '100001000';

  if (!canvas.getContext) { return; }
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(clear) { return; }

  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(startPoint[1] + 17, startPoint[0] - 103);
  ctx.lineTo(endPoint[1]   + 0, endPoint[0]   - 75);
  ctx.stroke();
}

function pause() {
  running = false;
  startWaveText.textContent = 'RESUME';
  var startWave = document.getElementById('shopb-5-0');
  try{ startWave.removeEventListener('click', pause); } catch(e) {}
  try{ startWave.removeEventListener('click', start); } catch(e) {}
  startWave.addEventListener('click', resume);
}

function resume() {
  running = true;
  startWaveText.textContent = 'PAUSE';
  var startWave = document.getElementById('shopb-5-0');
  startWave.removeEventListener('click', resume);
  startWave.addEventListener('click', pause);

  window.requestAnimFrame(function (time) {
    if (running) render(timeStampBackup, time);
  });
}

function generatePath(startCoordinates, endCoordinates, path) {
  searchList = [];
  recursion([startCoordinates], startCoordinates, endCoordinates, 'ludr', 'l', path);
  if ((path1.length == 0 && path) || ((path2.length == 0 && !path))) { return false; }

  return true;
}

function check(input) {

  var result = reversePath(reversePath(input));

  for(var i = 0; i < result.length - 1; i++) {
    var nodeI = result[i];
    var nodeIX = nodeI[0];
    var nodeIY = nodeI[1];
    var nodeJ = result[i+1];
    var nodeJX = nodeJ[0];
    var nodeJY = nodeJ[1];

    if(!((nodeJX == nodeIX + 1)
      || (nodeJX == nodeIX - 1)
      || (nodeJY == nodeIY + 1)
      || (nodeJY == nodeIY - 1) ))
    {
      var temp = reversePath(reversePath(result));
      var part1 = temp.splice(0, i);

      var part2 = [];
      if (nodeJX == nodeIX) {
        var u = nodeJY - nodeIY;
        if(u < 0) {
          while(u < 0) {
            var piece = [];
            piece.push(nodeIX);
            piece.push(nodeJY - u);
            part2.push(piece);
            u++;
          }
        }
        else {
          while(u > 0) {
            var piece = [];
            piece.push(nodeIX);
            piece.push(nodeJY - u);
            part2.push(piece);
            u--;
          }
        }
      } else {
        var u = nodeJX - nodeIX;
        if(u < 0) {
          while(u < 0) {
            var piece = [];
            piece.push(nodeJX - u);
            piece.push(nodeIY);
            part2.push(piece);
            u++;
          }
        }
        else {
          while(u > 0) {
            var piece = [];
            piece.push(nodeJX - u);
            piece.push(nodeIY);
            part2.push(piece);
            u--;
          }
        }
      }

      temp = reversePath(reversePath(result));
      var part3 = temp.splice(i+1, temp.length);

      result = [];
      for (var l = 0; l < part1.length; l++) { result.push(part1[l]); }
      for (var l = 0; l < part2.length; l++) { result.push(part2[l]); }
      for (var l = 0; l < part3.length; l++) { result.push(part3[l]); }


    }
  }
  return result;
}

function optimize(input) {

  var result = reversePath(reversePath(input));
  //two of the same next to each other

  for (var i = 0; i < result.length - 1; i++) {
    var nI = result[i];
    var nJ = result[i + 1];
    if(nI[0] == nJ[0] && nI[1] == nJ[1]) {
      const index = result.indexOf(nJ);
      if (index > -1) { result.splice(index, 1); }
    }
  }

  for (var i = 0; i < result.length; i++) {
    for (var j = result.length - 1; j > i + 1; j--) {
      var nodeI = result[i];
      var nodeJ = result[j];

      var t = true;

      for (var x = i + 1; x < j; x++) {
        var nodeX = result[x];
        if ((nodeI[1] == nodeJ[1] && nodeI[1] == nodeX[1]) || (nodeI[0] == nodeJ[0] && nodeI[0] == nodeX[0])) { t = false; }
      }

      //checks that I and J are not the same                               checks that there's space between
      if (i != j && (nodeI[0] == nodeJ[0] || nodeI[1] == nodeJ[1]) && t && isClear(result, i, j)) {
        var temp = reversePath(reversePath(result));
        var part1 = temp.splice(0, i + 1);

        var part2 = [];
        if (nodeJ[0] == nodeI[0]) {
          for (var u = nodeI[1] + 1; u < nodeJ[1]; u++) {
            var piece = [];
            piece.push(nodeI[0]);
            piece.push(u);
            part2.push(piece);
          }
        } else {
          for (var u = nodeI[0] + 1; u < nodeJ[0]; u++) {
            var piece = [];
            piece.push(u);
            piece.push(nodeI[1]);
            part2.push(piece);
          }
        }

        temp = reversePath(reversePath(result));
        var part3 = temp.splice(j, temp.length);

        result = [];
        for (var l = 0; l < part1.length; l++) { result.push(part1[l]); }
        for (var l = 0; l < part2.length; l++) { result.push(part2[l]); }
        for (var l = 0; l < part3.length; l++) { result.push(part3[l]); }

        return optimize(result);
        //return result;
      }

      if (i != j && (nodeI[0] == nodeJ[0] && nodeI[1] == nodeJ[1])) {
        var temp = reversePath(reversePath(result));
        var part1 = temp.splice(0, i + 1);

        var part2 = [];
        if (nodeJ[0] == nodeI[0]) {
          for (var u = nodeI[1] + 1; u < nodeJ[1]; u++) {
            var piece = [];
            piece.push(nodeI[0]);
            piece.push(u);
            part2.push(piece);
          }
        } else {
          for (var u = nodeI[0] + 1; u < nodeJ[0]; u++) {
            var piece = [];
            piece.push(u);
            piece.push(nodeI[1]);
            part2.push(piece);
          }
        }

        temp = reversePath(reversePath(result));
        var part3 = temp.splice(j, temp.length);

        result = [];
        for (var l = 0; l < part1.length; l++) { result.push(part1[l]); }
        for (var l = 0; l < part2.length; l++) { result.push(part2[l]); }
        for (var l = 0; l < part3.length; l++) { result.push(part3[l]); }

        return optimize(result);
      }
    }
  }
  return result;
}

function equalStrings(str1, str2) {
  if (str1.length != str2.length) { return false; }

  for (var i = 0; i < str1.length; i++) {
    if (str1.charAt(i) != str2.charAt(i)) { return false; }
  }
  return true;
}

function isClear(input, i, j) {
  nodeI = input[i];
  nodeJ = input[j];
  if (nodeJ[0] == nodeI[0]) {
    for (var u = nodeI[1]; u <= nodeJ[1]; u++) {
      var cn = document.getElementById('p-' + nodeI[0] + '-' + u).className;
      if (!equalStrings(cn, 'img img-void') && !equalStrings(cn, 'img img-spikes')) { return false; }
    }
  } else {
    for (var u = nodeI[0]; u <= nodeJ[0]; u++) {
      var cn = document.getElementById('p-' + u + '-' + nodeI[1]).className;
      if (!equalStrings(cn, 'img img-void') && !equalStrings(cn, 'img img-spikes')) { return false; }
    }
  }
  return true;
}

function reversePath(input) {
  var temp = [];
  for (var i = input.length - 1; i >= 0; i--) {
    temp.push(input[i]);
  }
  return temp;
}

function reverseString(input) {
  var res = '';
  for (var i = input.length - 1; i >= 0; i--) {
    res = res + input.charAt(i);
  }
  return res;
}

function shortenPD(input) {
  input = reverseString(input);

  var u = input.indexOf('u');
  var d = input.indexOf('d');
  var l = input.indexOf('l');
  var r = input.indexOf('r');

  if (u > r && r > l && l > d) { input = 'urld'; }
  if (u > r && r > d && d > l) { input = 'urdl'; }
  if (u > l && l > r && r > d) { input = 'ulrd'; }
  if (u > l && l > d && d > r) { input = 'uldr'; }
  if (u > d && d > r && r > l) { input = 'udrl'; }
  if (u > d && d > l && l > r) { input = 'udlr'; }
  if (r > u && u > d && d > l) { input = 'rudl'; }
  if (r > u && u > l && l > d) { input = 'ruld'; }
  if (r > l && l > u && u > d) { input = 'rlud'; }
  if (r > l && l > d && d > u) { input = 'rldu'; }
  if (r > d && d > u && u > l) { input = 'rdul'; }
  if (r > d && d > l && l > u) { input = 'rdlu'; }
  if (l > u && u > r && r > d) { input = 'lurd'; }
  if (l > u && u > d && d > r) { input = 'ludr'; }
  if (l > r && r > u && u > d) { input = 'lrud'; }
  if (l > r && r > d && d > u) { input = 'lrdu'; }
  if (l > d && d > u && u > r) { input = 'ldur'; }
  if (l > d && d > r && r > u) { input = 'ldru'; }
  if (d > u && u > r && r > l) { input = 'durl'; }
  if (d > u && u > l && l > r) { input = 'dulr'; }
  if (d > r && r > u && u > l) { input = 'drul'; }
  if (d > r && r > l && l > u) { input = 'drlu'; }
  if (d > l && l > u && u > r) { input = 'dlur'; }
  if (d > l && l > r && r > u) { input = 'dlru'; }

  return input;
}

function recursion(sofar, startCoordinates, endCoordinates, pd, lastFail, path) {

  if (pd.indexOf('u') < 0) { pd = 'u' + pd; }
  if (pd.indexOf('d') < 0) { pd = 'd' + pd; }
  if (pd.indexOf('l') < 0) { pd = 'l' + pd; }
  if (pd.indexOf('r') < 0) { pd = 'r' + pd; }

  pd = shortenPD(pd);
  var newPD = pd;

  sofar.push(startCoordinates);
  searchList.push(startCoordinates);

  if (startCoordinates[0] == endCoordinates[0] && startCoordinates[1] == endCoordinates[1]) {
    return sofar;
  }
  var lastFailSet = false;

  while (newPD.length > 0) {
    if (newPD.charAt(newPD.length - 1) == 'u') {
      var res = stepUp(sofar, startCoordinates, endCoordinates, pd.slice(0, pd.length), lastFail, path);
      if (res != null) { return res; }
      newPD = newPD.slice(0, newPD.length - 1);
      if (!lastFailSet) { lastFailSet = true; lastFail = 'u'; }
    }
    if (newPD.charAt(newPD.length - 1) == 'd') {
      var res = stepDown(sofar, startCoordinates, endCoordinates, pd.slice(0, pd.length), lastFail, path);
      if (res != null) { return res; }
      newPD = newPD.slice(0, newPD.length - 1);
      if (!lastFailSet) { lastFailSet = true; lastFail = 'd'; }
    }
    if (newPD.charAt(newPD.length - 1) == 'l') {
      var res = stepLeft(sofar, startCoordinates, endCoordinates, pd.slice(0, pd.length), lastFail, path);
      if (res != null) { return res; }
      newPD = newPD.slice(0, newPD.length - 1);
      if (!lastFailSet) { lastFailSet = true; lastFail = 'l'; }
    }
    if (newPD.charAt(newPD.length - 1) == 'r') {
      var res = stepRight(sofar, startCoordinates, endCoordinates, pd.slice(0, pd.length), lastFail, path);
      if (res != null) { return res; }
      newPD = newPD.slice(0, newPD.length - 1);
      if (!lastFailSet) { lastFailSet = true; lastFail = 'r'; }
    }
  }

  return null;
}

function opposite(str) {
  if (str.charAt(0) == 'u') { return 'd'; }
  if (str.charAt(0) == 'd') { return 'u'; }
  if (str.charAt(0) == 'l') { return 'r'; }
  if (str.charAt(0) == 'r') { return 'l'; }
  return '';
}

function stepUp(sofar, startCoordinates, endCoordinates, pd, lastFail, path) {
  if (lastFail.charAt(0) == 'u') { lastFail = opposite(pd.charAt(pd.length - 1)); }
  var after = startCoordinates[0] - 1;
  var contains = searchList.some(elem => {
    return (JSON.stringify(after) === JSON.stringify(elem[0]) && JSON.stringify(startCoordinates[1]) === JSON.stringify(elem[1]));
  });
  if (after >= 0 && (document.getElementById('p-' + after + '-' + startCoordinates[1]).className.includes('void')
                  || document.getElementById('p-' + after + '-' + startCoordinates[1]).className.includes('spikes')) && !contains) {
    var res = recursion(sofar, [after, startCoordinates[1]], endCoordinates, pd + 'u', lastFail, path);
    if (res != null) {
      if (path) { path1.push(startCoordinates); }
      else { path2.push(startCoordinates); }
      return res;
    }
  }
  return null;
}

function stepDown(sofar, startCoordinates, endCoordinates, pd, lastFail, path) {
  if (lastFail.charAt(0) == 'd') { lastFail = opposite(pd.charAt(pd.length - 1)); }
  var after = startCoordinates[0] + 1;
  var contains = searchList.some(elem => {
    return (JSON.stringify(after) === JSON.stringify(elem[0]) && JSON.stringify(startCoordinates[1]) === JSON.stringify(elem[1]));
  });
  if (after <= 12 && (document.getElementById('p-' + after + '-' + startCoordinates[1]).className.includes('void')
                   || document.getElementById('p-' + after + '-' + startCoordinates[1]).className.includes('spikes')) && !contains) {
    var res = recursion(sofar, [after, startCoordinates[1]], endCoordinates, pd + 'd', lastFail, path);
    if (res != null) {
      if (path) { path1.push(startCoordinates); }
      else { path2.push(startCoordinates); }
      return res;
    }
  }
  return null;
}

function stepLeft(sofar, startCoordinates, endCoordinates, pd, lastFail, path) {
  if (lastFail.charAt(0) == 'l') { lastFail = opposite(pd.charAt(pd.length - 1)); }
  var after = startCoordinates[1] - 1;
  var contains = searchList.some(elem => {
    return (JSON.stringify(after) === JSON.stringify(elem[1]) && JSON.stringify(startCoordinates[0]) === JSON.stringify(elem[0]));
  });
  if (after >= 0 && (document.getElementById('p-' + (startCoordinates[0]) + '-' + (after)).className.includes('void')
                  || document.getElementById('p-' + (startCoordinates[0]) + '-' + (after)).className.includes('spikes')) && !contains) {
    var res = recursion(sofar, [startCoordinates[0], after], endCoordinates, pd + 'l', lastFail, path);
    if (res != null) {
      if (path) { path1.push(startCoordinates); }
      else { path2.push(startCoordinates); }
      return res;
    }
  }
  return null;
}

function stepRight(sofar, startCoordinates, endCoordinates, pd, lastFail, path) {
  if (lastFail.charAt(0) == 'r') { lastFail = opposite(pd.charAt(pd.length - 1)); }
  var after = startCoordinates[1] + 1;
  var contains = searchList.some(elem => {
    return (JSON.stringify(after) === JSON.stringify(elem[1]) && JSON.stringify(startCoordinates[0]) === JSON.stringify(elem[0]));
  });
  if (after <= 14 && (document.getElementById('p-' + (startCoordinates[0]) + '-' + (after)).className.includes('void')
                   || document.getElementById('p-' + (startCoordinates[0]) + '-' + (after)).className.includes('spikes')) && !contains) {
    var res = recursion(sofar, [startCoordinates[0], after], endCoordinates, pd + 'r', lastFail, path);
    if (res != null) {
      if (path) { path1.push(startCoordinates); }
      else { path2.push(startCoordinates); }
      return res;
    }
  }
  return null;
}

function buildButtonClick(button, buildType) {
  var temp = button.className;

  document.getElementById('shopb-0-0').className = 'btn btn-shop';
  document.getElementById('shopb-0-1').className = 'btn btn-shop';
  document.getElementById('shopb-0-2').className = 'btn btn-shop';
  document.getElementById('shopb-1-0').className = 'btn btn-shop';
  document.getElementById('shopb-1-1').className = 'btn btn-shop';
  document.getElementById('shopb-1-2').className = 'btn btn-shop';
  document.getElementById('shopb-2-0').className = 'btn btn-shop';
  document.getElementById('shopb-2-1').className = 'btn btn-shop';
  document.getElementById('shopb-2-2').className = 'btn btn-shop';
  document.getElementById('shopb-3-0').className = 'btn btn-shop';

  button.className = temp;

  if (equalStrings(button.className, 'btn btn-selected')) { button.className = 'btn btn-shop'; buildType = ''; }
  else { button.className = 'btn btn-selected'; }

  building = buildType;
}

function generateField() {
  field = [];
  fieldButtons = [];

  createPlace(0, 0, 'img2 img2-start' , 'position:absolute; margin-top: 50px;', 'absolute', 460          , 41 + 4 * 64, 'smallimageholder');
  createPlace(0, 0, 'img2 img2-start' , 'position:absolute; margin-top: 50px;', 'absolute', 460          , 41 + 8 * 64, 'smallimageholder');
  createPlace(0, 0, 'img2 img2-finish', 'position:absolute; margin-top: 50px;', 'absolute', 460 + 14 * 64, 41 + 6 * 64, 'smallimageholder');

  for (var i = 0; i < 13; i++) {
    var row = [];
    var buttonRow = [];
    for (var j = 0; j < 15; j++) {
      var marLeft = 442 + j * 64;
      var marTop = 25 + i * 64;
      var place;
      var placeButton;

      if (i == 0                                         //upper border
       || i == 12                                        //lower border
       || (j == 0 && (i != start1[0] && i != start2[0])) //left border
       || (j == 14 && i != finish[0])                    //right border
       || ((j == 5 || j == 6 || j == 7) && i == 6)
       || (j == 4 && i > 3)
       || (i == 9 && (j == 7 || j == 8 || j == 9))
       || (j == 10 && (Math.abs(i - 6) < 4 || i < 6))
      ) {
        var rdm = Math.random();
               if (rdm < (1.0 / 6.0)) { place = createPlace(i, j, 'img img-stone1', 'position:absolute;', 'absolute', marLeft, marTop, 'largeimageholder'); }
        else { if (rdm < (2.0 / 6.0)) { place = createPlace(i, j, 'img img-stone2', 'position:absolute;', 'absolute', marLeft, marTop, 'largeimageholder'); }
        else { if (rdm < (3.0 / 6.0)) { place = createPlace(i, j, 'img img-stone3', 'position:absolute;', 'absolute', marLeft, marTop, 'largeimageholder'); }
        else { if (rdm < (4.0 / 6.0)) { place = createPlace(i, j, 'img img-stone4', 'position:absolute;', 'absolute', marLeft, marTop, 'largeimageholder'); }
        else { if (rdm < (5.0 / 6.0)) { place = createPlace(i, j, 'img img-stone5', 'position:absolute;', 'absolute', marLeft, marTop, 'largeimageholder'); }
        else {                          place = createPlace(i, j, 'img img-stone6', 'position:absolute;', 'absolute', marLeft, marTop, 'largeimageholder'); } } } } }
      }
      else { place = createPlace(i, j, 'img img-void', 'position:absolute; margin-top: 50px;', 'absolute', marLeft, marTop, 'largeimageholder'); }

      placeButton = createButton(i, j, 'btn btn-fld', 'position:absolute; margin-top: 64px;', 'absolute', marLeft + 18, marTop + 5, '', '');

      place.style.zIndex = '' + (1000 * place.style.marginTop + place.style.marginLeft);
      row.push(place);
      buttonRow.push(placeButton);
    }
    field.push(row);
    fieldButtons.push(buttonRow);
  }
}

function changeImage(plc, cN, isClicked) {

  if(building.charAt(0) == 'v') { return; }

  var split = plc.split('-');
  var newID = 'p-' + split[1] + '-' + split[2];
  var place = document.getElementById(newID);

  if(building.charAt(0) == 't' && !place.className.includes('stone') && isClicked)  {
    const index = towers.indexOf(place);
    if (index > -1) { towers.splice(index, 1); }
    place.children.remove;
    place.remove();

    place.className = 'void';
    place.dmg       = '';
    place.radius    = '';
    place.delay     = '';
    place.price     = '';
  }

  var tempClassName = place.className;

  if (place.id.charAt(4) == '0' || (!place.className.includes('void') && !place.className.includes('trans'))) { return; }

  if (place.className.includes('trans')) {
    if (isClicked) { place.className = cN; }
    place.className = 'img img-void';
  }

  if (place.className == 'img img-void' && building.charAt(0) != 'v') {
    place.className = cN;
  }

  var temp1 = reversePath(reversePath(path1));
  var temp2 = reversePath(reversePath(path2));
  path1 = [];
  path2 = [];
  var p1 = generatePath([4, 0], [6, 14], true);
  var p2 = generatePath([8, 0], [6, 14], false);
  path1 = check(optimize(reversePath(path1)));
  path2 = check(optimize(reversePath(path2)));

  if (!p1 || !p2 ) {
    place.className = tempClassName;
    path1 = reversePath(reversePath(temp1));
    path2 = reversePath(reversePath(temp2));
    return;
  }
  path1 = reversePath(reversePath(temp1));
  path2 = reversePath(reversePath(temp2));

  if(isClicked) {
    var tempMoney = document.getElementById('money').textContent;
    var money = parseInt(tempMoney.slice(1, tempMoney.length));
    place.lastShot = '0';
    place.type = building;

    switch (building.charAt(0)) {
      case 'c':
        if(money - 10 < 0) { place.className = tempClassName; return; }
        place.dmg = '0';
        place.radius = '0';
        place.delay = '1000000';
        place.bulletTime = '0';
        place.price = '10';
        document.getElementById('money').textContent = '$' + (money - 10);
        break;

      case 's':
        if(money - 20 < 0) { place.className = tempClassName; return; }
        place.dmg = '1';
        place.radius = '32';
        place.delay = '200';
        place.bulletTime = '0';
        place.price = '20';
        document.getElementById('money').textContent = '$' + (money - 20);
        break;

      case 'n':
        if(money - 50 < 0) { place.className = tempClassName; return; }
        place.dmg = '5';
        place.radius = '150';
        place.delay = '1000';
        place.bulletTime = '300';
        place.price = '50';
        document.getElementById('money').textContent = '$' + (money - 50);
        break;

      case 'm':
        if(money - 70 < 0) { place.className = tempClassName; return; }
        place.dmg = '15';
        place.radius = '250';
        place.delay = '3000';
        place.bulletTime = '1000';
        place.price = '70';
        document.getElementById('money').textContent = '$' + (money - 70);
        break;


      case 'l':
        if(money - 400 < 0) { place.className = tempClassName; return; }
        place.dmg = '1';
        place.radius = '125';
        place.delay = '10';
        place.bulletTime = '100';
        place.price = '400';
        document.getElementById('money').textContent = '$' + (money - 400);
        break;

      default:
        break;
    }

    path1 = [];
    path2 = [];
    generatePath([4, 0], [6, 14], true);
    generatePath([8, 0], [6, 14], false);
    path1 = check(optimize(reversePath(path1)));
    path2 = check(optimize(reversePath(path2)));
    towers.push(place);
    showPath();
  }
}

function createPlace(i, j, cN, stil, position, marLeft, marTop, divCN) {
  var place = document.createElement('image');
  place.id = ('p-' + i + '-' + j);
  place.className = cN;
  place.style = stil;
  place.style.position = position;
  place.style.marginLeft = '' + marLeft + 'px';
  place.style.marginTop = '' + marTop + 'px';
  place.style.zIndex = 10;
  place.type = 'void';

  var div = document.createElement('div');
  div.className = divCN;
  div.appendChild(place)

  document.body.appendChild(div);
  return place;
}

function createButton(i, j, cN, stil, position, marLeft, marTop, text, shop) {
  var button = document.createElement('button');
  button.id = ('' + shop + 'b-' + i + '-' + j);
  button.className = cN;
  button.style = stil;
  button.style.position = position;
  button.style.marginLeft = '' + marLeft + 'px';
  button.style.marginTop = '' + marTop + 'px';
  button.style.color = '#f00';
  button.style.fontSize = '20px';
  button.style.paddingTop = '40px';
  button.style.paddingLeft = '30px';
  button.textContent = text;
  button.style.zIndex = 15;

  if (cN === 'btn btn-fld') {
    button.addEventListener('mouseover', () => {
      changeImage(button.id, 'img img-' + building + ' img-trans', false);
      if (building.charAt(0) == 'n') {
        var btnCoords = coordinatesOnField(i, j);
        var circle = document.getElementById('circle');
        circle.style.opacity = 0.3;
        circle.style.width = '300px';
        circle.style.height = '300px';
        circle.style.marginTop = '' + (btnCoords[0] - 180) + 'px';
        circle.style.marginLeft = '' + (btnCoords[1] - 103) + 'px';
      }
      if (building.charAt(0) == 'm') {
        var btnCoords = coordinatesOnField(i, j);
        var circle = document.getElementById('circle');
        circle.style.opacity = 0.3;
        circle.style.width = '500px';
        circle.style.height = '500px';
        circle.style.marginTop = '' + (btnCoords[0] - 180 - 100) + 'px';
        circle.style.marginLeft = '' + (btnCoords[1] - 103 - 100) + 'px';
      }
      if (building.charAt(0) == 'l') {
        var btnCoords = coordinatesOnField(i, j);
        var circle = document.getElementById('circle');
        circle.style.opacity = 0.3;
        circle.style.width = '250px';
        circle.style.height = '250px';
        circle.style.marginTop = '' + (btnCoords[0] - 55 - 100) + 'px';
        circle.style.marginLeft = '' + (btnCoords[1] +22 - 100) + 'px';
      }
    });
    button.addEventListener('mouseleave', () => {
      changeImage(button.id, 'img img-void', false);
      var circle = document.getElementById('circle');
      circle.style.opacity = 0.0;
    });
    button.addEventListener('click', () => {
      if (!(building === 'void')) {
        changeImage(button.id, 'img img-' + building, true);
      }
    });
  }

  document.body.appendChild(button);
  return button;
}

Number.prototype.mod = function(n) {
  return ((this%n)+n)%n;
};

function preloadImages() {
  var image = new Image(); image.src = "res/Buildings/stone1.png";
  var image = new Image(); image.src = "res/Buildings/stone2.png";
  var image = new Image(); image.src = "res/Buildings/stone3.png";
  var image = new Image(); image.src = "res/Buildings/stone4.png";
  var image = new Image(); image.src = "res/Buildings/stone5.png";
  var image = new Image(); image.src = "res/Buildings/stone6.png";

  var image = new Image(); image.src = "res/Entities/bike/bike_up.png";
  var image = new Image(); image.src = "res/Entities/bike/bike_down.png";
  var image = new Image(); image.src = "res/Entities/bike/bike_left.png";
  var image = new Image(); image.src = "res/Entities/bike/bike_right.png";

  var image = new Image(); image.src = "res/Entities/jeep/jeep_up.png";
  var image = new Image(); image.src = "res/Entities/jeep/jeep_down.png";
  var image = new Image(); image.src = "res/Entities/jeep/jeep_left.png";
  var image = new Image(); image.src = "res/Entities/jeep/jeep_right.png";

  var image = new Image(); image.src = "res/Entities/lorry/lorry_up.png";
  var image = new Image(); image.src = "res/Entities/lorry/lorry_down.png";
  var image = new Image(); image.src = "res/Entities/lorry/lorry_left.png";
  var image = new Image(); image.src = "res/Entities/lorry/lorry_right.png";

  var image = new Image(); image.src = "res/Entities/lav/lav_up.png";
  var image = new Image(); image.src = "res/Entities/lav/lav_down.png";
  var image = new Image(); image.src = "res/Entities/lav/lav_left.png";
  var image = new Image(); image.src = "res/Entities/lav/lav_right.png";

  var image = new Image(); image.src = "res/Entities/tank/tank_up.png";
  var image = new Image(); image.src = "res/Entities/tank/tank_down.png";
  var image = new Image(); image.src = "res/Entities/tank/tank_left.png";
  var image = new Image(); image.src = "res/Entities/tank/tank_right.png";

  var image = new Image(); image.src = "res/Entities/explosion.gif";

  var image = new Image(); image.src = "res/Buildings/Towers/laser/laser.png";
  var image = new Image(); image.src = "res/Buildings/Towers/laser/laser_fire.png";

  var image = new Image(); image.src = "res/Buildings/Towers/spikes/spikes.png";

  var image = new Image(); image.src = "res/Buildings/Towers/crate/crate.png";

  var image = new Image(); image.src = "res/UI/soundon.png";
  var image = new Image(); image.src = "res/UI/soundoff.png";

  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_rightdown.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_up.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_upupright.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_upright.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_uprightright.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_right.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_rightdown.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_rightdown.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_rightdowndown.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_down.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_downleftleft.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_downleft.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_downdownleft.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_left.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_leftleftup.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_leftup.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/normal_leftupup.png";

  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_rightdown.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_up.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_upupright.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_upright.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_uprightright.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_right.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_rightdown.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_rightdown.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_rightdowndown.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_down.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_downleftleft.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_downleft.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_downdownleft.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_left.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_leftleftup.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_leftup.png";
  var image = new Image(); image.src = "res/Buildings/Towers/normal/fire/normal_leftupup.png";

  var image = new Image(); image.src = "res/Buildings/Towers/mortar/mortar_up.png";
  var image = new Image(); image.src = "res/Buildings/Towers/mortar/mortar_down.png";
  var image = new Image(); image.src = "res/Buildings/Towers/mortar/mortar_left.png";
  var image = new Image(); image.src = "res/Buildings/Towers/mortar/mortar_right.png";
  var image = new Image(); image.src = "res/Buildings/Towers/mortar/fire/mortar_up.png";
  var image = new Image(); image.src = "res/Buildings/Towers/mortar/fire/mortar_down.png";
  var image = new Image(); image.src = "res/Buildings/Towers/mortar/fire/mortar_left.png";
  var image = new Image(); image.src = "res/Buildings/Towers/mortar/fire/mortar_right.png";

  var image = new Image(); image.src = "res/UI/start.png";
  var image = new Image(); image.src = "res/UI/finish.png";

  var image = new Image(); image.src = "res/Buildings/road1.png";
  var image = new Image(); image.src = "res/Buildings/road1.png";
  var image = new Image(); image.src = "res/Buildings/road2.png";
  var image = new Image(); image.src = "res/Buildings/road3.png";

  var image = new Image(); image.src = "res/UI/health/health_0.png";
  var image = new Image(); image.src = "res/UI/health/health_1.png";
  var image = new Image(); image.src = "res/UI/health/health_2.png";
  var image = new Image(); image.src = "res/UI/health/health_3.png";
  var image = new Image(); image.src = "res/UI/health/health_4.png";
  var image = new Image(); image.src = "res/UI/health/health_5.png";
  var image = new Image(); image.src = "res/UI/health/health_6.png";
  var image = new Image(); image.src = "res/UI/health/health_7.png";
  var image = new Image(); image.src = "res/UI/health/health_8.png";
  var image = new Image(); image.src = "res/UI/health/health_9.png";
  var image = new Image(); image.src = "res/UI/health/health_10.png";
  var image = new Image(); image.src = "res/UI/health/health_11.png";
  var image = new Image(); image.src = "res/UI/health/health_12.png";
  var image = new Image(); image.src = "res/UI/health/health_13.png";
  var image = new Image(); image.src = "res/UI/health/health_14.png";
  var image = new Image(); image.src = "res/UI/health/health_15.png";
  var image = new Image(); image.src = "res/UI/health/health_16.png";
  var image = new Image(); image.src = "res/UI/health/health_17.png";
  var image = new Image(); image.src = "res/UI/health/health_18.png";
  var image = new Image(); image.src = "res/UI/health/health_19.png";
  var image = new Image(); image.src = "res/UI/health/health_20.png";
  var image = new Image(); image.src = "res/UI/health/health_21.png";
  var image = new Image(); image.src = "res/UI/health/health_22.png";
  var image = new Image(); image.src = "res/UI/health/health_23.png";
  var image = new Image(); image.src = "res/UI/health/health_24.png";
  var image = new Image(); image.src = "res/UI/health/health_25.png";
  var image = new Image(); image.src = "res/UI/health/health_26.png";
  var image = new Image(); image.src = "res/UI/health/health_27.png";
  var image = new Image(); image.src = "res/UI/health/health_28.png";
  var image = new Image(); image.src = "res/UI/health/health_29.png";
  var image = new Image(); image.src = "res/UI/health/health_30.png";
  var image = new Image(); image.src = "res/UI/health/health_31.png";
  var image = new Image(); image.src = "res/UI/health/health_32.png";
  var image = new Image(); image.src = "res/UI/health/health_33.png";
  var image = new Image(); image.src = "res/UI/health/health_34.png";
  var image = new Image(); image.src = "res/UI/health/health_35.png";
  var image = new Image(); image.src = "res/UI/health/health_36.png";
  var image = new Image(); image.src = "res/UI/health/health_37.png";
  var image = new Image(); image.src = "res/UI/health/health_38.png";
  var image = new Image(); image.src = "res/UI/health/health_39.png";
  var image = new Image(); image.src = "res/UI/health/health_40.png";
  var image = new Image(); image.src = "res/UI/health/health_41.png";
}

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