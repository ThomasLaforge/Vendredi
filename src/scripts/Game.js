import { Deck }       from './Deck';
import { FightDeck }  from './FightDeck';
import { Fight }  from './Fight';
import { DangerDeck } from './DangerDeck';
import { AgingDeck }  from './AgingDeck';
import { PirateDeck } from './PirateDeck';
import { UserInterface } from './UserInterface';

class Game {
	constructor( player, difficulty ){
		this._player        = player;
    this._difficulty    = difficulty;

		this._fightDeck     = new FightDeck();
		this._dangerDeck    = new DangerDeck();
		this._agingDeck     = new AgingDeck( this._difficulty );
		this._pirateDeck    = new PirateDeck();
    this._pirates       = this.pirateDeck.getPirates( 2 );

    this._level         = 1;
    this._discard       = [];

    // Bool Events
    this._fight = null;
	}

    /* start(){
        ///////////////////////////////////////////////////////////////
        ///////////                  ALGO                       ///////
        ///////////////////////////////////////////////////////////////

        /*
        condition de défaite : PV < 1
        condition de victoire : vaincre les deux pirates

        2 Phases :
            1 - Phase d'entrainement
            2 - Affrontement avec les pirates

        1 - Entrainement:
            3 niveaux qui s'enchainent
            Choisir un entrainement parmis deux
            Le réaliser

        2 - Les pirates


    }
    */

	isGameOver(){
    return this.player.isDead();
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
          arr = ( this.dangerDeck.drawCards( 2 ) );
      }
      else {
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
              arr = ( this.dangerDeck.pickCards( 1 ) );
          }
      }

      return arr;

  }

  startFight( dangerCard ){
      this.fight = new Fight( dangerCard, this.level );
  }

  addCardToFight( fightCard ){
      this.fight.addCardToFight( fightCard );
  }


  endFight(){
      let resultFight = this.fight.result();

      // If fight is lost => lose 1 PV for each fight point missing
      if ( this.fight.isLost() ) {
        this.player.addPV( resultFight );
      }

      // Reset actual fight
      this.fight = null;
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

    // Level
    get level(){
        return this._level;
    }
    set level(newLvl){
        this._level = newLvl;
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

    // UI
    get UI(){
        return this._UI;
    }
    set UI( newUI ){
        this._UI = newUI;
    }

    // actual fight
    get fight(){
        return this._fight;
    }
    set fight( newFight ){
        this._fight = newFight;
    }

}

export { Game }
