import {Deck} from "./Deck";

class FightDeck extends Deck {
	constructor(){
        console.log('new fight deck!');
		super();
        
	}
    
    initDeck(){
        this._arrayDeck = require('../datas/fight_cards.json');
    }
}

export {FightDeck}