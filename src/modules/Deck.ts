import {observable} from 'mobx'
import * as _ from 'lodash';

import {Card} from './Card';
import {Tools} from './Tools';

abstract class Deck <T> {
    //Constructor   : arrayDeck with all cards, shuffle him, and create a discard array
    //removeCard    : remove a card from the rest of the game
    //shuffle       : shuffle the arrayDeck
    //length        : give the length of the deck
    //drawCards     : return an array with the firts cards of the deck.

    protected _arrayDiscard : T[]
    protected _arrayDeck : T[]

    constructor(arrayDeck: T[] = [], arrayDiscard : T[] = []) {
        this.arrayDeck = arrayDeck
        this.arrayDiscard = arrayDiscard
        if(!arrayDeck.length && !arrayDiscard.length){
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

    get length(){
        return this.arrayDeck.length;
    }

    shuffle(){
        this.arrayDeck = _.shuffle( this.arrayDeck );
    }

    addCard(card:T | T[]){
        if(Array.isArray(card)){
            this.arrayDeck = this.arrayDeck.concat(card);        
        }
        else {
            this.arrayDeck.push(card);
        }
    }

    addCardsToTheEnd(cards: T[]){ 
        cards.forEach( card => {
            this.addCard(card)
        });
    }
    
    addCardOnTop(cards: T[]){
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
        let res:  T[] = [];
        for( let i=0; i < nbCards; i++ ){
            if(this.arrayDeck.length > 0){
                res.push( this.drawOneCard() );
            }
        }

        return res;
    }

    // Could be recursive ?
    drawOneCard(){
        let res:T = null;

        if ( !this.isEmpty() ) {
            res = this.arrayDeck[0];
            this.arrayDeck = this.arrayDeck.slice(1, this.arrayDeck.length);
            // this.arrayDeck.splice(0, 1);
        }
        else {
          throw new Error('No more cards in this deck');
        }

        return res;
    }

    discard( arrayOfCard: T[] ){
        arrayOfCard.forEach( card => {
            this.arrayDiscard.push( card )
        });
    }

    removeCard( card:T ) {
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
        console.log('index', index, this.arrayDeck, this.arrayDeck.length)
        if(index < 0 || index > this.arrayDeck.length - 1){
            throw new Error('Try to get a card at index : ' + index + ' who doesn\'t exist in deck')
        }
        return this.arrayDeck[index]
    }

    get arrayDeck(){ return this._arrayDeck }
    set arrayDeck(newArr){ this._arrayDeck = newArr }
    get arrayDiscard(){ return this._arrayDiscard }
    set arrayDiscard(newArr){ this._arrayDiscard = newArr }

}

export { Deck };
