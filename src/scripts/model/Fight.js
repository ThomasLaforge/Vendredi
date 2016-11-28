//import { cardToFight } from './cardToFight';

class Fight {
    constructor( card ){
        this._arrayFightCard = [];
        this._arrayFightCardUsed = [];
        this._cardToFight = card;
        this._finished = false;
    }

    addFightCard( fightCard ){
        this.arrayFightCard.push( fightCard );
    }

    useCard(card){
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
            playerForce += fightCard.strength;
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

        this.arrayFightCard.forEach( elt => {
            sum += elt.costToDelete;
        });

        return sum;
    }

    /**
    * Getters and Setters
    */

    // cardToFight
    get cardToFight(){
        return this._cardToFight;
    }
    set dangetCard( newcardToFight ){
        this._cardToFight = newcardToFight;
    }

    // ArrayFightCard
    get arrayFightCard(){
        return this._arrayFightCard;
    }
    set arrayFightCard( newArrayFightCard ){
        this._arrayFightCard = newArrayFightCard;
    }

    // Finished
    get finished(){
        return this._finished;
    }
    set finished( newFinished ){
        this._finished = newFinished;
    }

    // arrayFightCardUsed
    get arrayFightCardUsed(){
        return this._arrayFightCardUsed;
    }
    set arrayFightCardUsed(newArray){
        return this._arrayFightCardUsed = newArray;
    }
}

export { Fight }
