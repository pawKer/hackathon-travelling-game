var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var scoreElement = document.getElementById("score");
var timeElement = document.getElementById("time");
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const START_TIME = new Date();
var upPressed = false;
var downPressed = false;

var points = 500;
var gameOver = false;

var spriteX = 20;
var spriteY = 40;
var sprite = new Sprite(spriteX, spriteY);

var enemyCount = 10;
var enemies = [];
addEnemies(enemyCount);

function draw() {
  if (!gameOver) {
    updateTime();
    
    enemies.forEach((enemy, idx) => {
      checkEnemyCollision(enemy);

      sprite.clear();
      enemy.clear();
      if (idx === 0) {
        sprite.move();
      }
      enemy.move();

      sprite.draw();
      enemy.draw();
    });
    updateScore();
    checkGameOver();
  }
}
function updateTime() {
  var currentTime = new Date();
  var secondsSinceStart = (currentTime.getTime() - START_TIME.getTime()) / 1000;
  timeElement.innerText =  "Time: " + secondsSinceStart + "s";
}

function updateScore() {
  scoreElement.innerText = "Score: " + points;
}

function checkGameOver() {
  if (points <= 0) {
    gameOver = true;
    points = 0;
    updateScore();
    setTimeout(() => alert("Game Over!!"), 100);
  }
}

function checkEnemyCollision(enemy) {
  if (
    sprite.x < enemy.x + enemy.width &&
    sprite.x + sprite.width > enemy.x &&
    sprite.y < enemy.y + enemy.height &&
    sprite.y + sprite.height > enemy.y
  ) {
    if (!enemy.inContact) {
      points -= 100;
      enemy.inContact = true;
      enemy.reset();
    }
  } else {
    enemy.inContact = false;
  }
}

function keyDownHandler(e) {
  if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
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

function addEnemies(enemyCount) {
  for (let i = 0; i < enemyCount; i++) {
    enemies.push(
      new Enemy(canvas.width, getRandomIntInclusive(0, canvas.height))
    );
  }
}

setInterval(draw, 10);
