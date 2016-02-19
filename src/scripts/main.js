// Jquery et bootstrap
window.jQuery = window.$ = require('jquery');
var bootstrap = require('bootstrap/dist/js/bootstrap');
// jQuery.fn.render = Transparency.jQueryPlugin;

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
let UI = new UserInterface(game);

$('a[data-toggle="tooltip"]').tooltip({
    animated: 'fade',
    placement: 'bottom',
    html: true
});

// let btnFight = document.getElementById('action-fight');
// btnFight.addEventListener('click', function () {
//     console.log('click on action fight');
//     this.game.losePV(23);
//     let isGameover = this.game.isGameOver();
//     console.log(isGameover);
// });  

// Function


// game.start();
//console.log(myPlayer instanceof Player);