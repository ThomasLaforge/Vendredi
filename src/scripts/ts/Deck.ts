import {Card} from './Card';
import {Tools} from './Tools';

class Deck {
    //Constructor   : arrayDeck with all cards, shuffle him, and create a discard array
    //removeCard    : remove a card from the rest of the game
    //shuffle       : shuffle the arrayDeck
    //length        : give the length of the deck
    //drawCards     : return an array with the firts cards of the deck.

    protected arrayDeck : Array<Card>;
    protected arrayDiscard : Array<Card>;

    constructor() {
        this.arrayDeck = [];
        this.arrayDiscard = [];
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

    shuffle(){
        Tools.shuffle( this.arrayDeck );
    }

    addCard(card){
        this.arrayDeck.push(card);
        this.shuffle();
    }

    discardToDeck(){
        // ajout de la défausse dans la pioche
        this.arrayDeck = this.arrayDiscard;
        // Remise à zéro de la défausse
        this.arrayDiscard = [];
        // On mélange le nouveau deck
        this.shuffle();
    }

    // Missing control if empty
    drawCards( nbCards ){
        var res = [];
        for( var i=0; i < nbCards; i++ ){
            if(this.arrayDeck.length > 0){
                res.push( this.drawOneCard() );
            }
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
            if ( this.length() >= 1 ) {
                res = this.arrayDeck[ 0 ];
                this.arrayDeck.splice( 0, 1 );
            }
            else{
                res = false;
            }
        }

        return res;
    }

    discard( arrayOfCard ){
        arrayOfCard.forEach( card =>
            this.arrayDiscard.push( card )
        );
    }

    addToDiscard( arrOfCards ){
        this.discard( arrOfCards );
    }

    removeCard( card ) {
        let pos = this.arrayDeck.indexOf( card );
        if(pos > -1){
            this.arrayDeck.splice(pos, 1);
        }
        else{
            console.log('Tentative de suppression d\'une carte qui n\'est pas présente dans la main');
        }
    }

}

export { Deck };
