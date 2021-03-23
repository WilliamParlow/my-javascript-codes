window.onload = () => {
    (() => {
        const game = {
            canvas_el: null,
            ctx: null,
            passageSize: null,
            obstacleDistance: 200,
            obstacleSize: 100,
            fps: 1000 / 60,
            obstacles: [],
            gameInterval: null,
            player: {
                pos: {
                    x: 0,
                    y: 0
                },
                size: 10,
                isAlive: true,
                velocity: 0
            },
            conf: {
                gravity: 0.4,
                pushForce: Math.floor(window.innerHeight * 0.008)
            },

            init: () => {
                game.canvas_el = document.querySelector('#cv_game');
                game.canvas_el.width = `${window.innerWidth - 4}`;
                game.canvas_el.height = `${window.innerHeight - 4}`;
                game.ctx = game.canvas_el.getContext('2d');
                game.passageSize = Math.round(game.canvas_el.height / 6);
                game.player.pos.x = game.canvas_el.width / 4;
                game.player.pos.y = game.canvas_el.height / 2;

                window.onkeydown = game.updatePlayerVelocity;

                game.gameInterval = setInterval(game.play, game.fps);
            },

            play: () => {
                game.updatePlayerLifeStatus();
                if (game.player.isAlive) {
                    game.clear();
                    game.updateObstacles();
                    game.updatePlayer();
                    game.drawObstacles();
                    game.drawPlayer();
                } else {
                    clearInterval(game.gameInterval);
                }
            },

            updatePlayerLifeStatus: () => {
                const playerColisionBox = {
                    x1: Math.floor(game.player.pos.x - game.player.size / 2) + 1,
                    x2: Math.floor(game.player.pos.x + game.player.size / 2) + 1,
                    y1: Math.ceil(game.player.pos.y - game.player.size / 2) - 1,
                    y2: Math.ceil(game.player.pos.y + game.player.size / 2) - 1
                };

                const nextColision = game.obstacles.find(o => o.x1 + game.obstacleSize > playerColisionBox.x1);

                if (nextColision !== undefined) {
                    game.player.isAlive = !((playerColisionBox.y1 > game.canvas_el.height) ||
                        (
                            (playerColisionBox.x1 > nextColision.x1 &&
                                playerColisionBox.x1 < nextColision.x1 + game.obstacleSize) ||
                            (playerColisionBox.x2 > nextColision.x1 &&
                                playerColisionBox.x2 < nextColision.x1 + game.obstacleSize)
                        ) && (
                            (playerColisionBox.y1 < nextColision.y2 ||
                                playerColisionBox.y1 + game.player.size < nextColision.y2) ||
                            (playerColisionBox.y2 > nextColision.y4 ||
                                playerColisionBox.y2 + game.player.size > nextColision.y4)
                        )
                    );
                }
            },

            updatePlayerVelocity: e => {
                if (e.keyCode === 38) {
                    game.player.velocity = -game.conf.pushForce;
                }
            },

            drawObstacles: () => {
                const obstacle = game.getNewObstacle();

                if (obstacle !== undefined)
                    game.obstacles.push(obstacle);

                game.obstacles.forEach(o => {
                    game.ctx.fillRect(o.x1, o.y1, game.obstacleSize, o.y2);
                    game.ctx.fillRect(o.x1, o.y4, game.obstacleSize, o.y3);
                });
            },

            updateObstacles: () => {
                game.obstacles = game.obstacles.map(o => {
                    return {
                        ...o,
                        x1: o.x1 - 1
                    }
                }).filter(o => o.x1 + game.obstacleSize >= 0);
            },

            getNewObstacle: () => {
                const lastObstacle = game.obstacles.slice(-1)[0];
                let newObstacle;

                if ((lastObstacle === undefined) || (lastObstacle !== undefined && (game.canvas_el.width - lastObstacle.x1) > game.obstacleDistance)) {
                    let yPosition = Math.round(Math.random() * game.canvas_el.height);

                    if (yPosition < game.passageSize)
                        yPosition = game.passageSize;
                    else if (yPosition > game.canvas_el.height - game.passageSize)
                        yPosition = game.canvas_el.height - game.passageSize;

                    newObstacle = {
                        x1: game.canvas_el.width,
                        y1: 0,
                        y2: yPosition,
                        y3: game.canvas_el.height,
                        y4: yPosition + game.passageSize
                    }
                }

                return newObstacle;
            },

            updatePlayer: () => {
                game.player.velocity += game.conf.gravity;
                game.player.pos.y += game.player.velocity
            },

            drawPlayer: () => {
                game.ctx.fillStyle = '#000';
                game.ctx.arc(game.player.pos.x, game.player.pos.y, game.player.size, 0, Math.PI * 2);
                game.ctx.fill();
            },

            clear: () => {
                game.ctx.beginPath();
                game.ctx.clearRect(0, 0, game.canvas_el.width, game.canvas_el.height);
                game.ctx.closePath();
            }
        }

        game.init();
    })();
}