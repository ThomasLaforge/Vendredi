

import {Deck} from './Deck';
import {FightDeck} from './FightDeck';
import {DangerDeck} from './DangerDeck';
import {AgingDeck} from './AgingDeck';
// import {PirateDeck} from './Pirate';
// import {Deck} from './Deck';


class Game {
	constructor(player, difficulty){
		this._player = player;
        this._difficulty = difficulty;
		// Initialization
		this._fightDeck = new FightDeck();
		this._dangerDeck = new DangerDeck();
		this._agingDeck = new AgingDeck(this._difficulty);
		// this._pirates = this.getPirates(1);
	}

	isGameOver(){
        return this._player.isDead();  
    }
    
    static getPirates(nb){
        if(nb > 0){
            let list = PIRATESLIST;
            console.log(list);
            let randomIndex = Math.floor(Math.random() * (0 - list.length -1));
            let indexes = [ PIRATESLIST[randomIndex] ];
            // while (indexes.length < nb) {
                
            // }
            
            let arr = [];
            indexes.forEach(function(element) {
                arr.push(element.id);
            }, this);
            
        
            return arr;
        }
    }

	/**
	 * Getters and Setters
	 */
	
	// player
	
	get player(){
		return this._player;
	}
	set player(newPlayer){
		this._player = newPlayer;
	}

	// difficulty
	
	get difficulty(){
		return this._difficulty;
	}
	set difficulty(newDifficulty){
		this._difficulty = newDifficulty;
	}
}

export { Game }