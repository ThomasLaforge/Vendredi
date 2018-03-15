import {observable} from 'mobx'

import {CardInterface} from './Vendredi';

abstract class Card implements CardInterface {

    @observable private _name: string;
    @observable private _strength: number;

    constructor(name: string, strength: number) {
        this.name = name
        this.strength = strength
    }

	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this._name = value;
	}
	public get strength(): number {
		return this._strength;
	}
	public set strength(value: number) {
		this._strength = value;
	}

}

export { Card };
