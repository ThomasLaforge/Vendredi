import {Deck}  from './Deck';
import {Tools} from './Tools';

class AgingDeck extends Deck{
    constructor(){
        console.log( "new aging deck!" );
        super();
    }
    
    initDeck(){
        let arrRes = [];
        let arrDatas = require( '../datas/aging_cards.json' );
        arrDatas.forEach( function( elt ){
            let number = elt.number;
            for (var i=0; i<number; i++) {
                delete elt.number;
                arrRes.push(elt);
            }
        });
        
        this._arrayDeck = arrRes;
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