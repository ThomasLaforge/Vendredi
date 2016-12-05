import { PlayableCard } from './PlayableCard';
import { FightCardInterface, FightCardPower } from './Vendredi';

class FightCard extends PlayableCard implements FightCardInterface {

    constructor(name:string, strength:number, readonly power: FightCardPower|null, readonly costToDelete:number = 1 ){
        super(name, strength, costToDelete);
    }

    show(){
        console.log('Card : name => ' + this.name + ', strength => ' + this. strength + ', power => ' + this.power);
    }

}

export { FightCard }
