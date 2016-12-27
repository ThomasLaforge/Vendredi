import {Card} from './Card'
import {Tools} from './Tools'
import {PlayableCardInterface, FightCardPower, AgingCardPower} from './Vendredi'
import * as _ from 'lodash'

abstract class PlayableCard extends Card implements PlayableCardInterface {

    public initialState?:PlayableCard

    constructor(name:string, strength:number, public costToDelete: number, public power: FightCardPower|AgingCardPower|null, public id:string, public powerUsed : boolean = false) {
        super(name, strength);
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