import { Fight } from './Fight';
import { DangerCard } from './DangerCard';
import { PlayableCard } from './PlayableCard';
import { GameLevel,DangerFightInterface } from './Vendredi';

class DangerFight extends Fight implements DangerFightInterface {
    constructor( 
        cardToFight:DangerCard, 
        public level: GameLevel,         
        public arrayFightCard : Array<PlayableCard> = [], 
        public arrayFightCardUsed : Array<PlayableCard> = [], 
        public finished : boolean = false
    ){
        super(cardToFight, arrayFightCard, arrayFightCardUsed, finished);
    }

    getStrengthCardToFight(){
        return this.cardToFight.getStrength(this.level);
    }

    setLevelDown(){
        if(this.level > GameLevel.FIRST_ROUND){
            this.level -= 1;        
        }
    }

    getResult(){
        // >= 0 if player win ; < 0 if player lose fight
        let fightPoints = this.getStrengthCardToFight();
        let playerForce = this.getPlayerForce();

        return playerForce - fightPoints;   
    }
}

export { DangerFight }
