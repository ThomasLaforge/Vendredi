// Jquery et bootstrap
window.jQuery = window.$ = require('jquery');
var bootstrap = require('bootstrap/dist/js/bootstrap');

// Node Style
// var example = require("./example_node");
// example.welcome();

// ES6 modules Style
import {Deck} from './Deck';

var myDeck = new Deck();
myDeck.shuffleDeck();
console.log(myDeck.pickCards(1));

class Carte {
	constructor(){
		console.log('Création d\'une nouvelle carte');
	}
}

class CarteDanger extends Carte {
	constructor(lvl1,lvl2,lvl3){
		this._lvl_1 = lvl1;
		this._lvl_2 = lvl2;
		this._lvl_3 = lvl3;
	}
}

class CarteCombat extends Carte {
	constructor(lvl1,lvl2,lvl3){
		
	}
}

class DeckCarte {

}