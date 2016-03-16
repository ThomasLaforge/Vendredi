import { Card } from './Card';

class AgingCard extends Card {
  constructor(obj){
    super(obj);
    this._power = obj.power;
    this._costToDelete = 2;
  }

  show(){
    console.log('Card : name => ' + this.name + ', strength => ' + this. strength + ', power => ' + this.power);
  }

  draw( nodeDOM ){
    $(nodeDOM).append('<div>Card : name => ' + this.name + ', strength => ' + this. strength + ', power => ' + this.power + '</div>');
  }

  get power(){
    return this._power;
  }
  set power(newPower){
    this._power = newPower;
  }
}

export { AgingCard }
