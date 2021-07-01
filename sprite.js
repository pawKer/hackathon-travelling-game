class Sprite {
  dy = 5;
  image = document.getElementById("explorer");

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 50;
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
      if (this.y < 0) {
        this.y = 0;
      }
    }
  };

  draw = () => {
    ctx.beginPath();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.closePath();
  };
}
