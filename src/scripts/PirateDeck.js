import {Deck} from "./Deck";
import {PirateCard} from "./PirateCard";

class PirateDeck extends Deck{
    constructor(){
        super();
    }

    initDeck(){
        let arrRes = [];
        let arrDatas = require( '../datas/pirates_cards.json' );
        arrDatas.forEach( function( obj ){
            let newPirate = new PirateCard( obj );
            arrRes.push( newPirate );
        });

        this._arrayDeck = arrRes;
    }

    getPirates(nb){
        let arr = [];

        if(nb > 0){
            if(nb > this._arrayDeck.length){
                arr = this._arrayDeck;
            }
            else{
                return this._arrayDeck.slice(0, nb);
            }
        }

        return arr;
    }

}

export {PirateDeck};
