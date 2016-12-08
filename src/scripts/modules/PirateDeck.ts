import {Deck} from "./Deck";
import {PirateCard} from "./PirateCard";
import {Tools} from './Tools';
import {jsonDataPirate} from './Vendredi';

class PirateDeck extends Deck{
    constructor(){
        super();
    }

    initDeck(){
        let arrRes:Array<PirateCard> = [];
        let arrDatas = require( '../../datas/pirates_cards.json' );
        arrDatas.forEach( (obj: jsonDataPirate) => {
            let mission = obj.mission ? Tools.getPirateMissionFromString(obj.mission) : null;
            let newPirate = new PirateCard(obj.name, obj.strength, obj.id, mission, obj.freeCards);
            arrRes.push( newPirate );
        });

        this.arrayDeck = arrRes;
    }

    // Pirates doesn't have same discard. Discard representing pirates defeated
    drawCards(nb: number){
        let arr:Array<PirateCard> = [];

        if(nb > 0){
            if(nb > this.arrayDeck.length){
                arr = this.arrayDeck;
            }
            else{
                return this.arrayDeck.slice(0, nb);
            }
        }

        return arr;
    }

}

export {PirateDeck};
