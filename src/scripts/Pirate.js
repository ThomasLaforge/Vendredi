class Pirate {

	constructor( obj ){
		this._name = obj.name;
		this._strength = obj.strength;
		this._nbFreeCards = obj.nbFreeCards;
		this._power = obj.power;
	}

	/**
	 * Methods
	 */

    show(){
        console.log('Pirate : ');
    }

    draw( nodeDOM ){

    }

	/**
	 * Getters and Setters
	 */

  get name(){
    return this._name;
  }
  set name( newName ){
    this._name = newName;
  }

	// strength

	get strength(){
		return this._strength;
	}
	set strength(newstrength){
		this._strength = newstrength;
	}

	// nbFreeCards

	get nbFreeCards(){
		return this._nbFreeCards;
	}
	set nbFreeCards(newNbFreeCards){
		this._nbFreeCards = newNbFreeCards;
	}

	// power

	get power(){
		return this._power;
	}
	set power(newPower){
		this._power = newPower;
	}
}

export { Pirate }
