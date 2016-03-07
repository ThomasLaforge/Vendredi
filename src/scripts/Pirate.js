const PIRATESLIST = require('../datas/pirates_cards.json');

class Pirate {

	constructor(name, strength, nbFreeCards, power){
		console.log('New pirate !');
		this._name = name;
		this._strength = strength;
		this._nbFreeCards = nbFreeCards;
		this._power = power;
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