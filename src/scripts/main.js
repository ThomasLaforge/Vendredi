// Jquery et bootstrap
window.jQuery = window.$ = require('jquery');
var bootstrap = require('bootstrap/dist/js/bootstrap');

// Node Style (Browserify)
// var example = require("./example_node");
// example.welcome();

// ES6 modules Style
import { Game 	} 	from	'./Game';
import { Player } 	from	'./Player';

let pseudo = 'Thomas';
let myPlayer = new Player(pseudo);
let game = new Game(myPlayer, 1);

// game.start();
//console.log(myPlayer instanceof Player);