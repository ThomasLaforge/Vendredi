import { PlayableCard } from './PlayableCard';
import { Tools } from './Tools';
import { AgingCardInterface, AgingCardPower, AgingLevel } from './Vendredi'

class AgingCard extends PlayableCard implements AgingCardInterface{

    constructor(name:string, strength:number, public power: AgingCardPower|null, public level : AgingLevel, public costToDelete: number = 2 ){
        super(name, strength, costToDelete, power);
    }

    get powerName(){
        return Tools.getAgingPowerName(this.power)
    }
}

export { AgingCard }
