//import { DangerCard } from './DangerCard';

class Fight {
    constructor( danger, level ){
        this._level = level;
        this._arrayFightCard = [];
        this._dangerCard = danger;
    }
    
    addFightCard( fightCard ){
        this.addFightCard.push( fightCard );
    }
    
    result(){
        // >= 0 if player win ; < 0 if player lose fight 
        let fightPoints = this.dangerCard.getStrenght( this.level );
        let playerForce = 0;
        
        this.arrayFightCard.forEach(function(fightCard) {
            playerForce += fightCard.strenght();
        });
        
        return playerForce - fightPoints;
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
}

export { Fight }