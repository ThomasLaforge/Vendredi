import { Card } from './Card';
import { PirateCard } from './PirateCard';
import { DangerCard } from './DangerCard';
import { FightCard } from './FightCard';
import { AgingCard } from './AgingCard';

class Fight {

    constructor( private cardToFight : PirateCard|DangerCard, protected arrayFightCard : Array<FightCard|AgingCard> = [], protected arrayFightCardUsed : Array<FightCard|AgingCard> = [], private finished : boolean = false ){}

    addFightCard( fightCard : FightCard|AgingCard ){
        this.arrayFightCard.push( fightCard );
    }

    useCard(card : FightCard ){
        let indexCard = this.arrayFightCard.indexOf(card);
        if(indexCard > -1){
            this.arrayFightCard.splice(indexCard, 1);
            this.arrayFightCardUsed.push(card);
        }
    }

    getPlayerForce(){
        let playerForce = 0;

        this.arrayFightCard.concat(this.arrayFightCardUsed);
        this.arrayFightCard.forEach( fightCard => {
            playerForce += fightCard.getStrength();
        });

        return playerForce;
    }

    result(){
        // >= 0 if player win ; < 0 if player lose fight
        let fightPoints = this.getStrengthCardToFight();
        let playerForce = this.getPlayerForce();

        return playerForce - fightPoints;
    }

    isWon(){
        return this.result() >= 0 && this.getNumberOfCards() > 0;
    }

    isLost(){
        return !this.isWon();
    }

    getNumberOfCards(){
        return this.arrayFightCard.length;
    }

    finish(){
        this.finished = true;
    }

    getSumOfCostToDelete(){
        let sum = 0;

        this.arrayFightCard.forEach( (card : FightCard|AgingCard) => {
            sum += card.getCostToDelete();
        });

        return sum;
    }

    getCardToFight(){
        return this.cardToFight;
    }
    
    getAllFightCards(){
        return this.arrayFightCard.concat(this.arrayFightCardUsed);
    }
}

export { Fight }
