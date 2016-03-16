window.jQuery = window.$ = require('jquery');
import {Tools} from './Tools';
import {Game} from './Game';
import {FightCard} from './FightCard';
import {DangerCard} from './DangerCard';
import {AgingCard} from './AgingCard';

class UserInterface {
  constructor(game) {
    this._game = game;
    this.updateMainInfos();
    this.hideFightZone();
  }

  /*
  *   Main infos zone
  */

  updateMainInfos(){
    this.showPV();
    this.showLevel();
    this.showNbFightCards();
    this.showNbDangerCards();
    this.showNbAgingCards();
  }

  // updateMainInfos sub functions
  showPV(){
    $('#pv').html( this.game.player.PV );
  }
  showLevel(){
    $('#level').html( this.game.level );
  }
  showNbFightCards(){
    $('#nbFightCards').html( this.game.fightDeck.length() );
  }
  showNbDangerCards(){
    $('#nbDangerCards').html( this.game.dangerDeck.length() );
  }
  showNbAgingCards(){
    $('#nbAgingCards').html( this.game.agingDeck.length() );
  }

  /*
  * Show / hide / clean zones
  */

  hideFightZone(){
    $('#zone-fight-danger').hide();
  }

  cleanDangerCardChoiceZone(){
    $('#danger-choice-card-slots').empty();
  }

  hideDangerCardChoiceZone(){
    $('#zone-danger-choice').hide();
  }

  showChoseDangerCard(choices){
    // let choices = this.game.drawDangerCard();
    $('#zone-danger-choice').show();
    if ( choices.length == 1 || choices.length == 2 ) {
      choices.forEach(function(card) {
        card.draw('.danger-choice-card-slots');
      }, this);
    } else {
      console.log("number of dangers to chose is uncorrect");
    }
  }

  // Fight Zone

  showFightZone(){
    this.updateFightZone();
    $('#zone-fight-danger').show();
    $('#btn-pick-fight-card').show();
    $('#btn-stop-fight').show();
    $('#btn-delete-fight-cards').hide();

  }

  updateFightZone(){
    this.resetFightZone();
    this.game.fight.dangerCard.draw( '#danger-card-to-fight' );
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
    $('#fight-danger-temporary-result').html( this.game.fight.result() );

    if ( this.game.fight.arrayFightCard.length >= this.game.fight.dangerCard.dangerFreeCards ) {
      $('#btn-pick-fight-card').html( 'Piocher (-1 PV)' );
    }
    else{
      $('#btn-pick-fight-card').html( 'Piocher' );
    }
  }

  resetFightZone(){
    $('#danger-card-to-fight').empty();
    $('.fight-danger-fight-cards').empty();
  }

  askPlayerDeleteCards(){
    $('#btn-pick-fight-card').hide();
    $('#btn-stop-fight').hide();
    $('#btn-delete-fight-cards').show();
    //console.log( this.game.fight.arrayFightCard );
    //console.log( this.game.fight.getSumOfCostToDelete() );
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

}

export { UserInterface }
