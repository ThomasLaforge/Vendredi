import {Card} from './Card'
import {Tools} from './Tools'
import {PlayableCardInterface, FightCardPower, AgingCardPower} from './Vendredi'

class PlayableCard extends Card implements PlayableCardInterface {
    constructor(name:string, strength:number, public costToDelete, public power: FightCardPower|AgingCardPower|null){
        super(name, strength);
    }

    get powerName(){
        return Tools.getPowerName(this.power);
    }
}

export { PlayableCard }