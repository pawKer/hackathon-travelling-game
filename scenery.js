class Scenery {
  dx = 3;

  constructor(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  clear = () => ctx.clearRect(this.x, this.y, this.width, this.height);

  reset = () => {
    this.clear();
    this.x = canvas.width;
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
