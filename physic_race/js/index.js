window.onload = () => {
    (() => {
        const game = {
            canvas_el: null,
            ctx: null,
            animationFrameId: null,
            car: {
                isAlive: true,
                dim: {
                    w: 40,
                    h: 30
                },
                tireSize: 30 * 0.7,
                tire: {
                    rt: {
                        x: 0,
                        y: 0
                    },
                    ft: {
                        x: 0,
                        y: 0
                    }
                },
                chassis: {
                    w: 40,
                    h: 30 / 2
                },
                massCenter: {
                    x: 0,
                    y: 0
                }
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
                game.ctx.font = '16px Arial';

                game.createGameMenu();
            },

            createGameMenu: () => {
                game.clear();

                game.ctx.shadowColor = "transparent";

                game.ctx.font = 'bold 80px cursive';
                game.ctx.lineWidth = 5;
                game.ctx.shadowBlur = 7;

                let textDimensions = {
                    game: game.getTextDimensions('Start Game', {
                        font: game.ctx.font
                    })
                };

                textDimensions = {
                    ...textDimensions,
                    textHeight: textDimensions.game.height,
                    textWidth: textDimensions.game.width,
                    positionX: game.canvas_el.width * 0.5 - (textDimensions.game.width * 0.5),
                    positionY: game.canvas_el.height * 0.5 + 24
                }

                game.ctx.fillStyle = "#000";
                game.ctx.fillRect(0, 0, game.canvas_el.width, game.canvas_el.height / 2 + textDimensions.game.height);
                game.ctx.fillStyle = "#FFF";
                game.ctx.fillRect(0, game.canvas_el.height / 2 + textDimensions.game.height, game.canvas_el.width, game.canvas_el.height);
                game.ctx.strokeStyle = "#8C8C8C";
                game.ctx.strokeRect(textDimensions.positionX - 10, textDimensions.positionY - textDimensions.game.height * 0.666 - 20, textDimensions.game.width + 20, textDimensions.game.height + 20);
                game.ctx.strokeText('Start Game', textDimensions.positionX, textDimensions.positionY);

                window.onkeydown = e => {
                    game.initMenuClickEvent(e, textDimensions);
                };
                game.canvas_el.onclick = e => {
                    game.initMenuClickEvent(e, textDimensions);
                };
                game.canvas_el.ontouchstart = e => {
                    game.initMenuClickEvent(e, textDimensions);
                };
            },

            initMenuClickEvent: (e, textDimensions) => {
                if (e.type === 'click' || e.type === 'touchstart') {
                    if (e.clientX > textDimensions.positionX && e.clientX < (textDimensions.positionX + textDimensions.textWidth) &&
                        e.clientY < textDimensions.positionY && e.clientY > (textDimensions.positionY - textDimensions.textHeight)) {
                        game.triggerStartGame();
                    }
                } else {
                    game.triggerStartGame();
                }
            },

            triggerStartGame: () => {
                game.clear();
                game.canvas_el.onclick = null;
                game.animationFrameId = requestAnimationFrame(game.play);
            },

            play: () => {
                if (game.car.isAlive) {
                    game.clear();
                    requestAnimationFrame(game.play);
                } else {
                    cancelAnimationFrame(game.animationFrameId);
                    setTimeout(game.init, 2000);
                }
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
