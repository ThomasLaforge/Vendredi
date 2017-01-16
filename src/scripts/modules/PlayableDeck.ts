import {Deck} from './Deck'
import {PlayableCard} from './PlayableCard'
import {AgingCard} from './AgingCard'
import {FightCard} from './FightCard'
import * as _ from 'lodash'

abstract class PlayableDeck extends Deck {

    discard( arrayOfCard: Array<PlayableCard> ){
        arrayOfCard.forEach( card => {
            this.arrayDiscard.push( card.initialState )
        });
    }

}

export { PlayableDeck }