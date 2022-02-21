window.onload = () => {
  const canvasEl = document.querySelector("#game");

  canvasEl.width = parseInt(window.innerWidth) - 20;
  canvasEl.height = parseInt(window.innerHeight) - 20;

  game.start();
};
