const Ball = {
  checkHit: function (paddle) {
    return this.x > paddle.x && 
      this.x < paddle.x + paddle.width &&
      this.y + this.side > paddle.y &&
      this.y < paddle.y + paddle.height
  },

  init: function (side, gameWindow, x, y, xSpeed = 4, ySpeed = 0, color = '#fff') {
    this.side = side;
    this.x = this.initX = x || (gameWindow.width - side) / 2;
    this.y = this.initY = y || (gameWindow.height - side) / 2;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.color = color;
  },

  render: function (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.side, this.side);
  },

  reset: function () {
    this.x = this.initX;
    this.y = this.initY;
    this.ySpeed = 0;
    this.xSpeed = 3;
  },

  update: function () {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
};

module.exports = Ball;