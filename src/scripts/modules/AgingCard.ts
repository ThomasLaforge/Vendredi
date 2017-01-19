import { PlayableCard } from './PlayableCard';
import { Tools } from './Tools';
import { AgingCardInterface, AgingCardPower, AgingLevel } from './Vendredi'

class AgingCard extends PlayableCard implements AgingCardInterface{

    constructor(
            name:string, 
            strength:number,
            power: AgingCardPower|null, 
            public level: AgingLevel,
            powerUsed : boolean = false,
            toDestroyAtEndOfFight:boolean = false,
            costToDelete: number = 2
        ){
        super( name, strength, costToDelete, power, powerUsed, toDestroyAtEndOfFight);
    }

    get powerName(){
        return Tools.getAgingPowerName(this.power)
    }
}

export { AgingCard }
