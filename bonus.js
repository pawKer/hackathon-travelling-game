class Bonus {
  dx = 7;
  image = document.getElementById("bonus");

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 20;
    this.inContact = false;
  }

  clear = () => ctx.clearRect(this.x, this.y, this.width, this.height);

  reset = () => {
    this.clear();
    this.x = canvas.width + 5000;
    this.y = getRandomIntInclusive(225, canvas.height);
  };

  move = () => {
    this.x -= this.dx;

    if (this.x + this.width <= 0) {
      this.reset();
    }
  };

  draw = () => {
    ctx.beginPath();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.closePath();
  };
}
