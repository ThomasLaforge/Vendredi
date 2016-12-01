import { Card } from './Card';
import { PirateCardInterface, PirateMission } from './Vendredi';

class PirateCard extends Card implements PirateCardInterface {

	constructor( name: string, strength: number, readonly id: number, readonly mission: PirateMission|null, readonly freeCards: number){
		super(name, strength);
	}

	/**
	 * Methods
	 */

    show(){
        console.log('PirateCard : ', this);
    }

    draw( nodeDOM:string ){
		$(nodeDOM).append(`
			<div class="pirate-card">
				<div class="pirate-card-info-zone">
					<div class="pirate-card-nbFreeCards">${this.freeCards ? this.freeCards : '*'}</div>
					<div class="pirate-card-name">${this.name}</div>
					<div class="pirate-card-strength">${this.strength ? this.strength : '*'}</div>
				</div>
				<div class="pirate-card-mission">${this.mission ? this.mission : '...'}</div>
			</div>
		`);
    }

}

export { PirateCard }
