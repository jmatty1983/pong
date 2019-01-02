const Player = require('./player/player');
const Ai = require('./ai/ai');
const Ball = require('./ball/ball');

const GameObj = {
  height: 400,
  width: 600,
  backgroundColor: '#000',
  foregroundColor: '#fff',
  paddleHeight: 50,
  paddleWidth: 10,
  ballSide: 7,
  keysDown: {},
  playerScore: 0,
  aiScore: 0,

  init: function (height = this.height, width = this.width, paddleHeight = this.paddleHeight, paddleWidth = this.paddleWidth, ballSide = this.ballSide) {
    this.gameWindow = document.createElement('canvas');
    this.gameWindow.height = height;
    this.gameWindow.width = width;
    this.paddleHeight = paddleHeight;
    this.paddleWidth = paddleWidth;
    this.ballSide = ballSide;
    this.context = this.gameWindow.getContext('2d');

    this.player = Object.create(Player);
    this.player.init(10, (height - paddleHeight) / 2, paddleWidth, paddleHeight);

    this.ai = Object.create(Ai);
    this.ai.init(width - paddleWidth - 10, (height - paddleHeight) / 2, paddleWidth, paddleHeight);

    this.ball = Object.create(Ball);
    this.ball.init(7, this.gameWindow);

    window.addEventListener("keydown", event => this.keysDown[event.keyCode] = true);
    window.addEventListener("keyup", event => delete this.keysDown[event.keyCode]);
  },

  render: function () {
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.fillStyle = this.foregroundColor;
    const centerLines = 15;
    const padding = 8;
    for (let i = 0; i < centerLines; i++) {
      const height = (this.height - (centerLines * padding)) / centerLines;

      this.context.fillRect(this.width / 2 + 2.5, (this.height / centerLines) * i, 5, height); 
    }

    this.context.font = "24px Arial";
    this.context.fillText(this.playerScore, (this.width / 2) - 50, 20);
    this.context.fillText(this.aiScore, (this.width / 2) + 50, 20);

    this.player.render(this.context);
    this.ai.render(this.context);
    this.ball.render(this.context);
  },

  start: function () {
    const frame = () => {
      this.update();
      this.render();
      window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  },

  update: function () {
    this.ball.update();
    this.player.update(this.keysDown, this.height);
    this.ai.update(this.ball);

    if (this.ball.x > this.width - this.ball.side) {
      this.playerScore++;
      this.ball.reset();
    } else if (this.ball.x < 0) {
      this.aiScore++;
      this.ball.reset();
    } else if (this.ball.checkHit(this.player)) {
      this.ball.x = this.player.x + this.player.width;
      this.ball.xSpeed = -this.ball.xSpeed
      this.ball.ySpeed = (this.ball.y - (this.player.height / 2) - this.player.y) / 10;
    } else if (this.ball.checkHit(this.ai)) {
      this.ball.x = this.ai.x - this.ball.side;
      this.ball.xSpeed = -this.ball.xSpeed;
      this.ball.ySpeed = (this.ball.y - (this.ai.height / 2) - this.ai.y) / 10;
    }

    if (this.ball.y < 0 || this.ball.y + this.ball.side > this.height) {
      this.ball.ySpeed = -this.ball.ySpeed;
    }
  }
};

module.exports = GameObj;