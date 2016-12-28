import {Card} from './Card'
import {Tools} from './Tools'
import {PlayableCardInterface, FightCardPower, AgingCardPower} from './Vendredi'
import * as _ from 'lodash'
import * as uuid from 'node-uuid'

abstract class PlayableCard extends Card implements PlayableCardInterface {

    public initialState?:PlayableCard
    public id: string

    constructor(name:string, strength:number, public costToDelete: number, public power: FightCardPower|AgingCardPower|null, public powerUsed : boolean = false) {
        super(name, strength);
        this.id = uuid.v1();
        this.initialState = _.clone(this);
    }

    // How not implements it o
    abstract show() : void

    usePower() {
        this.powerUsed = true;
    }

    destroy() {
        this.power = null;
        this.strength = 0;
    }
}

export { PlayableCard }