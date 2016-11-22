import { Fight } from './Fight';

class PirateFight extends Fight {
    constructor( card ){
        super(card);
    }

    getPlayerForce(){
        let res = super();
        if(this.cardToFight.strength != null){
            res = this.cardToFight.strength;
        }
        
        if(this.cardToFight.mission != null){
            switch (this.cardToFight.id) {
                case 0:
                case 1:
                    // Fight all cards => 0. No instructions cause res already equal to 0
                    break;
                default:
                    break;
            }
        }
        return res;
    }
}

export { PirateFight }
