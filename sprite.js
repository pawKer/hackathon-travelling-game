class Sprite {
  dy = 5;
  explodeTime;
  runSpeed = 4;
  image_1 = document.getElementById("explorer_1");
  image_2 = document.getElementById("explorer_2");
  image_explode = document.getElementById("explorer_explode");

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 50;
    this.isExplode = false;
  }

  clear = () => ctx.clearRect(this.x, this.y, this.width, this.height);

  move = () => {
    if (downPressed) {
      this.y += this.dy;
      if (this.y + this.height > canvas.height) {
        this.y = canvas.height - this.height;
      }
    } else if (upPressed) {
      this.y -= this.dy;
      if (this.y < 225) {
        this.y = 225;
      }
    }
  };

  explode = (secondsSinceStart) => {
    this.isExplode = true;
    this.explodeTime = secondsSinceStart;
  }

  updateExplodeStatus(secondsSinceStart) {
    if(this.isExplode){
      if(secondsSinceStart - this.explodeTime > 0.5){
        this.isExplode = false;
      }
    }
  }

  draw = (secondsSinceStart) => {
    this.updateExplodeStatus(secondsSinceStart);
    ctx.beginPath();
    if(this.isExplode) {
      ctx.drawImage(this.image_explode, this.x, this.y, this.width, this.height);
    }else if(Math.floor(secondsSinceStart * this.runSpeed) % 2 == 0){
      ctx.drawImage(this.image_1, this.x, this.y, this.width, this.height);
    }else {
      ctx.drawImage(this.image_2, this.x, this.y, this.width, this.height);
    }
    ctx.closePath();
  };
}
