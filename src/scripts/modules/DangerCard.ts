import { FightCard } from './FightCard';
import { Card } from './Card';
import { DangerCardInterface, FightCardInterface, GameLevel } from './Vendredi';

class DangerCard implements DangerCardInterface {

    constructor(readonly fightCard: FightCardInterface, readonly name: string, readonly freeCards: number) { }

    // Console debug
    show() {
        this.fightCard.show();
        console.log('Card Danger : name => ' + this.name + ', strength => 1 : ' + this.getStrength(1) + ', 2 : ' + this.getStrength(2) + ', 3 : ' + this.getStrength(3));
    }

    getStrength(lvl: GameLevel) {
        switch (lvl) {
            case GameLevel.FirstRound:
                switch (this.freeCards) {
                    case 1: return 0;
                    case 2: return 1;
                    case 3: return 2;
                    case 4: return 4;
                    case 5: return 5;
                    default: return 29;
                }

            case GameLevel.SecondRound:
                switch (this.freeCards) {
                    case 1: return 1;
                    case 2: return 3;
                    case 3: return 5;
                    case 4: return 7;
                    case 5: return 9;
                    default: return 30;
                }


            case GameLevel.ThirdRound:
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

}

export { DangerCard }
