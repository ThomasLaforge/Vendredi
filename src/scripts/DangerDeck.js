import {Deck} from "./Deck";

class DangerDeck extends Deck {
	constructor(){
        console.log('new danger deck!');
		super();
	}
    
}

export {DangerDeck}