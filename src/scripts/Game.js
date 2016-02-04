import { Deck }       from './Deck';
import { FightDeck }  from './FightDeck';
import { DangerDeck } from './DangerDeck';
import { AgingDeck }  from './AgingDeck';
import { PirateDeck } from './PirateDeck';
// import {Deck} from './Deck';


class Game {
	constructor( player, difficulty ){
		this._player        = player;
        this._difficulty    = difficulty;
		// Decks
		this._fightDeck     = new FightDeck();
		this._dangerDeck    = new DangerDeck();
		this._agingDeck     = new AgingDeck( this._difficulty );
		this._pirateDeck    = new PirateDeck();
        this._pirates       = this.pirateDeck.getPirates( 2 );
        this._level         = 1;
	}

	isGameOver(){
        return this._player.isDead();
    }    
        
    drawFightCard(){
        if ( this.fightDeck.isEmpty() ){
            // On ajoute une carte vieillissement dans la défausse
            let newAgingCard = this.agingDeck.drawCards( 1 );
            this.fightDeck.addToDiscard( newAgingCard );
            // On ajoute la défausse au deck et on mélange
            this.fightDeck.discardToDeck();
        }
        
        return this.fightDeck.drawCards( 1 );
    }
    
    drawDangerCard(){
        let arr = []; //Tableau de cartes danger à renvoyer. Vide si fin de l'entrainement.
        
        // Si la pioche contient au moins deux cartes
        if ( this.dangerDeck.length() >= 2 ) {
            // On pioche deux cartes
            arr.push( this.dangerDeck.pickCards(2) );
        } 
        else{
            if ( this.dangerDeck.isEmpty() ){
                // Si le level est infèrieur à 3
                if ( this.level < 3 ){
                    // on monte le niveau d'un cran
                    this.level +=1;
                    // on mélange la défausse de carte danger qui devient la pioche
                    this.dangerDeck.discardToDeck();
                    // on recommence drawDangerCard();
                    this.drawDangerCard();
                }
                // Sinon arr reste vide. Cela indique la fin de la phase d'entrainement.
            }
            else{
                // On pioche une carte
                arr.push( this.dangerDeck.pickCards( 1 ) );
            }
        }
        
        return arr;
            
    }

	/**
	 * Getters and Setters
	 */
	
	// Player
	get player(){
		return this._player;
	}
	set player( newPlayer ){
		this._player = newPlayer;
	}

	// Difficulty
	get difficulty(){
		return this._difficulty;
	}
	set difficulty( newDifficulty ){
		this._difficulty = newDifficulty;
	}
    
    // FightDeck
    get fightDeck(){
        return this._fightDeck;
    }
    set fightDeck( newFightDeck ){
        this._fightDeck = newFightDeck;
    }
    
    // DangerDeck
    get dangerDeck(){
        return this._dangerDeck;
    }
    set dangerDeck( newDangerDeck ){
        this._dangerDeck = newDangerDeck;
    }
    
    // AgingDeck
    get agingDeck(){
        return this._agingDeck;
    }
    set agingDeck( newAgingDeck ){
        this._agingDeck = newAgingDeck;
    }
    
    // PirateDeck
    get pirateDeck(){
        return this._pirateDeck;
    }
    set pirateDeck( newPirateDeck ){
        this._pirateDeck = newPirateDeck;
    }
    
    // Pirates
    get pirates(){
        return this._pirates;
    }
    set pirates( newPirates ){
        this._pirates = newPirates;
    }
}

export { Game }