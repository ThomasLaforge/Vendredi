import { Fight } from './Fight';

class PirateFight extends Fight {
    constructor( card ){
        super(card);
    }

    getStrengthCardToFight(){
        return this.cardToFight.strength;
    }
}

export { PirateFight }
