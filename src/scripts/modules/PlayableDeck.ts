import {Deck} from './Deck'
import {PlayableCard} from './PlayableCard'
import * as _ from 'lodash'

abstract class PlayableDeck extends Deck {

    discard( arrayOfCard: Array<PlayableCard> ){
        arrayOfCard.forEach( card => {
            card.initialState.initialState = _.clone(card)
            this.arrayDiscard.push( card.initialState )
        });
    }

}

export { PlayableDeck }