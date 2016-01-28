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