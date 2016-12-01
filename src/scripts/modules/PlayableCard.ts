import {Card} from './Card'
import {PlayableCardInterface} from './Vendredi'

class PlayableCard extends Card implements PlayableCardInterface {
    constructor(name:string, strength:number, public costToDelete:number){
        super(name, strength);
    }
}

export { PlayableCard }