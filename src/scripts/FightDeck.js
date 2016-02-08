import { Deck }  from "./Deck";
import { Fight } from "./Fight";

class FightDeck extends Deck {
	constructor(){
        console.log('new fight deck!');
		super();
        
	}
    
    initDeck(){
        let arrRes = [];
        let arrDatas = require('../datas/fight_cards.json');
        arrDatas.forEach( function( obj ){
            let number = obj.number;
            for (var i=0; i<number; i++) {
                let newFight = new Fight(obj);
                arrRes.push(newFight);
            }
        });
        
        this._arrayDeck = arrRes;
        
    }
}

export {FightDeck}