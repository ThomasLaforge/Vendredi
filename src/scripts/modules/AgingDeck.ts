import {PlayableDeck}  from './PlayableDeck';
import {Tools} from './Tools';
import * as _ from 'lodash';
import {AgingCard} from './AgingCard';
import {GameDifficulty, jsonDataAging} from './Vendredi';

class AgingDeck extends PlayableDeck{

    constructor(difficulty : GameDifficulty, arrayCard?:Array<AgingCard>, arrayDiscard?:Array<AgingCard>){
        super(arrayCard,arrayDiscard);
        
        if(!this.arrayDeck || !this.arrayDiscard){
            this.initDeck();
            if(difficulty < GameDifficulty.HARD){
                this.arrayDeck.pop();
            }
            this.shuffle();
        }
    }

    initDeck(){
        let arrRes : Array<AgingCard> = [];
        let arrDatas = require( '../../datas/aging_cards.json' );
        arrDatas.forEach( (obj: jsonDataAging) => {
            let number = obj.number;
            let power = obj.power ? Tools.getAgingPowerFromString(obj.power) : null;
            for (var i=0; i<number; i++) {
                let newAgingCard= new AgingCard( obj.name, obj.strength, power, obj.level );
                arrRes.push( newAgingCard );
            }
        });

        this.arrayDeck = arrRes;
    }

    shuffle(){
        let arrEasy = this.arrayDeck.slice( 0, 3 );
        let arrHard = this.arrayDeck.slice( 3, this.arrayDeck.length );

        arrEasy = _.shuffle( arrEasy );
        arrHard = _.shuffle( arrHard );

        // Put easier cards in first positions to get picked
        this.arrayDeck = arrHard.concat( arrEasy );
    }
}

export {AgingDeck}
