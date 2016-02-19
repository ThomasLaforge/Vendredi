window.jQuery = window.$ = require('jquery');
import {Tools} from './Tools';

class UserInterface {
   constructor(game) {
        this._game = game;
        console.log('UI initialized!');
        this.init();
    }
    
    init(){
        this.showGlobalInfo();
    }
    
    showActualDangerChoice(){
        this.game.actualDangerChoice.forEach(function(elt){
            console.log(elt);       
        });
    }

    showGlobalInfo(){
        this.showPV();
        this.showActualDangerChoice();
        this.showNbDangerCards();
        this.showNbFightCards();
    }
    
    showPV(){
        $('#PV').html(this.game.player.PV);
    }
    
    showNbFightCards(){
        $('#nbFightCards').html(this.game.fightDeck.length());
    }
    
    showNbDangerCards(){
        $('#nbDangerCards').html(this.game.dangerDeck.length());
    }
    
    get game(){
        return this._game;
    }
    set game(newGame){
        this._game = newGame;
    }
    
}

export { UserInterface }