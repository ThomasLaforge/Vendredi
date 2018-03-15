import {observable} from 'mobx'

import { PlayableCard } from './PlayableCard';
import { PirateCard } from './PirateCard';
import { DangerCard } from './DangerCard';
import { FightCard } from './FightCard';
import { AgingCard } from './AgingCard';
import { FightInterface, FightCardPower, AgingCardPower } from './Vendredi';

abstract class Fight implements FightInterface {

    @observable private _cardToFight: any;
    @observable private _arrayFightCard: PlayableCard[];
    @observable private _arrayFightCardUsed: PlayableCard[];
    @observable private _finished: boolean;
    @observable private _freeCards: number;
    @observable private _costOfCardsNotFree: number;


    constructor( cardToFight : any, arrayFightCard : PlayableCard[] = [], arrayFightCardUsed : PlayableCard[] = [], finished : boolean = false, freeCards: number = cardToFight.freeCards, costOfCardsNotFree = 1) {
        this.cardToFight = cardToFight
        this.arrayFightCard = arrayFightCard
        this.arrayFightCardUsed = arrayFightCardUsed
        this.finished = finished
        this.freeCards = freeCards
        this.costOfCardsNotFree = costOfCardsNotFree
    }

    addFreeCards(cardInAddition : number) {
        this.freeCards += cardInAddition;
    }

    addFightCard( playableCard : PlayableCard ) {
        if(typeof playableCard !== "undefined"){
            this.arrayFightCard.push( playableCard )
        }
        else{
            // console.log('Error : try to add undefined to Fight:arrayFightCard', playableCard)
            Error('Error : try to add undefined to Fight:arrayFightCard' + JSON.stringify(playableCard))
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
        allPlayableCards.filter( c => { return c.strength < 0}).forEach( c => {
            robinsonForce += c.strength;
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

	public get cardToFight(): any {
		return this._cardToFight;
	}
	public set cardToFight(value: any) {
		this._cardToFight = value;
	}
	public get arrayFightCard(): PlayableCard[] {
		return this._arrayFightCard;
	}
	public set arrayFightCard(value: PlayableCard[]) {
		this._arrayFightCard = value;
	}
	public get arrayFightCardUsed(): PlayableCard[] {
		return this._arrayFightCardUsed;
	}
	public set arrayFightCardUsed(value: PlayableCard[]) {
		this._arrayFightCardUsed = value;
	}
	public get finished(): boolean {
		return this._finished;
	}
	public set finished(value: boolean) {
		this._finished = value;
	}
	public get freeCards(): number {
		return this._freeCards;
	}
	public set freeCards(value: number) {
		this._freeCards = value;
	}
	public get costOfCardsNotFree(): number {
		return this._costOfCardsNotFree;
	}
	public set costOfCardsNotFree(value: number) {
		this._costOfCardsNotFree = value;
	}
}

export { Fight }
