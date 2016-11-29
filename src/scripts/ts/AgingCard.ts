import { FightCard } from './FightCard';

class AgingCard extends FightCard {
  private power;
  private costToDelete;

  constructor(obj){
    super(obj);
    this.power = obj.power;
    this.costToDelete = 2;
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
