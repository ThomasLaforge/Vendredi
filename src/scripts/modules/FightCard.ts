import { PlayableCard } from './PlayableCard';
import { Tools } from './Tools';
import { FightCardInterface, FightCardPower } from './Vendredi';

class FightCard extends PlayableCard implements FightCardInterface {

    constructor( name:string, strength:number, public power: FightCardPower|null, readonly costToDelete:number = 1 ){
        super( name, strength, costToDelete, power );
    }

    show(){
        console.log('Card : name => ' + this.name + ', strength => ' + this. strength + ', power => ' + this.power);
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
