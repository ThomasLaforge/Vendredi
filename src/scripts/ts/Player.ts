const MAX_PV = 22;

class Player {

    constructor(private pseudo, private PV = 20){}

    addPV(nbPV){
        this.PV += nbPV;
        if(this.PV > MAX_PV){
            this.PV = MAX_PV;
        }
    }

    losePV(nbPV){
        this.PV -= nbPV;

        return this.isDead();
    }

    isDead(){
        return this.PV < 0;
    }

}

export {Player}
