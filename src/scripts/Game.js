import { Deck }       from './Deck';
import { FightDeck }  from './FightDeck';
import { Fight }  from './Fight';
import { FightCard }  from './FightCard';
import { DangerDeck } from './DangerDeck';
import { DangerCard } from './DangerCard';
import { AgingDeck }  from './AgingDeck';
import { PirateDeck } from './PirateDeck';
import { UserInterface } from './UserInterface';

class Game {
	constructor( player, difficulty ){
        this.player        = player;
        this.difficulty    = difficulty;

        // Si la difficulté est de 4 alors la partie commence avec 18 PV au lieu de 20 => on perd 2 PV
        if(this.difficulty === 4){
            this.player.losePV(2);
        }

        this.fightDeck     = new FightDeck();
        this.dangerDeck    = new DangerDeck();
        this.agingDeck     = new AgingDeck( this.difficulty );
        if(this.difficulty > 1){
            this.fightDeck.addCard(this.agingDeck.drawCards(1));
        }

        this.pirateDeck    = new PirateDeck();
        this.pirates       = this.pirateDeck.getPirates( 2 );

        this.level         = 3;
        this.arrayDiscard  = [];

        // Bool Events
        this.fight         = null;
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

      return this.fightDeck.drawOneCard();
  }

  drawDangerCard(){
    let arr = []; //Tableau de cartes danger à renvoyer. Vide si fin de l'entrainement.

		if(this.level < 4){
			// On pioche deux cartes
			arr = ( this.dangerDeck.drawCards( 2 ) );
			if ( this.dangerDeck.isEmpty() ){
					// on monte le niveau d'un cran
					this.level++;
					// on mélange la défausse de carte danger qui devient la pioche
					this.dangerDeck.discardToDeck();
			}
		}

    return arr;
  }

  startFight( dangerCard ){
      this.fight = new Fight( dangerCard, this.level );
      this.addCardToFight();
  }

  addCardToFight(){
      let fightCard = this.drawFightCard();
      this.fight.addFightCard( fightCard );
  }

  endFightWon(){
      this.fight.arrayFightCard.push( this.fight.dangerCard );
      let arrayOfCardsToDiscard = this.fight.arrayFightCard.slice();
      this.fightDeck.addToDiscard( arrayOfCardsToDiscard );

      this.resetFight();
  }

  endFightLost( cardsToDelete ){
      // Delete cards from game
      cardsToDelete.forEach( card => {
          this.discard( card );
          //remove this card from fight.arrayFightCard
          //this.fight.arrayFightCard
      });

      // put back cards of fight in differents decks
      // danger card
      this.dangerDeck.discard( [this.fight.dangerCard] );
      // fight cards
      this.fightDeck.discard( this.fight.arrayFightCard );

      this.resetFight();
  }

  resetFight(){
      this.fight = null;
  }

  discard( arrayOfCards ){
      this.arrayDiscard.push( arrayOfCards );
  }

  usePower( selectedCard ) {

      let card;
      let isFightCard   = selectedCard instanceof FightCard;
      let isDangerCard  = selectedCard instanceof DangerCard;

      //Cast selectCard in fightCard
      if ( isDangerCard ) {
          card = selectedCard.fightCard;
      }
      else if ( isFightCard ) {
          card = selectedCard;
      }
      else{
          return false;
      }

      if ( card.power ) {
        switch( card.power ) {
          case '+2PV':
            this.player.addPV( 2 );
            break;
          case '+1PV':
            this.player.addPV( 1 );
            break;
          case '-1PV':
            this.player.losePV( 1 );
            break;
          case '-2PV':
            this.player.losePV( 2 );
            break;
          default:
            console.log("use power not coded for the moment");
        }
      }
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

    // Discard
    get arrayDiscard(){
        return this._arrayDiscard;
    }
    set arrayDiscard( newDiscard ){
        this._arrayDiscard = newDiscard;
    }

}

export { Game }
