window.jQuery = window.$ = require('jquery');
import {Tools} from './Tools';

class UserInterface {
   constructor(game) {
        console.log('UI initialized!');
        this._game = game;
        this.showMainInfos();
    }
    
    showMainInfos(){
        this.showPV();
        this.showLevel();
        this.showNbFightCards();
        this.showNbDangerCards();
        this.showNbAgingCards();
    }
    
    showChoseDangerCard(choices){
        // let choices = this.game.drawDangerCard();
        
        if ( choices.length == 2 || choices.lenght == 3) {
            choices.forEach(function(card) {
                card.draw('.danger-choice-card-slots');
            }, this);
        } else {
            console.log("number of dangers to chose is uncorrect");
        }
    }
    
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