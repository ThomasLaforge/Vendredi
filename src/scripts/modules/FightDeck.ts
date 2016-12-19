import { PlayableDeck }  from "./PlayableDeck";
import { FightCard } from "./FightCard";
import { Tools } from './Tools';
import { jsonDataFight } from './Vendredi';

class FightDeck extends PlayableDeck {
	constructor(){
		super();
	}

    initDeck(){
        let arrRes:Array<FightCard> = [];
        let arrDatas = require('../../datas/fight_cards.json');
        arrDatas.forEach( (obj:jsonDataFight) => {
            let number = obj.number;
            let power = obj.power ? Tools.getFightPowerFromString(obj.power) : null;
            for (var i=0; i<number; i++) {
                let newFight = new FightCard(obj.name, obj.strength, power);
                arrRes.push(newFight);
            }
        });

        this.arrayDeck = arrRes;

    }
}

export {FightDeck}
