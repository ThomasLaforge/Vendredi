import {Card} from './Card';

class Deck {
    //Constructor   : arrayDeck with all cards, shuffle him, and create a discard array
    //removeCard    : remove a card from the rest of the game
    //shuffle       : shuffle an in deck
    //shuffleDeck   : shuffle the arrayDeck
    //length        : give the length of the deck
    //pickCards     : return an array with the firts cards of the deck. 
    
    constructor() {
        var array = [];
        /*$.each(cities, function(){
            array.push(new Card(this.name));
        });*/
        array = [new Card(2),new Card(3),new Card(1),new Card(4),new Card(2)];
        this.arrayDeck = array;
        this.shuffleDeck();
        this.arrayDiscard = [];
    }
    
    removeCard(card) {
        var pos = this.arrayDeck.indexOf(Card);
		if(pos > -1){
			this.arrayDeck.splice(pos, 1);
		}
		else{
			console.log('Tentative de suppression d\'une carte qui n\'est pas présente dans la main');
		}
    }
    
    shuffleDeck(){
        Deck.shuffle(this.arrayDeck);
    }
    
    static shuffle(array){
        var currentIndex = array.length, temporaryValue, randomIndex ;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }
    }
    
    length(){
        return this.arrayDeck.length;
    }
    
    pickCards(nbCards){
        var res = [];
        for(var i=0;i<nbCards;i++){
            res.push(this.arrayDeck[0]);
            this.arrayDeck.splice(0,1);
        }
        return res;
    }
    
    discard(arrayOfCard){
        $.each(arrayOfCard, function(){
            this.discard.push(this); 
        });
    }
    
}
 
export { Deck };