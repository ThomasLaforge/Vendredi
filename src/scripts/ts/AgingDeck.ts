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

        this.arrayDeck = arrRes;
    }

    shuffle(){
        let arrEasy = this.arrayDeck.slice( 0, 3 );
        let arrHard = this.arrayDeck.slice( 3, this.arrayDeck.length );

        Tools.shuffle( arrEasy );
        Tools.shuffle( arrHard );

        // Put easier cards in first positions to get picked
        this.arrayDeck = arrHard.concat( arrEasy );
    }
}

export {AgingDeck}
