import { Card } from './Card';
import { Tools } from './Tools';
import { PirateCardInterface, PirateMission } from './Vendredi';

class PirateCard extends Card implements PirateCardInterface {

	constructor( name: string, strength: number, public id: number, public mission: PirateMission|null, public freeCards: number){
		super(name, strength);
	}

	/**
	 * Methods
	 */

	getStrength(){
		return 0;
	}

    show(){
        console.log('PirateCard : ', this);
    }

	missionName(){
        return Tools.getPirateMissionName(this.mission);
    }

}

export { PirateCard }
