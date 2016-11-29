import {Deck}   from "./Deck";
import {DangerCard} from "./DangerCard";

class DangerDeck extends Deck {
	constructor(){
		super();
	}

    initDeck(){
        let arrRes:Array<DangerCard> = [];
        let arrDatas = require('../datas/dangers_cards.json');
        arrDatas.forEach( (jsonData:JSON) => {
            let number = jsonData.number;
            for (var i=0; i<number; i++) {
                let newDanger = new DangerCard(jsonData);
                arrRes.push(newDanger);
            }
        });



        this._arrayDeck = arrRes;
    }

}

export {DangerDeck}
