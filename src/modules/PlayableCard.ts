import {Card} from './Card'
import {Tools} from './Tools'
import {PlayableCardInterface, FightCardPower, AgingCardPower, InitialStateInterface} from './Vendredi'
import * as _ from 'lodash'
import * as uuid from 'node-uuid'

abstract class PlayableCard extends Card implements PlayableCardInterface {

    constructor(
            name:string, 
            strength:number, 
            public costToDelete: number, 
            public power: any, 
            public powerUsed : boolean = false,
            public toDestroyAtEndOfFight:boolean = false,
            public initialState: InitialStateInterface = { strength : strength, power : power},
            public id = uuid.v1()
        ) {
        super(name, strength);
    }

    usePower() {
        this.powerUsed = true;
    }

    destroy() : PlayableCard {
        this.power = null;
        this.strength = 0;
        this.toDestroyAtEndOfFight = true;  
        return this  
    }

    restore(): PlayableCard {
        this.strength = this.initialState.strength;
        this.power = this.initialState.power;
        return this
    }

    get powerName(){
        return Tools.getFightPowerName(this.power)
    }
}

export { PlayableCard }