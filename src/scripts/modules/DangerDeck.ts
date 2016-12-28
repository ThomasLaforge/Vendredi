import {Deck}   from "./Deck";
import {DangerCard} from "./DangerCard";
import {FightCard} from "./FightCard";
import {Tools} from './Tools';
import {jsonDataDanger} from './Vendredi';

class DangerDeck extends Deck {
	constructor(){
		super();
	}

    initDeck(){
        let arrRes:Array<DangerCard> = [];
        let arrDatas = require('../../datas/dangers_cards.json');
        arrDatas.forEach( (jsonData:jsonDataDanger) => {
            let number = jsonData.number;
            for ( let i=0; i<number; i++ ) {
                let newPower = Tools.getFightPowerFromString( jsonData.fight.power );
                let newFightCard = new FightCard( jsonData.fight.name, jsonData.fight.strength, newPower );
                let newDanger = new DangerCard( newFightCard, jsonData.danger.name, jsonData.danger.freeCards );
                arrRes.push(newDanger);
            }
        });

        this.arrayDeck = arrRes;
    }

}

export {DangerDeck}
