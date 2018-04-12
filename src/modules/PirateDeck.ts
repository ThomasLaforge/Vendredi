import {Deck} from "./Deck";
import {PirateCard} from "./PirateCard";
import {Tools} from './Tools';
import {jsonDataPirate} from './Vendredi';

class PirateDeck extends Deck <PirateCard> {
    
    constructor(arrayCard?:Array<PirateCard>, arrayDiscard?:Array<PirateCard>){
        super(arrayCard,arrayDiscard);
    }

    initDeck(){
        let arrRes:Array<PirateCard> = [];
        let arrDatas = require( '../datas/pirates_cards.json' );
        arrDatas.forEach( (obj: jsonDataPirate) => {
            let mission = Tools.getPirateMissionFromString(obj.mission);
            let newPirate = new PirateCard(obj.name, obj.strength, mission, obj.freeCards);
            arrRes.push( newPirate );
        });

        this.arrayDeck = arrRes;
    }

    // Pirates doesn't have same discard. Discard representing pirates defeated
    drawCards(nb: number){
        let arr:Array<PirateCard> = [];

        if(nb > 0){
            arr = nb > this.arrayDeck.length ? this.arrayDeck : this.arrayDeck.slice(0, nb);
        }

        return arr;
    }

}

export {PirateDeck};
