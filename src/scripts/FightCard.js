import { Card } from './Card';

class FightCard extends Card {
    constructor(obj){
        super(obj);
        this._power = obj.power;
    }
    
    show(){
        console.log('Card : name => ' + this.name + ', strenght => ' + this. strenght + ', power => ' + this.power);
    }
    
    get power(){
        return this._power;
    }
    set power(newPower){
        this._power = newPower;
    }
}

export { FightCard }