import {Deck} from "./Deck";

class PirateDeck extends Deck{
    constructor(){
        super();
    }
    
    initDeck(){
        this._arrayDeck = require('../datas/pirates_cards.json');
    }
    
    getPirates(nb){
        let arr = [];
        
        if(nb > 0){
            if(nb > this._arrayDeck.length){
                arr = this._arrayDeck;
            }
            else{
                return this._arrayDeck.slice(0, nb);
            }
        }
        
        return arr;
    }
    
}

export {PirateDeck};