const MAX_PV = 22;

class Player {
    
    constructor(pseudo){
        this._pseudo = pseudo;
        this._PV = 20;
        console.log("New player : " + this._pseudo);
    }
    
    addPV(nbPV){
        this._PV += nbPV;
        if(this._PV > MAX_PV){
            this._PV = MAX_PV;
        }
    }
    
    losePV(nbPV){
        this._PV -= nbPV;
        
        return this.isDead();
    }
    
    isDead(){
        return this._PV < 0;
    }
}

export {Player}