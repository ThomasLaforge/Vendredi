import {observable} from 'mobx'

import { Card } from './Card';
import { Tools } from './Tools';
import { PirateCardInterface, PirateMission } from './Vendredi';

class PirateCard extends Card implements PirateCardInterface {

	@observable private _mission: PirateMission;
	@observable private _freeCards: number;

	constructor( name: string, strength: number, mission: PirateMission | null, freeCards: number){
		super(name, strength);
		this.mission = mission
		this.freeCards = freeCards
	}

	/**
	 * Methods
	 */

	getStrength(){
		console.log('Why this method ? need to be checked')
		return 0;
	}

	missionName(){
        return Tools.getPirateMissionName(this.mission);
	}
	
	public get mission(): PirateMission {
		return this._mission;
	}
	public set mission(value: PirateMission) {
		this._mission = value;
	}
	public get freeCards(): number {
		return this._freeCards;
	}
	public set freeCards(value: number) {
		this._freeCards = value;
	}
	

}

export { PirateCard }
