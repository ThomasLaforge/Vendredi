// Jquery et bootstrap
window.jQuery = window.$ = require('jquery');
var bootstrap = require('bootstrap/dist/js/bootstrap');

// Node Style (Browserify)
// var example = require("./example_node");
// example.welcome();

// ES6 modules Style
import { Game 	} 	from	'./Game';
import { Player } 	from	'./Player';
import { UserInterface } 	from	'./UserInterface';

let pseudo = 'Thomas';
let myPlayer = new Player(pseudo);
let game = new Game(myPlayer, 1);
game.test();

// DOM
let btnFight = document.getElementById('action-fight');

// Events
btnFight.addEventListener('click', function () {
     console.log('click on action fight');
     game.losePV(23);
     let isGammeover = game.isGameOver();
     console.log(isGammeover);
});

// Function


// game.start();
//console.log(myPlayer instanceof Player);