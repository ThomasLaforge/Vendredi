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
$('body').on('click', '.game-danger-choice .card-slot', function(){
  $('.card-slot').removeClass('danger-card-selected');
  $(this).addClass('danger-card-selected');
});

// Chose a card in danger card choice zone
$('body').on('click', '#btn-action-chose-danger', function(){
  if ( $('.danger-card-selected').length > 0 ) {
    let indexDangerCardChoice = $('.danger-card-selected').index();
    game.startFight( dangerCardChoice[indexDangerCardChoice] );
    //Discard other card
    game.dangerDeck.discard( [ dangerCardChoice [ 1 - indexDangerCardChoice ] ] );
    // Clean UI : danger card choice zone
    UI.cleanDangerCardChoiceZone();
    // Hide danger card choice zone
    UI.hideDangerCardChoiceZone();
    UI.showFightZone();

  }
});

// Pick a fight card
$('body' ).on('click', '#btn-pick-fight-card', function(){
    if( game.fight ){
        let fightCard = game.drawFightCard();
        game.fight.addFightCard( fightCard );

        if ( game.fight.arrayFightCard.length > game.fight.dangerCard.dangerFreeCards ) {
            game.player.losePV( 1 );
        }
    }
});

// Stop the fight
$('body' ).on('click', '#btn-stop-fight', function(){
  if ( game.fight ){
    game.fight.finish();
    if ( game.fight.isWon() ){
      game.endFightWon();
      UI.hideFightZone();
      dangerCardChoice = game.drawDangerCard();
      UI.showChoseDangerCard( dangerCardChoice );
    }
    else{
      game.player.losePV( Math.abs( game.fight.result() ) );
      if ( !game.isGameOver() ) {
        UI.askPlayerDeleteCards();
      }
    }
  }
});

$('body' ).on('click', '.fight-danger-fight-cards div', function(){
    if( game.fight.finished ){
        $(this).addClass('end-fight-card-to-delete');
    }
    else{
        let index = $(this).index();
        let cardSelected = game.fight.arrayFightCard[ index ];$
        if( cardSelected.power ){
            game.usePower( cardSelected );
            $(this).addClass('fight-card-power-used');
        }
        else{
          console.log('click on fight card played! (in fight)');
        }
    }
});

$('body' ).on('click', '.end-fight-card-to-delete', function(){
  $(this).removeClass('end-fight-card-to-delete');
});

// Ask player to delete cards if fight is lost
$('body').on('click', '#btn-delete-fight-cards', function(){
    let cardsToDelete = [];
    let $cardsToDelete = $('.end-fight-card-to-delete');
    let totalCostOfCardsToDelete = 0;
    console.log($cardsToDelete);

    $cardsToDelete.each( function () {
        let index = $( this ).index();
        let card = game.fight.arrayFightCard[ index ];
        totalCostOfCardsToDelete += card.costToDelete;
    });

    if ( Math.abs( game.fight.result() ) >= totalCostOfCardsToDelete ) {
        $cardsToDelete.each( function () {
            let index = $( this ).index();
            cardsToDelete.push( game.fight.arrayFightCard[ index ] );
            game.fight.arrayFightCard.splice( index, 1 );
        } );

        game.endFightLost( cardsToDelete );

        UI.hideFightZone();
        dangerCardChoice = game.drawDangerCard();
        UI.showChoseDangerCard( dangerCardChoice );
    }
    else{
        console.log("Trop de cartes à supprimer");
    }
});

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

//console.log(myPlayer instanceof Player);
