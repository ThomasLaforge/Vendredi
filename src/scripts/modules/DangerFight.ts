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
        public finished : boolean = false,
        freeCards: number = cardToFight.freeCards
    ){
        super(cardToFight, arrayFightCard, arrayFightCardUsed, finished, freeCards);
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
        // >= 0 if robinson win ; < 0 if robinson lose fight
        let fightPoints = this.getStrengthCardToFight();
        let robinsonForce = this.getRobinsonForce();

        return robinsonForce - fightPoints;   
    }
}

export { DangerFight }
