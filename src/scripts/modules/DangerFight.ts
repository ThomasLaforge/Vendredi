import { Fight } from './Fight';
import { DangerCard } from './DangerCard';
import { GameLevel,DangerFightInterface } from './Vendredi';

class DangerFight extends Fight implements DangerFightInterface {
    constructor( danger:DangerCard, public level: GameLevel ){
        super(danger);
    }

    getStrengthCardToFight(){
        return this.cardToFight.getStrength(this.level);
    }

    getResult(){
        // >= 0 if player win ; < 0 if player lose fight
        let fightPoints = this.getStrengthCardToFight();
        let playerForce = this.getPlayerForce();

        return playerForce - fightPoints;
    }
}

export { DangerFight }
