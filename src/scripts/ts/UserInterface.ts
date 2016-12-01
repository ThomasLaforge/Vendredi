import {Tools} from './Tools';
import {Game} from './Game';
import {FightCard} from './FightCard';
import {PirateFight} from './PirateFight';
import {DangerFight} from './DangerFight';
import {DangerCard} from './DangerCard';
import {AgingCard} from './AgingCard';

class UserInterface {
  constructor( private _game:Game) {
    this.game = _game;
    this.dangerCardChoice = [];
    this.updateMainInfos();
    this.hideFightZone();
    this.eventsDeclaration();
    this.dangerCardChoice = this.game.drawDangerCard();
    this.dangerCardChoice.forEach( (element) => {
      element.draw('#danger-choice-card-slots');
    }, this);
  }

  /*
  *   Main infos zone
  */

  updateMainInfos(){
    // this.showPV();
    this.showLevel();
    this.showPirates();
    this.showNbFightCards();
    this.showNbDangerCards();
    this.showNbAgingCards();
  }

  // updateMainInfos sub functions
  showPV(){
    $('#pv').html( this.game.player.PV.toString() );
  }
  showLevel(){
    let levelValue = this.game.level > 3 ? 'pirates' : this.game.level;
    $('#level').html( levelValue.toString() ).addClass('level-value-' + levelValue);
  }
  showPirates(){
    $('#pirates-list').empty();
    this.game.pirates.forEach( (pirate, i) => {
      pirate.draw('#pirates-list');
    });
  }
  showNbFightCards(){
    $('#nbFightCards').html( this.game.fightDeck.length().toString() );
  }
  showNbDangerCards(){
    $('#nbDangerCards').html( this.game.dangerDeck.length().toString() );
  }
  showNbAgingCards(){
    $('#nbAgingCards').html( this.game.agingDeck.length().toString() );
  }

  /*
  * Show / hide / clean zones
  */

  showGameOver(){
    alert('Game Over! Try Again');
    console.log('UI : showGameOver');
  }

  hideFightZone(){
    $('#zone-fight-danger').hide();
  }

  cleanDangerCardChoiceZone(){
    $('#danger-choice-card-slots').empty();
  }

  hideDangerCardChoiceZone(){
    $('#zone-danger-choice').hide();
  }

  showChoseDangerCard(choices:Array<DangerCard>){
    console.log('choices', choices);
    // let choices = this.game.drawDangerCard();
    if( choices.length > 0 ){
      $('#zone-danger-choice').show();
      if ( choices.length === 1 || choices.length === 2 ) {
        choices.forEach( (card:DangerCard) => {
          card.draw('.danger-choice-card-slots');
        }, this);
        if(choices.length === 1){
          // - Cas particulier: si il ne reste qu'un carte dans le deck de péril, vous pouvez la regardez, et choisir de l'affronter ou bien de la défausser et de passer directement au niveau suivant. 
          //TODO
        }
      } else {
        console.log("number of dangers to chose is uncorrect");
      }
    }
    else{
      //PirateCard's hour
      // Show pirate zone
      console.log('show pirate zone cause training is over');
      this.game.fight = new PirateFight(this.game.actualPirate);
      this.showFightZone();
    }
  }

  // Fight Zone

  showFightZone(){
    this.updateFightZone();
    $('#zone-fight-danger').show();
    $('#btn-pick-fight-card').show();
    $('#btn-stop-fight').show();
    $('#btn-delete-fight-cards').hide();
    $('#btn-dont-delete-fight-cards').hide();
  }

  updateFightZone(){
    this.resetFightZone();
    this.game.fight.cardToFight.draw( '#danger-card-to-fight' );
    this.game.fight.arrayFightCard.forEach( function( card ){
        if ( card instanceof FightCard || card instanceof AgingCard) {
            card.draw(".fight-danger-fight-cards");
        }
        else if ( card instanceof DangerCard ) {
            card.fightCard.draw(".fight-danger-fight-cards");
        }
        else{
            console.log('Try to draw a card but not a danger card or fight card.');
        }
    });

    this.game.fight.arrayFightCardUsed.forEach( function( card ){
        if ( card instanceof FightCard || card instanceof AgingCard) {
            card.draw(".fight-danger-fight-cards-used");
        }
        else if ( card instanceof DangerCard ) {
            card.fightCard.draw(".fight-danger-fight-cards-used");
        }
        else{
            console.log('Try to draw a card but not a danger card or fight card.');
        }
    });

    let classToAdd = this.game.fight.result() >= 0 ? 'fight-danger-temporary-result-success' : 'fight-danger-temporary-result-negative';
    $('#fight-danger-temporary-result').removeClass('fight-danger-temporary-result-success fight-danger-temporary-result-negative').html( this.game.fight.result().toString() ).addClass(classToAdd);

    if ( this.game.fight.arrayFightCard.length >= this.game.fight.cardToFight.nbFreeCards ) {
      $('#btn-pick-fight-card').html( 'Piocher (-1 PV)' );
    }
    else{
      $('#btn-pick-fight-card').html( 'Piocher' );
    }
  }

  resetFightZone(){
    $('#danger-card-to-fight').empty();
    $('.fight-danger-fight-cards').empty();
    $('.fight-danger-fight-cards-used').empty();
  }

  askPlayerDeleteCards(){
    $('#btn-pick-fight-card').hide();
    $('#btn-stop-fight').hide();
    $('#btn-delete-fight-cards').show();
    $('#btn-dont-delete-fight-cards').show();
    //console.log( this.game.fight.arrayFightCard );
    //console.log( this.game.fight.getSumOfCostToDelete() );
  }

  // Pirates Zone
  showPiratesZone(){
    this.hideFightZone();
    console.log('hide fight zone to show pirates');
    this.showPiratesChoice();
  }

  showPiratesChoice(){
    
  }


  /**
  * Events
  * */

  eventsDeclaration(){
    let UI = this;
    let game = this.game;
    // TODO: Replace UI and game objects : http://stackoverflow.com/questions/36915875/javascript-arrow-functions-this-in-event-handler

    // Select a card in danger card choice zone
    $('body').on('click', '.game-danger-choice .card-slot', function(){
      $('.card-slot').removeClass('danger-card-selected');
      $(this).addClass('danger-card-selected');
    });

    // Chose a card in danger card choice zone
    $('body').on('click', '#btn-action-chose-danger', function(){
      if ( $('.danger-card-selected').length > 0 ) {
        let indexDangerCardChoice = $('.danger-card-selected').index();
        game.startFight( UI.dangerCardChoice[indexDangerCardChoice] );
        //Discard other card
        game.dangerDeck.discard( [ UI.dangerCardChoice [ 1 - indexDangerCardChoice ] ] );
        // Clean this : danger card choice zone
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

        if ( game.fight.arrayFightCard.length > game.fight.cardToFight.nbFreeCards ) {
          game.player.losePV( 1 );
        }
      }
    });

    // Use power of card
    $('body' ).on('click', '.fight-danger-fight-cards .fight-card, .fight-danger-fight-cards-used .fight-card', function(){
      if( game.fight.finished ){
        $(this).addClass('end-fight-card-to-delete');
      }
      else{
        let index = $(this).index();
        let cardSelected = game.fight.arrayFightCard[ index ];
        if( cardSelected.power ){
          // If power not already used
          if(!$(this).hasClass('fight-card-power-used')){
            game.usePower( cardSelected );
            // $(this).addClass('fight-card-power-used');
            let fightCardPlayed = $(this);
            $(this).detach().appendTo('.fight-danger-fight-cards-used');
          }
        }
        else{
          console.log('click on fight card played! (in fight)');
        }
      }
    });

    $('body' ).on('click', '.end-fight-card-to-delete', function(){
      $(this).removeClass('end-fight-card-to-delete');
    });

    // Stop the fight
    $('body' ).on('click', '#btn-stop-fight', function(){
      if ( game.fight ){
        game.fight.finish();
        if ( game.fight.isWon() ){
          game.endFightWon();
          UI.hideFightZone();
          UI.dangerCardChoice = game.drawDangerCard();
          UI.showChoseDangerCard( UI.dangerCardChoice );
        }
        else{
          game.player.losePV( Math.abs( game.fight.result() ) );
          if ( !game.isGameOver() ) {
            UI.askPlayerDeleteCards();
          }
        }
      }
    });


    // Ask player to delete cards if fight is lost
    $('body').on('click', '#btn-delete-fight-cards', function(){
      let cardsToDelete = [];
      let $cardsToDelete = $('.end-fight-card-to-delete');
      let totalCostOfCardsToDelete = 0;

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
        UI.dangerCardChoice = game.drawDangerCard();
        UI.showChoseDangerCard( UI.dangerCardChoice );
      }
      else{
        console.log("Trop de cartes à supprimer");
      }
    });

    $('body').on('click', '#btn-dont-delete-fight-cards', function(){
      let noCard = [];
      game.endFightLost(noCard);
      UI.hideFightZone();
      UI.dangerCardChoice = game.drawDangerCard();
      UI.showChoseDangerCard( UI.dangerCardChoice );
    });
  }

  /**
  * Getters / Setters
  */

  get game(){
    return this._game;
  }
  set game(newGame){
    this._game = newGame;
  }

  get dangerCardChoice(){
    return this._dangerCardChoice;
  }
  set dangerCardChoice( newDangerCardChoice ){
    this._dangerCardChoice = newDangerCardChoice;
  }

}

export { UserInterface }
