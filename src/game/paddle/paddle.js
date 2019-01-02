const Paddle = {
  init: function (x, y, width, height, xSpeed = 0, ySpeed = 0, color = '#fff') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.color = color;
  },

  render: function (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
};

module.exports = Paddle;