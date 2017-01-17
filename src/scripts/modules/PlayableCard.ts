import {Card} from './Card'
import {Tools} from './Tools'
import {PlayableCardInterface, FightCardPower, AgingCardPower} from './Vendredi'
import * as _ from 'lodash'
import * as uuid from 'node-uuid'

interface InititialStateInterface {
    strength : number
    power : any
}

abstract class PlayableCard extends Card implements PlayableCardInterface {

    constructor(
            name:string, 
            strength:number, 
            public costToDelete: number, 
            public power: any, 
            public powerUsed : boolean = false,
            public toDestroyAtEndOfFight:boolean = false,
            public id = uuid.v1(),
            public initialState: InititialStateInterface = { strength : strength, power : power}
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
}

export { PlayableCard }