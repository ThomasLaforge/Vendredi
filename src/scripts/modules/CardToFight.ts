import { DangerCard } from './DangerCard'
import { PirateCard } from './PirateCard'

abstract class CardToFight {

    constructor(card:PirateCard|DangerCard){

    }
}

export { CardToFight }