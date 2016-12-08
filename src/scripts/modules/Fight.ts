import { PlayableCard } from './PlayableCard';
import { PirateCard } from './PirateCard';
import { DangerCard } from './DangerCard';
import { FightCard } from './FightCard';
import { AgingCard } from './AgingCard';
import { FightInterface, FightCardPower, AgingCardPower } from './Vendredi';

abstract class Fight implements FightInterface {

    private _freeCards : number;

    constructor( 
        public cardToFight : any, 
        public arrayFightCard : Array<PlayableCard> = [], 
        public arrayFightCardUsed : Array<PlayableCard> = [], 
        public finished : boolean = false, 
        public forcedToStop : boolean = false 
    ){
        this.freeCards = cardToFight.freeCards;
    }

    addFreeCards(cardInAddition : number) {
        this.freeCards += cardInAddition;
    }

    addFightCard( fightCard : PlayableCard ) {
        this.arrayFightCard.push( fightCard );
    }

    useCard(card : PlayableCard ) {
        let indexCard = this.arrayFightCard.indexOf(card);
        if(indexCard > -1){
            this.arrayFightCard.splice(indexCard, 1);
            this.arrayFightCardUsed.push(card);
        }
    }

    getPlayerForce() {
        let playerForce: number = 0;
        let nbCardToDouble = 0;
        let offsetCauseMaxCardEqualsZero = 0;

        let allPlayableCards = this.arrayFightCard.concat(this.arrayFightCardUsed);
        allPlayableCards.forEach( playableCard => {
            playerForce += playableCard.strength;
            if(playableCard instanceof FightCard){
                if(playableCard.power == FightCardPower.DOUBLE){
                    nbCardToDouble++;
                }
            }
            // If its AgingCard
            else{
                if(playableCard.power == AgingCardPower.MAX_EQUALS_ZERO){
                    offsetCauseMaxCardEqualsZero++;
                }
            }
        });

        // TODO : Update for loop in while loop
        let orderedPlayableCardsByStrength = allPlayableCards.sort( (a, b) => { return b.strength - a.strength; })
        for(let i = 0; i < nbCardToDouble; i++){
            let indexOfNextMaxCard = i + offsetCauseMaxCardEqualsZero;
            if( indexOfNextMaxCard < orderedPlayableCardsByStrength.length ){
                playerForce += orderedPlayableCardsByStrength[indexOfNextMaxCard].strength;
            }
        }

        return playerForce;
    }

    abstract getStrengthCardToFight() : number

    getResult(){
        // >= 0 if player win ; < 0 if player lose fight
        let fightPoints = this.getStrengthCardToFight();
        let playerForce = this.getPlayerForce();

        return playerForce - fightPoints;
    }

    isWon(){
        return this.getResult() >= 0 && this.getNumberOfCards() > 0;
    }

    isLost(){
        return !this.isWon();
    }

    getNumberOfCards(){
        return this.arrayFightCard.concat(this.arrayFightCardUsed).length;
    }

    finish(){
        this.finished = true;
    }

    getSumOfCostToDelete(){
        let sum = 0;

        this.arrayFightCard.forEach( (card : PlayableCard) => {
            sum += card.costToDelete;
        });

        return sum;
    }

    forceToStop(){
        this.forcedToStop = true;
    }

    getCardToFight(){
        return this.cardToFight;
    }
    
    getAllFightCards(){
        return this.arrayFightCard.concat(this.arrayFightCardUsed);
    }

    get freeCards() : number{
        return this._freeCards
    }
    set freeCards(newFreeCards:number){
        this._freeCards = newFreeCards;
    }
}

export { Fight }
