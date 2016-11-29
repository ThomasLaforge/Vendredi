import {Deck}  from './Deck';
import {Tools} from './Tools';
import {GameDifficulty} from './Vendredi';
import {AgingCard} from './AgingCard';

class AgingDeck extends Deck{

    constructor(difficulty : GameDifficulty){
        super();
        this.initDeck();
        if(difficulty < GameDifficulty.HARD){
            this.arrayDeck.pop();
        }
        this.shuffle();        
    }

    initDeck(){
        let arrRes : Array<AgingCard> = [];
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
