import {observable} from 'mobx'

import {Card} from './Card'
import {Tools} from './Tools'
import {PlayableCardInterface, FightCardPower, AgingCardPower, InitialStateInterface} from './Vendredi'
import * as _ from 'lodash'
import * as uuid from 'node-uuid'

abstract class PlayableCard extends Card implements PlayableCardInterface {

    @observable private _costToDelete: number; 
    @observable private _power: number;
    @observable private _powerUsed : boolean;
    @observable private _toDestroyAtEndOfFight: boolean;
    @observable private _initialState: InitialStateInterface;
    @observable private _id: string;

    constructor(
            name:string, 
            strength:number, 
            costToDelete: number, 
            power: number, 
            powerUsed : boolean = false,
            toDestroyAtEndOfFight:boolean = false,
            initialState: InitialStateInterface = { strength : strength, power : power},
            id = uuid.v1()
        ) {
        super(name, strength);
        this.costToDelete = costToDelete 
        this.power = power 
        this.powerUsed = powerUsed,
        this.toDestroyAtEndOfFight = toDestroyAtEndOfFight
        this.initialState = initialState
        this.id = id
    }

    usePower() {
        this.powerUsed = true;
    }

    destroy() : PlayableCard {
        this.power = null;
        this.strength = 0;
        this.toDestroyAtEndOfFight = true;  
        return this  
    }

    restore(): PlayableCard {
        this.strength = this.initialState.strength;
        this.power = this.initialState.power;
        return this
    }

    get powerName(){
        return Tools.getFightPowerName(this.power)
    }

	public get costToDelete(): number {
		return this._costToDelete;
	}
	public set costToDelete(value: number) {
		this._costToDelete = value;
	}
	public get power(): number {
		return this._power;
	}
	public set power(value: number) {
		this._power = value;
	}
	public get powerUsed(): boolean {
		return this._powerUsed;
	}
	public set powerUsed(value: boolean) {
		this._powerUsed = value;
	}
	public get toDestroyAtEndOfFight(): boolean {
		return this._toDestroyAtEndOfFight;
	}
	public set toDestroyAtEndOfFight(value: boolean) {
		this._toDestroyAtEndOfFight = value;
	}
	public get initialState(): InitialStateInterface {
		return this._initialState;
	}
	public set initialState(value: InitialStateInterface) {
		this._initialState = value;
	}
	public get id(): string {
		return this._id;
	}
	public set id(value: string) {
		this._id = value;
	}
    
}

export { PlayableCard }