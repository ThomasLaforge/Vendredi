import { PlayableCard } from './PlayableCard';
import { PirateCard } from './PirateCard';
import { DangerCard } from './DangerCard';
import { FightCard } from './FightCard';
import { AgingCard } from './AgingCard';
import { FightInterface, FightCardPower, AgingCardPower } from './Vendredi';

abstract class Fight implements FightInterface {

    constructor( 
        public cardToFight : any, 
        public arrayFightCard : Array<PlayableCard> = [], 
        public arrayFightCardUsed : Array<PlayableCard> = [], 
        public finished : boolean = false,
        public freeCards: number = cardToFight.freeCards,
        public costOfCardsNotFree = 1
    ){}

    addFreeCards(cardInAddition : number) {
        this.freeCards += cardInAddition;
    }

    addFightCard( playableCard : PlayableCard ) {
        if(typeof playableCard !== "undefined"){
            this.arrayFightCard.push( playableCard )
        }
        else{
            console.log('Error : try to add undefined to Fight:arrayFightCard', playableCard)
        }
    }

    discard(arrayOfCardToDiscard : Array<PlayableCard>){
        arrayOfCardToDiscard.forEach( card => {
            let indexNotUsed:number = this.arrayFightCard.indexOf(card);
            let indexUsed: number = this.arrayFightCardUsed.indexOf(card);
            if(indexNotUsed !== -1){
                this.arrayFightCard.splice(indexNotUsed, 1)
            }
            if(indexUsed !== -1){
                this.arrayFightCardUsed.splice(indexUsed, 1)
            }
        })
    }

    useCard(card : PlayableCard ) {
        let indexCard = this.arrayFightCard.indexOf(card);
        if(indexCard > -1){
            this.arrayFightCard.splice(indexCard, 1);
            this.arrayFightCardUsed.push(card);
        }
    }

    getRobinsonForce() {
        let robinsonForce: number = 0;
        let allPlayableCards = this.getAllCards();
    let orderedPlayableCardsByStrength = allPlayableCards.filter( (c) => { return c.strength > 0 } ).sort( (a, b) => { return b.strength - a.strength; })
        let powersToApplyAnswer = this.getPowersToApplyOnRobinsonForce();
        let nbCardToDouble = powersToApplyAnswer.nbCardToDouble;
        let initNbCardToDouble = nbCardToDouble;
        let offsetCauseMaxCardEqualsZero = powersToApplyAnswer.offsetMaxEqualsZero;

        orderedPlayableCardsByStrength.forEach( (playableCard, i) => {
            if( i > offsetCauseMaxCardEqualsZero - 1 ){
                // Can't auto double. If only one card with double power, check if power is not Double
                if( nbCardToDouble > 0 && ( initNbCardToDouble > 1 || playableCard.power !== FightCardPower.DOUBLE ) ){
                    robinsonForce += playableCard.strength;
                    nbCardToDouble--;
                }

                robinsonForce += playableCard.strength;
            }
        })

        return robinsonForce;
    }

    getPowersToApplyOnRobinsonForce() {
        let nbCardToDouble = 0;
        let offsetCauseMaxCardEqualsZero = 0;

        this.getAllCards().forEach( playableCard => {
            if(typeof playableCard.power !== 'undefined'){
                if(playableCard instanceof FightCard){
                    if(playableCard.power === FightCardPower.DOUBLE){
                        nbCardToDouble++;
                    }
                }
                // If its AgingCard
                else {
                    if(playableCard.power === AgingCardPower.MAX_EQUALS_ZERO){
                        offsetCauseMaxCardEqualsZero++;
                    }
                }
            } 
        });

        return {
            offsetMaxEqualsZero : offsetCauseMaxCardEqualsZero,
            nbCardToDouble : nbCardToDouble
        }
    }

    abstract getStrengthCardToFight() : number

    getResult(){
        // >= 0 if robinson win ; < 0 if robinson lose fight
        let fightPoints = this.getStrengthCardToFight();
        let robinsonForce = this.getRobinsonForce();

        return robinsonForce - fightPoints;
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

    getCardToFight(){
        return this.cardToFight;
    }
    
    getAllCards() : Array<PlayableCard> {
        return this.arrayFightCard.concat(this.arrayFightCardUsed).filter( c => typeof c !== "undefined");
    }

    getAllCardsToDiscard() : Array<PlayableCard> {
        return this.getAllCards().filter( (card: PlayableCard) => { return !card.toDestroyAtEndOfFight })
    }

    getAllCardsToDestroy() : Array<PlayableCard> {
        return this.getAllCards().filter( (card: PlayableCard) => { return card.toDestroyAtEndOfFight })
    } 

    hasStopCard() : boolean {
        return this.getAllCards().filter( (card:PlayableCard) => { return card instanceof AgingCard && card.power === AgingCardPower.STOP}).length > 0
    }
}

export { Fight }
