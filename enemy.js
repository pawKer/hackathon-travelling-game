class Enemy {
  dx;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.inContact = false;

    this.newSpeed();
  }

  getSpeed = () => getRandomIntInclusive(4, 7);

  newSpeed = () => (this.dx = this.getSpeed());

  clear = () => ctx.clearRect(this.x, this.y, this.width, this.height);

  reset = () => {
    this.clear();
    this.x = canvas.width;
    this.y = getRandomIntInclusive(0, canvas.height);
    this.newSpeed();
  };

  move = () => {
    this.x -= this.dx;

    if (this.x + this.width <= 0) {
      this.reset();
    }
  };

  draw = () => {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#8a44bd";
    ctx.fill();
    ctx.closePath();
  };
}
