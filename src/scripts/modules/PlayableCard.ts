import {Card} from './Card'
import {Tools} from './Tools'
import {PlayableCardInterface, FightCardPower, AgingCardPower} from './Vendredi'
import * as _ from 'lodash'
import * as uuid from 'node-uuid'

abstract class PlayableCard extends Card implements PlayableCardInterface {

    public initialState:PlayableCard

    constructor(
            name:string, 
            strength:number, 
            public costToDelete: number, 
            public power: any, 
            public powerUsed : boolean = false,
            public toDestroyAtEndOfFight:boolean = false,
            public id = uuid.v1()
        ) {
        super(name, strength);
        this.initialState = _.clone(this);
        this.initialState.initialState = this.initialState;
    }

    usePower() {
        this.powerUsed = true;
    }

    destroy() {
        this.power = null;
        this.strength = 0;
        this.toDestroyAtEndOfFight = true;
    }
}

export { PlayableCard }