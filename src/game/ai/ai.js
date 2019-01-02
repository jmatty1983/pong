const Paddle = require('../paddle/paddle');

const Ai = Object.create(Paddle);
Ai.update = function(ball) {
  const paddleCenter = this.y + (this.height / 2);
  if (paddleCenter - 10 > ball.y) {
    this.y -= 4;
  } else if (paddleCenter + 10 < ball.y) {
    this.y += 4;
  }
};

module.exports = Ai;