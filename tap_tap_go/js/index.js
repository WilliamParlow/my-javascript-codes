window.onload = () => {
    (() => {
        const game = {
            canvas_el: null,
            ctx: null,
            passageSize: null,
            obstacleDistance: 350,
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
                velocity: 0,
                points: 0
            },
            conf: {
                gravity: 0.4,
                pushForce: Math.floor(window.innerHeight * 0.008),
                isMobile: window.mobileCheck()
            },

            init: () => {
                game.canvas_el = document.querySelector('#cv_game');
                game.canvas_el.width = `${window.innerWidth - 4}`;
                game.canvas_el.height = `${window.innerHeight - 4}`;
                game.ctx = game.canvas_el.getContext('2d');
                game.ctx.font = '16px Arial';
                game.passageSize = Math.round(game.canvas_el.height / 6);
                game.player.pos.x = game.canvas_el.width / 4;
                game.player.pos.y = game.canvas_el.height / 2;

                window.onkeydown = game.updatePlayerVelocity;
                window.ontouchstart = game.updatePlayerVelocityByClickOrTouch;
                window.onclick = game.updatePlayerVelocityByClickOrTouch;

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
                    game.drawPoints();
                } else {
                    game.drawGameOverText();
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

            updatePlayerVelocity: () => game.player.velocity = -game.conf.pushForce,

            updatePlayerVelocityByClickOrTouch: () => game.updatePlayerVelocity(),

            updatePlayerVelocityByArrowKey: e => {
                if (e.keyCode === 38) {
                    game.player.velocity = -game.conf.pushForce;
                }
            },

            drawPoints: () => {
                game.ctx.font = '16px Arial';
                game.ctx.fillStyle = '#CCC';
                game.ctx.fillRect(15, 10, 60, 30)
                game.ctx.fillStyle = '#000';
                game.ctx.fillText(game.player.points, 20, 30);
            },

            drawObstacles: () => {
                game.ctx.fillStyle = '#000';
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
                        x1: o.x1 - 2
                    }
                }).filter(o => {
                    const isObstacleOutOfCanvas = o.x1 + game.obstacleSize >= 0;

                    if (!isObstacleOutOfCanvas)
                        game.player.points++;

                    return isObstacleOutOfCanvas;
                });
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

            drawGameOverText: () => {

                if (game.conf.isMobile) {
                    game.ctx.font = 'bold 80px Chalkduster fantasy';
                    game.ctx.shadowColor = "#F00";
                    game.ctx.lineWidth = 5;
                    game.ctx.shadowBlur = 7;

                    game.drawGameOverCentrilized(game.ctx.font);
                } else {
                    game.ctx.font = 'bold 200px Chalkduster fantasy';
                    game.ctx.shadowColor = "#F00";
                    game.ctx.lineWidth = 7;
                    game.ctx.shadowBlur = 10;

                    game.drawGameOverCentrilized(game.ctx.font);
                }
            },

            drawGameOverCentrilized: (font) => {
                let textDimensions = {
                    game: game.getTextDimensions('GAME', {
                        font: font
                    }),
                    over: game.getTextDimensions('OVER', {
                        font: font
                    })
                };

                const offset = textDimensions.game.width - textDimensions.over.width;
                textDimensions.game.offset = Math.round((offset > 0) ? 0 : offset);
                textDimensions.over.offset = Math.round((offset > 0) ? offset : 0);

                game.ctx.strokeText('GAME', offset + game.canvas_el.width * 0.45 - (textDimensions.game.width * 0.5),
                    (game.canvas_el.height * 0.5) - (textDimensions.over.height * 0.1));

                game.ctx.strokeText('OVER', offset + game.canvas_el.width * 0.45 - (textDimensions.over.width * 0.5),
                    (game.canvas_el.height * 0.5) + (textDimensions.over.height * 0.65));
            },

            getTextDimensions: (text, styleProps) => {
                const div = document.createElement('div');

                div.style.display = 'inline-block';

                Object.keys(styleProps).forEach(key => {
                    div.style[key] = styleProps[key];
                });

                div.textContent = text;

                document.body.append(div);

                const dimensions = div.getBoundingClientRect();

                div.remove();

                return dimensions;
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

// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
