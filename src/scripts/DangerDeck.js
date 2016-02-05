import {Deck} from "./Deck";

class DangerDeck extends Deck {
	constructor(){
        console.log('new danger deck!');
		super();
	}
    
    initDeck(){
        let arrRes = [];
        let arrDatas = require('../datas/dangers_cards.json');
        arrDatas.forEach( function( elt ){
            let number = elt.number;
            for (var i=0; i<number; i++) {
                delete elt.number;
                arrRes.push(elt);
            }
        });
        
        this._arrayDeck = arrRes;
    }
    
}

export {DangerDeck}