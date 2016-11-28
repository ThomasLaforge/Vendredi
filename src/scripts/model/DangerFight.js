import { Fight } from './Fight';

class DangerFight extends Fight {
    constructor( card, level ){
        super(card);
        this._level = level;
    }

    getStrengthCardToFight(){
        return this.cardToFight.getStrength(this.level);
    }

    // Level
    get level(){
        return this._level;
    }
    set level( newLevel ){
        this._level = newLevel;
    }
}

export { DangerFight }
