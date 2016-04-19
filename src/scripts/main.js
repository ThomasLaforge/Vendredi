// Jquery et bootstrap
window.jQuery = window.$ = require('jquery');
var bootstrap = require('bootstrap/dist/js/bootstrap');
// jQuery.fn.render = Transparency.jQueryPlugin;

// ES6 modules Style
import { Game 	}         from	'./Game';
import { Player }         from	'./Player';
import { UserInterface }  from	'./UserInterface';

let pseudo   = 'Thomas';
let myPlayer = new Player(pseudo);
let game     = new Game(myPlayer, 1);
let UI       = new UserInterface(game);

// Watchers

watch(game, function(){
  if ( game.isGameOver() ){
      console.log('The game is over !');
      $('body').unbind();
  }
  else{
      UI.updateMainInfos();
  }
});

watch(game, "_fight", function(){
  if(game.fight){
    UI.updateFightZone();
  }
});

/*
    es6 generators

let gameProcess = gameCycle();
gameProcess.next();
gameProcess.next();

function* gameCycle(){
 while(true){
     console.log(1);
        yield;
         // just pause
       console.log(2);
        yield; // pause waiting for a parameter to pass into `foo(..)`
       console.log(3);

 }
} */

// Interface

$('a[data-toggle="popover"]').popover({
    animated: 'fade',
    placement: 'bottom',
    html: true
});
