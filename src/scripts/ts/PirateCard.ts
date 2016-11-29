class PirateCard {

	private id;
	private name;
	private strength;
	private nbFreeCards;
	private mission;

	constructor( obj ){
		this.id = obj.id;
		this.name = obj.name;
		this.strength = obj.strength;
		this.nbFreeCards = obj.freeCards;
		this.mission = obj.mission;
	}

	/**
	 * Methods
	 */

    show(){
        console.log('PirateCard : ');
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

}

export { PirateCard }
