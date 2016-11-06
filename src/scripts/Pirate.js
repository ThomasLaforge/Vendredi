class Pirate {

	constructor( obj ){
		this._name = obj.name;
		this._strength = obj.strength;
		this._nbFreeCards = obj.freeCards;
		this._mission = obj.mission;
	}

	/**
	 * Methods
	 */

    show(){
        console.log('Pirate : ');
    }

    draw( nodeDOM ){
		$(nodeDOM).append(`
			<div class="pirate-card">
				<div class="pirate-card-info-zone">
					<div class="pirate-card-nbFreeCards">${this.nbFreeCards ? this.nbFreeCards : '*'}</div>
					<div class="pirate-card-name">${this.name}</div>
					<div class="pirate-card-strength">${this.strength ? this.strength : '*'}</div>
				</div>
				<div class="pirate-card-mission">${this.mission ? this.mission : '...'}</div>
			</div>
		`);
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

	get mission(){
		return this._mission;
	}
	set mission(newMission){
		this._mission = newMission;
	}
}

export { Pirate }
