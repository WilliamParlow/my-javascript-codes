window.onload = () => {
    (() => {
        const game = {
            canvas_el: null,
            ctx: null,
            animationFrameId: null,
            car: {
                isAlive: true,
                pos: {
                    x: 100,
                    y: 100
                },
                dim: {
                    w: 40 * 2.5,
                    h: 30 * 2.5
                },
                tireSize: 30 * 0.7,
                tires: {
                    rt: {
                        xOffset: 26,
                        yOffset: 35
                    },
                    ft: {
                        xOffset: 74,
                        yOffset: 35
                    }
                },
                chassis: {
                    w: 40 * 2.5,
                    h: 30 / 2 * 2.5
                },
                massCenter: {
                    x: 0,
                    y: 0
                },
                aceleration: 0.5,
                speed: 0,
                fallSpeed: 0,
                maxSpeed: 10,
                wayCode: undefined,
            },
            road: [],
            conf: {
                gravity: 0.4
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
                game.initRoad();
                if (e.type === 'click' || e.type === 'touchstart') {
                    if (e.clientX > textDimensions.positionX && e.clientX < (textDimensions.positionX + textDimensions.textWidth) &&
                        e.clientY < textDimensions.positionY && e.clientY > (textDimensions.positionY - textDimensions.textHeight)) {
                        game.triggerStartGame();
                    }
                } else {
                    game.triggerStartGame();
                }
            },

            initRoad: () => {
                for (let i = 0; i < game.canvas_el.width; i++) {
                    game.road.push({
                        x: i,
                        y: 300 + i / 2
                    })
                }
            },

            triggerStartGame: () => {
                game.clear();
                game.canvas_el.onclick = null;
                window.onkeydown = e => {
                    if (e.keyCode === 37 || e.keyCode === 39) {
                        game.car.wayCode = e.keyCode;
                    }
                };
                window.onkeyup = e => {
                    if (e.keyCode === 37 || e.keyCode === 39) {
                        game.car.wayCode = undefined;
                    }
                };
                game.animationFrameId = requestAnimationFrame(game.play);
            },

            play: () => {
                if (game.car.isAlive) {
                    game.clear();
                    game.drawRoad();
                    game.updateCarSpeed();
                    game.updateCarPosition();
                    game.drawCar();
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

            drawCar: () => {
                game.ctx.fillStyle = '#000';

                game.car.pos.y += game.car.fallSpeed;

                game.ctx.fillRect(game.car.pos.x, game.car.pos.y, game.car.chassis.w, game.car.chassis.h);

                game.ctx.beginPath();
                game.ctx.arc(game.car.pos.x + game.car.tires.rt.xOffset, game.car.pos.y + game.car.tires.rt.yOffset, game.car.tireSize, 0, 2 * Math.PI);
                game.ctx.fill();

                game.ctx.beginPath();
                game.ctx.arc(game.car.pos.x + game.car.tires.ft.xOffset, game.car.pos.y + game.car.tires.ft.yOffset, game.car.tireSize, 0, 2 * Math.PI);
                game.ctx.fill();
            },

            updateCarSpeed: () => {

                const {
                    car
                } = game;

                if (game.car.fallSpeed < 1 && game.car.fallSpeed > -1) {
                    if (car.wayCode === 39)
                        car.speed += car.aceleration;
                    else if (car.wayCode === 37)
                        car.speed -= car.aceleration;
                    else {
                        if (car.speed > 1)
                            car.speed -= car.aceleration / 6;
                        else if (car.speed < -1)
                            car.speed += car.aceleration / 6;
                        else
                            car.speed = 0;
                    }
                }

                car.fallSpeed += game.conf.gravity;

                const colidedRoads = game.road.filter(r => r.x >= game.car.pos.x && r.x <= game.car.pos.x + game.car.chassis.w) || [];

                const rtXPos = game.car.pos.y + game.car.tires.rt.yOffset;
                const ftYPos = game.car.pos.y + game.car.tires.ft.yOffset;
                colidedRoads.forEach(r => {

                });

                if (car.speed > car.maxSpeed)
                    car.speed = car.maxSpeed;
                else if (car.speed < -car.maxSpeed)
                    car.speed = -car.maxSpeed;
            },

            drawRoad: () => {
                game.ctx.strokeStyle = '#900';
                game.ctx.beginPath();
                game.ctx.moveTo(game.road[0].x, game.road[0].y);

                game.road.forEach(r => {
                    game.ctx.lineTo(r.x, r.y);
                });

                game.ctx.stroke();
            },

            updateCarPosition: () => game.car.pos.x += game.car.speed,

            clear: () => {
                game.ctx.beginPath();
                game.ctx.clearRect(0, 0, game.canvas_el.width, game.canvas_el.height);
                game.ctx.closePath();
            }
        }

        game.init();
    })();
}