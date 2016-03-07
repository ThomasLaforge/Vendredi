import { Fight } from './Fight';
import { Card }  from './Card';

class DangerCard {
    constructor(obj){
        this._fightCard       = new Fight(obj.fight);
        this._dangerName      = obj.danger.name;
        this._dangerFreeCards = obj.danger.freeCards;
    }
    
   // Console debug
    show(){
        this.fightCard.show();
        console.log('Card Danger : name => ' + this.dangerName + ', strenght => 1 : ' + this.getStrenght(1) + ', 2 : ' + this.getStrenght(2) + ', 3 : ' + this.getStrenght(3));
    }
    
    // Draw in user interface
    draw( nodeDOM ){
        $(nodeDOM).html('Card Danger : name => ' + this.dangerName + ', strenght => 1 : ' + this.getStrenght(1) + ', 2 : ' + this.getStrenght(2) + ', 3 : ' + this.getStrenght(3));
    }
    
    getStrenght( lvl ){
        switch ( lvl ) {
            case 1:
                switch (this.dangerFreeCards) {
                    case 1:   return 0; break;
                    case 2:   return 1; break;
                    case 3:   return 2; break;
                    case 4:   return 4; break;
                    case 5:   return 5; break;
                    default: return 29; break;
                }
                break;
            case 2:
                switch (this.dangerFreeCards) {
                    case 1:   return 1; break;
                    case 2:   return 3; break;
                    case 3:   return 5; break;
                    case 4:   return 7; break;
                    case 5:   return 9; break;
                    default: return 30; break;
                }
                break;
                
            case 3:
                switch (this.dangerFreeCards) {
                    case 1:  return 3;  break;
                    case 2:  return 6;  break;
                    case 3:  return 8;  break;
                    case 4:  return 11; break;
                    case 5:  return 14; break;
                    default: return 31; break;
                }
                break;
                
            default: return 32; break;
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