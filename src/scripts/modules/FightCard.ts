import { PlayableCard } from './PlayableCard';
import { Tools } from './Tools';
import * as uuid from 'node-uuid'
import { FightCardInterface, FightCardPower } from './Vendredi';

class FightCard extends PlayableCard implements FightCardInterface {

    constructor(
            name:string, 
            strength:number, 
            power: FightCardPower|null, 
            powerUsed : boolean = false,
            toDestroyAtEndOfFight:boolean = false,
            costToDelete: number = 1
        ){
        super( name, strength, costToDelete, power, powerUsed, toDestroyAtEndOfFight);
    }

    changePower(newPower: FightCardPower) {
        this.power = newPower;
    }

    getNumberOfCardAssignable(){
        // Card with two step power
        switch (this.power) {
            case FightCardPower.COPY_ONE:
            case FightCardPower.DESTROY:
            case FightCardPower.SWAP_ONE:
            case FightCardPower.UNDER_THE_DECK:
                return 1;
            case FightCardPower.SWAP_TWO:
                return 2;
            case FightCardPower.SORT_THREE_CARDS:
                return 3;
            default:
                return 1;
        }
    }

    get powerName(){
        return Tools.getFightPowerName(this.power)
    }

}

export { FightCard }
