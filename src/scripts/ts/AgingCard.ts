import { PlayableCard } from './PlayableCard';
import { AgingCardInterface, AgingCardPower, AgingLevel } from './Vendredi'

class AgingCard extends PlayableCard implements AgingCardInterface{

    constructor(name:string, strength:number,  readonly costToDelete: number = 2, readonly power: AgingCardPower|null, readonly level : AgingLevel ){
        super(name, strength, costToDelete);
    }

    draw( nodeDOM : string){
        $(nodeDOM).append(`
        <div class="fight-card">
            <div class="fight-card-strength">${this. strength}</div>
            <div class="fight-card-power ${this.power ? 'fight-card-power-malus ">' + this.power : '">'}</div>
        </div>
        `);
    }
}

export { AgingCard }
