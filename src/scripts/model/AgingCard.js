import { FightCard } from './FightCard';

class AgingCard extends FightCard {
  constructor(obj){
    super(obj);
    this._power = obj.power;
    this._costToDelete = 2;
  }

  draw( nodeDOM ){
    $(nodeDOM).append(`
      <div class="fight-card">
        <div class="fight-card-strength">${this. strength}</div>
        <div class="fight-card-power ${this.power ? 'fight-card-power-malus ">' + this.power : '">'}</div>
      </div>
    `);
  }
}

export { AgingCard }
