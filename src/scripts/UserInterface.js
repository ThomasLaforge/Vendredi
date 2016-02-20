window.jQuery = window.$ = require('jquery');
import {Tools} from './Tools';

class UserInterface {
   constructor(game) {
        this._game = game;
        console.log('UI initialized!');
        this.showMainInfos();
    }
    
    showMainInfos(){
        this.showPV();
        this.showNbFightCards();
        this.showNbDangerCards();
        this.showNbAgingCards();
    }
    
    showActualDangerChoice(){
        let choices = this.game.actualDangerChoice;
        
        if ( choices.length == 2) {
            // Show the form to select one of the two danger cards
        }
        else if ( choices.lenght == 1) {
            // Go to fight view with this card
        } else {
            console.log("number of dangers to chose is uncorrect");
        }
    }
    
    showPV(){
        $('#pv').html(this.game.player.PV);
    }
    
    showNbFightCards(){
        $('#nbFightCards').html(this.game.fightDeck.length());
    }
    
    showNbDangerCards(){
        $('#nbDangerCards').html(this.game.dangerDeck.length());
    }
    
    showNbAgingCards(){
        $('#nbAgingCards').html(this.game.agingDeck.length());
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