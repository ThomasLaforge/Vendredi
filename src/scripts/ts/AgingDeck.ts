import {Deck}  from './Deck';
import {Tools} from './Tools';
import {AgingCard} from './AgingCard';
import {GameDifficulty, jsonDataAging} from './Vendredi';

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
        let arrDatas = require( '../../datas/aging_cards.json' );
        arrDatas.forEach( (obj: jsonDataAging) => {
            let number = obj.number;
            let power = obj.power ? Tools.getAgingPowerFromString(obj.power) : null;
            let newAgingCard = new AgingCard(obj.name, obj.strength, power, obj.level);
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
