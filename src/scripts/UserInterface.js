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
        let gameInfo = {
            pv : this.game.player.PV,
        };
    
        $('.game-info').render(gameInfo);
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