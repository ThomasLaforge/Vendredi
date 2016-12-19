import { PlayableCard } from './PlayableCard';
import { Tools } from './Tools';
import { FightCardInterface, FightCardPower } from './Vendredi';

class FightCard extends PlayableCard implements FightCardInterface {

    constructor(name:string, strength:number,public power: FightCardPower|null, readonly costToDelete:number = 1 ){
        super(name, strength, costToDelete, power);
    }

    show(){
        console.log('Card : name => ' + this.name + ', strength => ' + this. strength + ', power => ' + this.power);
    }

    changePower(newPower: FightCardPower) {
        this.power = newPower;
    }

    get powerName(){
        return Tools.getFightPowerName(this.power)
    }

}

export { FightCard }
