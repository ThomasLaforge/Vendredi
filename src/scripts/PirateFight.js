import { Fight } from './Fight';

class PirateFight extends Fight {
    constructor( card ){
        super(card);
    }

    getPlayerForce(){
        let playerForce = 0;
        
        if( this.cardToFight.id == 6 ){

        }
        else if( this.cardToFight.id == 9 ){
            
        }
        else {
            playerForce = super();
        }

        return playerForce;
    }

    getStrengthCardToFight(){
        let nbAgingCardUsed = 0;


        let res = 0;
        if(this.cardToFight.strength != null){
            res = this.cardToFight.strength;
        }
        
        if(this.cardToFight.mission != null){
            switch (this.cardToFight.id) {
                case 0:
                    res = -1;
                    // Fight all cards => 0. No instructions cause res already equal to 0
                case 1:
                    res = 2 * nbAgingCardUsed;
                    break;
                case 4:

                    break;
                default:
                    break;
            }
        }
        return res;
    }

}

export { PirateFight }
