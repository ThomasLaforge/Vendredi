import {Deck} from './Deck'
import {PlayableCard} from './PlayableCard'

abstract class PlayableDeck extends Deck {

    discard( arrayOfCard: Array<PlayableCard> ){
        arrayOfCard.forEach( card =>
            this.arrayDiscard.push( card.initialState )
        );
    }

}

export { PlayableDeck }