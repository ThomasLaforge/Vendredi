import {Deck} from './Deck';

class AgingDeck extends Deck{
    constructor(){
        console.log("new aging deck!");
        super();
    }
    
    shuffleDeck(){
        console.log('shuffle deck from AgingDeck');
        let arr, arrEasy, arrHard = [];
        
        // Shuffle harder cards
        
        // Shuffle easier cards
        
        // Put easier cards in first positions to get picked
        arr.concat(arrEasy, arrHard);
        this._arrayDeck = arr;
    }
}

export {AgingDeck}