import { PlayableCard } from './PlayableCard';
import { FightCardInterface, FightCardPower } from './Vendredi';

class FightCard extends PlayableCard implements FightCardInterface {

    constructor(name:string, strength:number, readonly costToDelete:number = 1, readonly power: FightCardPower|null ){
        super(name, strength, costToDelete);
    }

    show(){
        console.log('Card : name => ' + this.name + ', strength => ' + this. strength + ', power => ' + this.power);
    }

    draw( nodeDOM:string ){
        $(nodeDOM).append(`
            <div class="fight-card">
               <div class="fight-card-strength">${this. strength}</div>
               <div class="fight-card-power">${this.power ? this.power : ''}</div>
            </div>
        `);
    }

}

export { FightCard }
