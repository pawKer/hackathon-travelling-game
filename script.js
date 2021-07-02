var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var startScreen = document.getElementById("startScreen");
var endScreen = document.getElementById("endScreen");
var endMessage = document.getElementById("endMessage");

var scoreElement = document.getElementById("score");
var timeElement = document.getElementById("time");
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var palmTree = document.getElementById("palm-tree");
var empire = document.getElementById("empire");
var bigBen = document.getElementById("big-ben");
var hotel = document.getElementById("hotel");
var eiffel = document.getElementById("eiffel-tower");
var rio_jesus = document.getElementById("rio_jesus");
var volcano = document.getElementById("volcano");
var carRental = document.getElementById("car-rental");
var pagode = document.getElementById("pagode");

const START_TIME = new Date();
var secondsSinceStart = 0;

var upPressed = false;
var downPressed = false;

var points = 500;
var gameOver = false;

var spriteX = 20;
var spriteY = 490;
var sprite = new Sprite(spriteX, spriteY);
var wait = 1;
var enemyCount = 3;
var enemies = [];
addEnemies(enemyCount);

var bonus = new Bonus(canvas.width, getRandomIntInclusive(225, canvas.height));

var sceneries = [
  new Scenery(canvas.width, 217, 25, 35, palmTree),
  new Scenery(canvas.width, 217, 25, 35, palmTree),
  new Scenery(canvas.width, 180, 50, 70, empire),
  new Scenery(canvas.width, 200, 30, 50, bigBen),
  new Scenery(canvas.width, 210, 40, 40, hotel),
  new Scenery(canvas.width, 200, 40, 50, eiffel),
  new Scenery(canvas.width, 210, 40, 50, volcano),
  new Scenery(canvas.width, 200, 40, 50, rio_jesus),
  new Scenery(canvas.width, 202, 40, 50, carRental),
  new Scenery(canvas.width, 210, 30, 40, pagode),
];

var sceneryInUse = [];

function draw() {
  if (!gameOver) {
    updateTime();
    increaseEnemies();


    sceneryInUse.forEach((scenery, index) => {
      scenery.clear();
      scenery.move();

      if (scenery.x + this.width <= 0) {
        sceneryInUse.splice(index, 1);
      }
      else {
        scenery.draw();
      }
    });

    enemies.forEach((enemy, idx) => {
      checkEnemyCollision(enemy);

      sprite.clear();
      enemy.clear();

      if (idx === 0) {
        sprite.move();
      }
      enemy.move();

      sprite.draw(secondsSinceStart);
      enemy.draw();
    });

    checkBonusCollision();
    bonus.clear();
    bonus.move();
    bonus.draw();

    updateScore();
    checkGameOver();
  }
}

function moveScenery() {
  roadMarking.x -= 5;
}

function updateTime() {
  var currentTime = new Date();
  secondsSinceStart = (currentTime.getTime() - START_TIME.getTime()) / 1000;
  timeElement.innerText = "Time: " + secondsSinceStart + "s";
}

function updateScore() {
  var elems = document.getElementsByClassName("life");
  let noLives = elems.length;
  if (noLives > points / 100) {
    while (noLives != points / 100) {
      elems[noLives - 1].remove();
      noLives--;
    }
  } else if (points / 100 > noLives) {
    let elem = document.createElement("img");
    elem.src = "images/heart.png";
    elem.className = "life";
    elem.id = "life";
    scoreElement.appendChild(elem);
  } else if (points === 0) {
    scoreElement.innerText = "Game over!";
  }
}

function checkGameOver() {
  if (points <= 0) {
    gameOver = true;
    points = 0;
    updateScore();
    setTimeout(() => {
        endScreen.style.display = "block";
        endMessage.innerText = "You explored the world for "+secondsSinceStart+"s";
    });
  }
}

function checkEnemyCollision(enemy) {
  if (collisionDetected(enemy)) {
    if (!enemy.inContact) {
      points -= 100;
      enemy.inContact = true;
      sprite.explode(secondsSinceStart);
      enemy.reset();
    }
  } else {
    enemy.inContact = false;
  }
}

function checkBonusCollision() {
  if (collisionDetected(bonus)) {
    if (!bonus.inContact) {
      points += 100;
      bonus.inContact = true;
      bonus.reset();
    }
  } else {
    bonus.inContact = false;
  }
}

function collisionDetected(object) {
  return (
    sprite.x < object.x + object.width &&
    sprite.x + sprite.width > object.x &&
    sprite.y < object.y + object.height &&
    sprite.y + sprite.height > object.y
  );
}

function keyDownHandler(e) {
  if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
  } else if(e.which == 32){
      startGame();
  }
}

function keyUpHandler(e) {
  if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function increaseEnemies() {
  if (secondsSinceStart > wait) {
    addEnemies(1);
    wait += 5;
  }
}

function addEnemies(enemyCount) {
  for (let i = 0; i < enemyCount; i++) {
    enemies.push(
      new Enemy(canvas.width, getRandomIntInclusive(225, canvas.height))
    );
  }
}

function newScenary() {
  var selected = sceneries[getRandomIntInclusive(0, (sceneries.length - 1))];

  if (!sceneryInUse.includes(selected)) {
    sceneryInUse.push(selected);
  }
  else{
      newScenary();
  }
}

function startGame(e) {
  if(secondsSinceStart === 0) {
    startScreen.style.display = "none";
    setInterval(draw, 10);
    setInterval(newScenary, 1000);
  }
}

