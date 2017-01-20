import {PlayableDeck}  from './PlayableDeck';
import {Tools} from './Tools';
import * as _ from 'lodash';
import {AgingCard} from './AgingCard';
import {GameDifficulty, jsonDataAging, AgingLevel} from './Vendredi';

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
            for (let i=0; i<number; i++) {
                let newAgingCard= new AgingCard( obj.name, obj.strength, power, obj.level );
                arrRes.push( newAgingCard );
            }
        });

        this.arrayDeck = arrRes;
    }

    shuffle(){
        let arrEasy = this.arrayDeck.filter( agingCard => { return agingCard.level <= AgingLevel.UNCOMFORTABLE} );
        let arrHard = this.arrayDeck.filter( agingCard => { return agingCard.level >= AgingLevel.EVIL });

        arrEasy = _.shuffle( arrEasy );
        arrHard = _.shuffle( arrHard );

        // Put easier cards in first positions to get picked
        this.arrayDeck = arrEasy.concat( arrHard );
    }
}

export {AgingDeck}
