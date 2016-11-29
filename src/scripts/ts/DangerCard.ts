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

    // Draw in user interface
    draw(nodeDOM: string) {
        $(nodeDOM).append(`
        <div class="card-slot card-danger">
            <!-- danger definition -->
            <div class="danger-card-definition">
                <div class="card-danger-name">${this.name}</div>
                <div class="card-danger-details">
                    <div class="card-danger-freecards">${this.freeCards}</div>
                    <div class="card-danger-strength">
                        <div class="card-danger-strength-lvl card-danger-strength-3">${this.getStrength(3)}</div>
                        <div class="card-danger-strength-lvl card-danger-strength-2">${this.getStrength(2)}</div>
                        <div class="card-danger-strength-lvl card-danger-strength-1">${this.getStrength(1)}</div>
                    </div>
                </div>
            </div>

            <div class="bambou-separation"></div>
            <!-- fight definition -->
            <div class="card-danger-fight-definition">
                <div class="card-danger-fight-main-info">
                    <div class="card-danger-fight-strength">${this.fightCard.strength}</div>
                    <div class="card-danger-fight-name">${this.fightCard.name}</div>
                    <div class="card-danger-fight-destroycost">${this.fightCard.costToDelete}</div>
                </div>
                <div class="card-danger-fight-power">${this.fightCard.power ? this.fightCard.power : '...'}</div>
            </div>
        </div>
        `);
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
