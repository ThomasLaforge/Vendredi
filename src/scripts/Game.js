import {Deck} from './Deck';
import {FightDeck} from './FightDeck';
import {DangerDeck} from './DangerDeck';
import {AgingDeck} from './AgingDeck';
import {PirateDeck} from './PirateDeck';
// import {Deck} from './Deck';


class Game {
	constructor(player, difficulty){
		this._player = player;
        this._difficulty = difficulty;
		// Initialization
		this._fightDeck = new FightDeck();
		this._dangerDeck = new DangerDeck();
		this._agingDeck = new AgingDeck(this._difficulty);
		this._pirateDeck = new PirateDeck();
	}

	isGameOver(){
        return this._player.isDead();  
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