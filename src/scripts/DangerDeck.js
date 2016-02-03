import {Deck} from "./Deck";

class DangerDeck extends Deck {
	constructor(){
        console.log('new danger deck!');
		super();
	}
    
    initDeck(){
        this._arrayDeck = require('../datas/dangers_cards.json');
    }
    
}

export {DangerDeck}