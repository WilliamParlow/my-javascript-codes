let gameWindow = document.querySelector('#wormGame');
let game = gameWindow.getContext('2d');

let gameWormMoveInterval;

let food = {
   xPosition: 0,
   yPosition: 0
};

/**
 * 
 */
let gameStatus = {
   playing: false,
   score: 0
};



/**
 * * * * * Worm status * * * * *
 * 
 * Movement: 's' -> stopped | 'u' -> up | 'd' -> down | 'l' -> left | 'r' -> right
 * Velocity: Based on window update at setInterval function calling
 * 
 */
let worm = {
   direction: 's',
   velocity: 100,
   size: 10,
   balls: [{}],
   isAlive: true
};



/**
 * Worm movements key codes - Explicit on keyCodes keys:values
 */
let keyCodes = {
   left: 37,
   up: 38,
   right: 39,
   down: 40
}