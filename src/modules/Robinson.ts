import { RobinsonInterface } from './Vendredi';
import { DEFAULT_USER_PSEUDO } from './Configuration';

const MAX_PV = 22;

class Robinson implements RobinsonInterface {

    constructor(public PV = 20){}

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

}

export {Robinson}
