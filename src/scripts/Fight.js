//import { DangerCard } from './DangerCard';

class Fight {
    constructor( danger, level ){
        this._level = level;
        this._arrayFightCard = [];
        this._arrayFightCardUsed = [];
        this._dangerCard = danger;
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

        this.arrayFightCard.forEach(function(fightCard) {
            playerForce += fightCard.strength;
        });

        return playerForce;
    }

    result(){
        // >= 0 if player win ; < 0 if player lose fight
        let fightPoints = this.dangerCard.getStrength( this.level );
        let playerForce = this.getPlayerForce();

        return playerForce - fightPoints;
    }

    isWon(){
        return this.result() >= 0 && this.getNumberOfCards() >= 1;
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

        this.arrayFightCard.forEach( function( elt ){
            sum += elt.costToDelete;
        });

        return sum;
    }

    /**
    * Getters and Setters
    */

    // DangerCard
    get dangerCard(){
        return this._dangerCard;
    }
    set dangetCard( newDangerCard ){
        this._dangerCard = newDangerCard;
    }

    // ArrayFightCard
    get arrayFightCard(){
        return this._arrayFightCard;
    }
    set arrayFightCard( newArrayFightCard ){
        this._arrayFightCard = newArrayFightCard;
    }

    // Level
    get level(){
        return this._level;
    }
    set level( newLevel ){
        this._level = newLevel;
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
