import {Card} from './Card'
import {Tools} from './Tools'
import {PlayableCardInterface, FightCardPower, AgingCardPower} from './Vendredi'

class PlayableCard extends Card implements PlayableCardInterface {
    constructor(name:string, strength:number, public costToDelete, public power: FightCardPower|AgingCardPower|null, public powerUsed : boolean = false){
        super(name, strength);
    }

    usePower(){
        this.powerUsed = true;
    }
}

export { PlayableCard }