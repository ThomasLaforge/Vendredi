import { Card } from './Card';

class FightCard extends Card {
    constructor(obj){
        super(obj);
        this._power = obj.power;
    }

    show(){
        console.log('Card : name => ' + this.name + ', strength => ' + this. strength + ', power => ' + this.power);
    }

    draw( nodeDOM ){
        $(nodeDOM).append(`
            <div class="fight-card">
               <div class="fight-card-strength">${this. strength}</div>
               <div class="fight-card-power">${this.power ? this.power : ''}</div>
            </div>
        `);
    }

    get power(){
        return this._power;
    }
    set power(newPower){
        this._power = newPower;
    }
}

export { FightCard }
