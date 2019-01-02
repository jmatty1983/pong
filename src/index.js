const GameObj = require('./game/game');

window.onload = () => {
  const game = Object.create( GameObj );
  game.init();

  document.body.appendChild(game.gameWindow);

  game.start();
};