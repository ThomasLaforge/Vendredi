import {Card} from './Card';
import {Tools} from './Tools';

class Deck {
    //Constructor   : arrayDeck with all cards, shuffle him, and create a discard array
    //removeCard    : remove a card from the rest of the game
    //shuffle       : shuffle the arrayDeck
    //length        : give the length of the deck
    //drawCards     : return an array with the firts cards of the deck.

    constructor() {
        this._arrayDeck = [];
        this._arrayDiscard = [];
        this.initDeck();
        this.shuffle();
    }

    initDeck(){

    }

    // States of arrays : deck and discard

    isEmpty(){
        return this.arrayDeck.length <= 0;
    }

    isDiscardEmpty(){
        return this.arrayDiscard.length <= 0;
    }

    isFull(){
        return this.isDiscardEmpty();
    }

    length(){
        return this.arrayDeck.length;
    }

    removeCard(card) {
        var pos = this._arrayDeck.indexOf(Card);
        if(pos > -1){
          this.arrayDeck.splice(pos, 1);
        }
        else{
          console.log('Tentative de suppression d\'une carte qui n\'est pas présente dans la main');
        }
    }

    shuffle(){
        Tools.shuffle( this.arrayDeck );
    }

    discardToDeck(){
        // ajout de la défausse dans la pioche
        this.arrayDeck.concat( this.arrayDiscard );
        // Remise à zéro de la défausse
        this.discard( new Array() );
        // On mélange le nouveau deck
        this.shuffle();
    }

    addToDiscard( arrOfCards ){
        this.discard( arrOfCards );
    }

    // Missing control if empty
    drawCards( nbCards ){
        var res = [];
        for( var i=0; i < nbCards; i++ ){
            res.push( this.drawOneCard() );
        }

        return res;
    }

    // Missing control if empty
    drawOneCard(){
        let res;

        if ( this.length() >= 1 ) {
            res = this.arrayDeck[0];
            this.arrayDeck.splice( 0, 1 );
        }
        else {
            this.discardToDeck();
            // on recommence drawDangerCard();
            res = this.drawOneCard();
        }

        return res;
    }

    discard( arrayOfCard ){
        arrayOfCard.forEach( card =>
            this.arrayDiscard.push( card )
        );
    }

    /**
	 * Getters and Setters
	 */

	// Deck

	get arrayDeck(){
		return this._arrayDeck;
	}
	set deck(newDeck){
		this._arrayDeck = newDeck;
	}

    // Discard

	get arrayDiscard(){
		return this._arrayDiscard;
	}
	set arrayDiscard(newDiscard){
		this._arrayDiscard = newDiscard;
	}

}

export { Deck };
