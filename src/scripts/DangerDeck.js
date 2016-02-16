import {Deck}   from "./Deck";
import {DangerCard} from "./DangerCard";

class DangerDeck extends Deck {
	constructor(){
        console.log('new danger deck!');
		super();
	}
    
    initDeck(){
        let arrRes = [];
        let arrDatas = require('../datas/dangers_cards.json');
        arrDatas.forEach( function( obj ){
            let number = obj.number;
            for (var i=0; i<number; i++) {
                let newDanger = new DangerCard(obj);
                arrRes.push(newDanger);
            }
        });
        
        this._arrayDeck = arrRes;
    }
    
}

export {DangerDeck}