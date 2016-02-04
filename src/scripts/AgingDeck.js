import {Deck}  from './Deck';
import {Tools} from './Tools';

class AgingDeck extends Deck{
    constructor(){
        console.log( "new aging deck!" );
        super();
    }
    
    initDeck(){
        this._arrayDeck = require( '../datas/aging_cards.json' );
    }
    
    shuffle(){
        let arrEasy = this._arrayDeck.slice( 0, 3 );
        let arrHard = this._arrayDeck.slice( 3, this._arrayDeck.length );
        
        Tools.shuffle( arrEasy );
        Tools.shuffle( arrHard );
        
        // Put easier cards in first positions to get picked
        this._arrayDeck = arrHard.concat( arrEasy );
    }
}

export {AgingDeck}