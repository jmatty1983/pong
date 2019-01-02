const Paddle = require('../paddle/paddle');

const Player = Object.create(Paddle);
Player.update = function(keys, maxHeight) {
  if (keys[38]) {
    this.y -= 4;
    if (this.y < 0) {
      this.y = 0;
    }
  }

  if (keys[40]) {
    this.y += 4;
    if (this.y + this.height > maxHeight) {
      this.y = maxHeight - this.height
    } 
  }
};

module.exports = Player;