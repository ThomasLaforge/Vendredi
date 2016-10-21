import {Deck}  from './Deck';
import {Tools} from './Tools';
import {AgingCard} from './AgingCard';

class AgingDeck extends Deck{

    constructor(difficulty){
        super();
        this.initDeck();
        if(difficulty < 3){
            this.arrayDeck.pop();
        }
        this.shuffle();        
    }

    initDeck(){
        let arrRes = [];
        let arrDatas = require( '../datas/aging_cards.json' );
        arrDatas.forEach( (obj) => {
            let number = obj.number;
            let newAgingCard = new AgingCard( obj );
            for (var i=0; i<number; i++) {
                arrRes.push( newAgingCard );
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
