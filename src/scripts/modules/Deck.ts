import {Card} from './Card';
import {Tools} from './Tools';
import * as _ from 'lodash';

abstract class Deck {
    //Constructor   : arrayDeck with all cards, shuffle him, and create a discard array
    //removeCard    : remove a card from the rest of the game
    //shuffle       : shuffle the arrayDeck
    //length        : give the length of the deck
    //drawCards     : return an array with the firts cards of the deck.

    constructor(protected arrayDeck : Array<any> = null, protected arrayDiscard : Array<any> = null) {
        if(!arrayDeck && !arrayDiscard){
            this.arrayDeck = []
            this.arrayDiscard = []
            this.initDeck();
            this.shuffle();
        }
    }

    abstract initDeck():void

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
        this.arrayDeck = _.shuffle( this.arrayDeck );
    }

    addCard(card:any){
        this.arrayDeck.push(card);
    }

    addCardsToTheEnd(cards:Array<any>){ 
        cards.forEach( card => {
            this.addCard(card)
        });
    }
    
    addCardOnTop(cards:Array<any>){
        cards.forEach( card => {    
            this.arrayDeck.unshift(card)
        });
    }

    discardToDeck(){
        // ajout de la défausse dans la pioche
        this.arrayDeck = this.arrayDiscard.concat(this.arrayDeck);
        // Remise à zéro de la défausse
        this.arrayDiscard = [];
        // On mélange le nouveau deck
        this.shuffle();
    }

    // Missing control if empty
    drawCards( nbCards:number ){
        let res: Array<any> = [];
        for( let i=0; i < nbCards; i++ ){
            if(this.arrayDeck.length > 0){
                res.push( this.drawOneCard() );
            }
        }

        return res;
    }

    // Could be recursive ?
    drawOneCard(){
        let res:any = null;

        if ( !this.isEmpty() ) {
            res = this.arrayDeck[0];
            this.arrayDeck.splice( 0, 1 );
        }
        else {
          throw new Error('No more cards in this deck');
        }

        return res;
    }

    discard( arrayOfCard: Array<any> ){
        arrayOfCard.forEach( card => {
            this.arrayDiscard.push( card )
        });
    }

    removeCard( card:any ) {
        let pos = this.arrayDeck.indexOf( card );
        if(pos > -1){
            this.arrayDeck.splice(pos, 1);
        }
        else{
            console.log('Tentative de suppression d\'une carte qui n\'est pas présente dans la main');
        }
    }

    getAllCards(){
        return this.arrayDeck.concat(this.arrayDiscard);
    }

    getNumberOfCardsInDiscard(){
        return this.arrayDiscard.length;
    }

    getCopyOfCard(index: number){
        if(index < 0 || index > this.arrayDeck.length - 1){
            throw new Error('Try to get a card at index : ' + index + ' who doesn\'t exist in deck')
        }
        return this.arrayDeck[index]
    }

}

export { Deck };
