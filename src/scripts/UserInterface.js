window.jQuery = window.$ = require('jquery');
import {Tools} from './Tools';

class UserInterface {
   constructor(game) {
        this._game = game;
        this._actualView = 0;
        console.log('UI initialized!');
        this.showMainInfos();
        this.showChoseDangerCard();
    }
    
    showMainInfos(){
        this.showPV();
        this.showNbFightCards();
        this.showNbDangerCards();
        this.showNbAgingCards();
    }
    
    showChoseDangerCard(){
        let choices = this.game.drawDangerCard();
        
        if ( choices.length == 2 || choices.lenght == 3) {
            choices.forEach(function(card) {
                UI_CardManager.drawCard(card);
            }, this);
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