import {observable} from 'mobx'

import { Fight } from './Fight';
import { DangerCard } from './DangerCard';
import { PlayableCard } from './PlayableCard';
import { GameLevel,DangerFightInterface } from './Vendredi';

class DangerFight extends Fight implements DangerFightInterface {
    
    @observable private _level: GameLevel;

    constructor( 
        cardToFight:DangerCard, 
        level: GameLevel,         
        arrayFightCard : Array<PlayableCard> = [], 
        arrayFightCardUsed : Array<PlayableCard> = [], 
        finished : boolean = false,
        freeCards: number = cardToFight.freeCards
    ){
        super(cardToFight, arrayFightCard, arrayFightCardUsed, finished, freeCards);
        this.level = level
    }

    getStrengthCardToFight(){
        return this.cardToFight.getStrength(this.level);
    }

    setLevelDown(){
        if(this.level > GameLevel.FIRST_ROUND){
            this.level -= 1;        
        }
    }

    getResult(){
        // >= 0 if robinson win ; < 0 if robinson lose fight
        let fightPoints = this.getStrengthCardToFight();
        let robinsonForce = this.getRobinsonForce();

        return robinsonForce - fightPoints;   
    }

	public get level(): GameLevel {
		return this._level;
	}
	public set level(value: GameLevel) {
		this._level = value;
	}
    
}

export { DangerFight }
