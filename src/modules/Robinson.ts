import {observable} from 'mobx'

import { RobinsonInterface } from './Vendredi';
import { DEFAULT_USER_PSEUDO } from './Configuration';

const MAX_PV = 22;

class Robinson implements RobinsonInterface {

    @observable private _PV: number;

    constructor(PV = 20){
        this.PV = PV
    }

    addPV(nbPV: number):void{
        this.PV += nbPV;
        if(this.PV > MAX_PV){
            this.PV = MAX_PV;
        }
    }

    losePV(nbPV : number):void{
        if(this.PV>=0)
            this.PV -= nbPV;
    }

    isDead():boolean{
        return this.PV < 0;
    }

    get pseudo(){
        return 'Robinson'
    }

	public get PV(): number {
		return this._PV;
	}
	public set PV(value: number) {
		this._PV = value;
	}
    

}

export {Robinson}
