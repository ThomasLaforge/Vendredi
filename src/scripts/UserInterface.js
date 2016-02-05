window.jQuery = window.$ = require('jquery');

class UserInterface {
   constructor(game) {
        console.log('UI initialized!');
        this._game = game;
        this.init();
    }
    
    init(){
        this.showPV();
        this.showNbFightCards();
        this.showNbDangerCards();
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
    
    gameOver(){
        console.log('gameOver !');
    }
    
    get game(){
        return this._game;
    }
    set game(newGame){
        this._game = newGame;
    }
    
}

export { UserInterface }