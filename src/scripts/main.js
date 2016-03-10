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
let dangerCardChoice = [];

//////////////////
// Etat initial //
//////////////////

// Draw and show danger cards
dangerCardChoice = game.drawDangerCard();
dangerCardChoice.forEach(function(element) {
    element.draw('#danger-choice-card-slots');
}, this);

////////////////
// Evenements //
////////////////

// Select a card in danger card choice zone
$('body').on('click', '.card-slot', function(){
  $('.card-slot').removeClass('danger-card-selected');
  $(this).addClass('danger-card-selected');
});

// Chose a card in danger card choice zone
$('body').on('click', '#btn-action-chose-danger', function(){
  if ( $('.danger-card-selected').length > 0 ) {
    let indexDangerCardChoice = $('.danger-card-selected').index();
    game.startFight( dangerCardChoice[indexDangerCardChoice] );

    // Clean UI : danger card choice zone
    UI.cleanDangerCardChoiceZone();
    // Hide danger card choice zone
    UI.hideDangerCardChoiceZone();
    UI.showFightZone();
  }
});

/*
while ( !game.isGameOver() ) {
    while ( game.level <= 3 ){
        // Step 1 : Chose a fight card
        while ( !game.fightCardChose ) {
            // Do Stuff
            console.log('in loop 1');
        }

        // Step 2 : Do the fight
        while ( !game.fightEnded ) {
            console.log('in loop 2');
        }

        if ( game.dangerDeck.isEmpty() ){
            game.level += 3;
        }
    }

}
*/

// Interface

$('a[data-toggle="popover"]').popover({
    animated: 'fade',
    placement: 'bottom',
    html: true
});

//console.log(myPlayer instanceof Player);
