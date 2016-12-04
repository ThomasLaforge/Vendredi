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

}

export { PirateCard }
