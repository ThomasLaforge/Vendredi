import { Fight } from './Fight';
import { DangerCard } from './DangerCard';
import { GameLevel } from './Vendredi';

class DangerFight extends Fight {
    constructor( danger:DangerCard, public level: GameLevel ){
        super(danger);
    }

    getStrengthCardToFight(){
        return this.cardToFight.getStrength(this.level);
    }
}

export { DangerFight }
