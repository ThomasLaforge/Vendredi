import { FightCard } from './FightCard';
import { Card }  from './Card';

class DangerCard {
    constructor(obj){
        this._fightCard       = new FightCard(obj.fight);
        this._dangerName      = obj.danger.name;
        this._dangerFreeCards = obj.danger.freeCards;
    }

   // Console debug
    show(){
        this.fightCard.show();
        console.log('Card Danger : name => ' + this.dangerName + ', strength => 1 : ' + this.getStrength(1) + ', 2 : ' + this.getStrength(2) + ', 3 : ' + this.getStrength(3));
    }

    // Draw in user interface
    draw( nodeDOM ){
        $(nodeDOM).append(`
        <div class="card-slot card-danger">
            <!-- danger definition -->
            <div class="danger-card-definition">
                <div class="card-danger-name">${this.dangerName}</div>
                <div class="card-danger-details">
                    <div class="card-danger-freecards">${this.dangerFreeCards}</div>
                    <div class="card-danger-strength">
                        <div class="card-danger-strength-lvl card-danger-strength-3">${this.getStrength(3)}</div>
                        <div class="card-danger-strength-lvl card-danger-strength-2">${this.getStrength(2)}</div>
                        <div class="card-danger-strength-lvl card-danger-strength-1">${this.getStrength(1)}</div>
                    </div>
                </div>
            </div>
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

    getStrength( lvl ){
        switch ( lvl ) {
            case 1:
                switch (this.dangerFreeCards) {
                    case 1:   return 0;
                    case 2:   return 1;
                    case 3:   return 2;
                    case 4:   return 4;
                    case 5:   return 5;
                    default: return 29;
                }
            
            case 2:
                switch (this.dangerFreeCards) {
                    case 1:   return 1;
                    case 2:   return 3;
                    case 3:   return 5;
                    case 4:   return 7;
                    case 5:   return 9;
                    default: return 30;
                }
            

            case 3:
                switch (this.dangerFreeCards) {
                    case 1:  return 3; 
                    case 2:  return 6; 
                    case 3:  return 8; 
                    case 4:  return 11;
                    case 5:  return 14;
                    default: return 31;
                }
            default: return 32;
        }
    }

    get fightCard(){
        return this._fightCard;
    }
    set fightCard( newFightCard ){
        this._fightCard = newFightCard;
    }

    get dangerFreeCards(){
        return this._dangerFreeCards;
    }
    set dangerFreeCards( newDangerFreeCards ){
        this._dangerFreeCards = newDangerFreeCards;
    }

    get dangerName(){
        return this._dangerName;
    }
    set dangerName( newDangerName ){
        this._dangerName = newDangerName;
    }
}

export { DangerCard }
