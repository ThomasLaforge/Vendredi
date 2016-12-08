import { FightCard } from './FightCard';
import { Tools } from './Tools';
import { Card } from './Card';
import { PlayableCard } from './PlayableCard';
import { DangerCardInterface, FightCardInterface, GameLevel } from './Vendredi';

class DangerCard implements DangerCardInterface {

    constructor(readonly fightCard: FightCard, readonly name: string, readonly freeCards: number, public arrCardsToDelete:Array<PlayableCard> = []) { }

    // Console debug
    show() {
        this.fightCard.show();
        console.log('Card Danger : name => ' + this.name + ', strength => 1 : ' + this.getStrength(1) + ', 2 : ' + this.getStrength(2) + ', 3 : ' + this.getStrength(3));
    }

    getStrength(lvl: GameLevel) {
        switch (lvl) {
            case GameLevel.FIRST_ROUND:
                switch (this.freeCards) {
                    case 1: return 0;
                    case 2: return 1;
                    case 3: return 2;
                    case 4: return 4;
                    case 5: return 5;
                    default: return 29;
                }

            case GameLevel.SECONDE_ROUND:
                switch (this.freeCards) {
                    case 1: return 1;
                    case 2: return 3;
                    case 3: return 5;
                    case 4: return 7;
                    case 5: return 9;
                    default: return 30;
                }


            case GameLevel.THIRD_ROUND:
                switch (this.freeCards) {
                    case 1: return 3;
                    case 2: return 6;
                    case 3: return 8;
                    case 4: return 11;
                    case 5: return 14;
                    default: return 31;
                }
            default: return 32;
        }
    }

    powerName(){
        return this.fightCard.powerName;
    }

}

export { DangerCard }
