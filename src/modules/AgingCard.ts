import {observable} from 'mobx'

import { PlayableCard } from './PlayableCard';
import { Tools } from './Tools';
import { AgingCardInterface, AgingCardPower, AgingLevel, InitialStateInterface } from './Vendredi'

class AgingCard extends PlayableCard implements AgingCardInterface {

    @observable private _level: AgingLevel;

    constructor(
            name:string, 
            strength:number,
            power: AgingCardPower|null, 
            level: AgingLevel,
            powerUsed : boolean = false,
            toDestroyAtEndOfFight:boolean = false,
            initialState: InitialStateInterface = { strength : strength, power : power},
            costToDelete: number = 2,
        ){
        super( name, strength, costToDelete, power, powerUsed, toDestroyAtEndOfFight, initialState);
        this.level = level
    }

    get powerName(){
        return Tools.getAgingPowerName(this.power)
    }
    
	public get level(): AgingLevel {
		return this._level;
	}
	public set level(value: AgingLevel) {
		this._level = value;
	}

}

export { AgingCard }
