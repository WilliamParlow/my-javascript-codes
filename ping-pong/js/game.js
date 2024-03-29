const PLAYER_HEIGHT = 100;
const HALF_PLAYER_HEIGHT = PLAYER_HEIGHT / 2;

const game = {
  canvasEl: undefined,
  /** @type {CanvasRenderingContext2D} */
  ctx: undefined,

  GAME_WIDTH: 0,
  GAME_HEIGHT: 0,
  PLAYER_SPEED: 0,
  BALL_XSPEED: 0,
  BALL_YSPEED_DIVIDER: 0,

  animationId: undefined,
  intervalId: undefined,
  isAlive: true,
  isDown: false,
  isUp: false,

  player: {},
  npc: {},
  ball: {},

  start: () => {
    game.canvasEl = document.querySelector("#game");
    game.ctx = game.canvasEl.getContext("2d");
    game.GAME_WIDTH = parseInt(game.canvasEl.width);
    game.GAME_HEIGHT = parseInt(game.canvasEl.height);
    game.PLAYER_SPEED = 4;
    game.BALL_XSPEED = 5;
    game.BALL_YSPEED_DIVIDER = 20;
    game.isAlive = true;
    game.isDown = false;
    game.isUp = false;
    
    game.intervalId = setInterval(() => {
      if (game.PLAYER_SPEED < 5) game.PLAYER_SPEED += 1;
      if (game.BALL_XSPEED < 12) game.BALL_XSPEED += 1;
      if (game.BALL_YSPEED_DIVIDER > 1) game.BALL_YSPEED_DIVIDER -= 1;
    }, 10000)

    game.player = {
      ySpeed: 0,
      winner: false,
      height: 100,
      width: 10,
      pos: {
        x: 0,
        y: game.GAME_HEIGHT / 2 - 100 / 2,
      },
    };

    game.npc = {
      ySpeed: 0,
      winner: false,
      height: 100,
      width: 10,
      pos: {
        x: game.GAME_WIDTH - 10,
        y: game.GAME_HEIGHT / 2 - 100 / 2 - 30,
      },
    };

    const direction = parseInt(Math.random() * 10) >= 5 ? "r" : "l";
    game.ball = {
      radius: 8,
      direction: direction,
      xSpeed: direction == "r" ? game.BALL_XSPEED : -game.BALL_XSPEED,
      ySpeed: 0,
      pos: {
        x: game.GAME_WIDTH / 2,
        y: game.GAME_HEIGHT / 2,
      },
    };

    window.onkeydown = (e) => {
      if (e.keyCode == 38 && !game.isUp) {
        game.isUp = true;
      } else if (e.keyCode == 40 && !game.isDown) {
        game.isDown = true;
      }
    };

    window.onkeyup = (e) => {
      if (e.keyCode == 38 && game.isUp) {
        game.isUp = false;
      } else if (e.keyCode == 40 && game.isDown) {
        game.isDown = false;
      }
    };
    
    window.ontouchstart = (e) => {
      e.preventDefault();
      if (e.touches[0].clientY < game.GAME_HEIGHT / 2) {
        game.isUp = true;
      } else {
        game.isDown = true;
      }
    };

    window.ontouchend = (e) => {
      e.preventDefault();
      game.isUp = false;
      game.isDown = false;
    };

    game.animationId = requestAnimationFrame(game.updateGameWindow);
  },

  updateGameWindow: () => {
    game.ctx.clearRect(0, 0, game.GAME_WIDTH, game.GAME_HEIGHT);

    if (game.isAlive) {
      game.updatePlayerPosition();
      game.updateNpcPosition();
      game.drawPlayer(game.player, game.npc);

      game.updateBallDirectionFromTopAndDownWall();
      game.updateBallDirectionAndPosition(game.ball);
      game.drawBall(game.ball);
      game.isBallScored(game.ball);

      game.animationId = requestAnimationFrame(game.updateGameWindow);
    } else {
      game.showGameOver();
      cancelAnimationFrame(game.animationId);
      clearInterval(game.intervalId);
      game.start();
    }
  },

  showGameOver: () => {
    const winner = game.player.winner
      ? "PLAYER is the winner"
      : "NPC is the winner!";
    alert(`Game over!\n${winner}`);
  },

  drawPlayer: (...players) => {
    game.ctx.fillStyle = "#900";
    players.forEach((p) => {
      game.ctx.fillRect(p.pos.x, p.pos.y, p.width, p.height);
    });
  },

  drawBall: (ball) => {
    game.ctx.fillStyle = "#000";
    game.ctx.beginPath();
    game.ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, Math.PI * 2);
    game.ctx.fill();
  },

  isBallScored: (ball) => {
    isNpcDead = ball.pos.x > game.GAME_WIDTH;
    isPlayerDead = ball.pos.x < 0;

    if (isNpcDead || isPlayerDead) {
      game.isAlive = false;
      isPlayerDead ? (game.npc.winner = true) : (game.player.winner = true);
    }
  },

  updateBallDirectionFromTopAndDownWall: () => {
    if (game.ball.pos.y < 0 || game.ball.pos.y > game.GAME_HEIGHT)
      game.ball.ySpeed *= -1;
  },

  updateBallDirectionAndPosition: (ball) => {
    const ballX = ball.pos.x;
    const ballY = ball.pos.y;

    const playerX = game.player.pos.x;
    const playerY = game.player.pos.y;
    const playerWidthAndX = game.player.width + game.player.pos.x;
    const playerHeightAndY = game.player.height + game.player.pos.y;

    const npcX = game.npc.pos.x;
    const npcY = game.npc.pos.y;
    const npcWidthAndX = game.npc.pos.x - game.npc.width;
    const npcHeightAndY = game.npc.height + game.npc.pos.y;

    if (
      ballX > playerX &&
      ballX < playerWidthAndX &&
      ballY > playerY &&
      ballY < playerHeightAndY
    ) {
      game.ball.direction = "r";
      const ballAngleDelta =
        2.5 * (ballY - (playerHeightAndY - game.player.height / 2));

      if (ballAngleDelta < 0 || ballAngleDelta > 0) {
        game.ball.ySpeed = parseInt(ballAngleDelta / game.BALL_YSPEED_DIVIDER);
      } else {
        game.ball.ySpeed = 0;
      }
    } else if (
      ballX < npcX &&
      ballX > npcWidthAndX &&
      ballY > npcY &&
      ballY < npcHeightAndY
    ) {
      game.ball.direction = "l";
      const ballAngleDelta =
        2.5 * (ballY - (npcHeightAndY - game.npc.height / 2));

      if (ballAngleDelta < 0 || ballAngleDelta > 0) {
        game.ball.ySpeed = parseInt(ballAngleDelta / game.BALL_YSPEED_DIVIDER);
      } else {
        game.ball.ySpeed = 0;
      }
    }

    game.updateBallPosition(game.ball);
  },

  updateBallPosition: (ball) => {
    if (ball.direction == "r" && ball.xSpeed < 0) {
      game.ball.xSpeed = game.BALL_XSPEED;
    } else if (ball.direction == "l" && ball.xSpeed > 0) {
      game.ball.xSpeed = -game.BALL_XSPEED;
    }

    game.ball.pos.x += game.ball.xSpeed;
    game.ball.pos.y += game.ball.ySpeed;
  },

  updatePlayerPosition: () => {
    if (game.isUp) game.player.ySpeed = -game.PLAYER_SPEED;
    else if (game.isDown) game.player.ySpeed = game.PLAYER_SPEED;
    else game.player.ySpeed = 0;

    game.player.pos.y += game.player.ySpeed;
  },
  updateNpcPosition: () => {
    const ballY = game.ball.pos.y;
    const npc = game.npc;
    const middleNpcDeltaPosition = npc.pos.y + npc.height / 2;

    if (ballY > middleNpcDeltaPosition + 10) game.npc.ySpeed = game.PLAYER_SPEED;
    else if (ballY < middleNpcDeltaPosition - 10) game.npc.ySpeed = -game.PLAYER_SPEED;
    else game.npc.ySpeed = 0;

    game.npc.pos.y += game.npc.ySpeed;
  },
};
