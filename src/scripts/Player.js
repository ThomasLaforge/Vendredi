const MAX_PV = 22;

class Player {
    
    constructor(pseudo){
        this._pseudo = pseudo;
        this._PV = 20;
        console.log("New player : " + this._pseudo);
    }
    
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
    
    /**
	 * Getters and Setters
	 */
	
	// Pseudo
	get pseudo(){
		return this._pseudo;
	}
	set pseudo( newPseudo ){
		this._pseudo = newPseudo;
	}
    
    // PV
	get PV(){
		return this._PV;
	}
	set PV( newPV ){
		this._PV = newPV;
	}
    
}

export {Player}