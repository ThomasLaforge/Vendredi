import { PlayerInterface } from './Vendredi';

const MAX_PV = 22;

class Player implements PlayerInterface {

    constructor(public pseudo: string, public PV = 20){}

    addPV(nbPV: number):void{
        this.PV += nbPV;
        if(this.PV > MAX_PV){
            this.PV = MAX_PV;
        }
    }

    losePV(nbPV : number):void{
        this.PV -= nbPV;
    }

    isDead():boolean{
        return this.PV < 0;
    }

}

export {Player}
