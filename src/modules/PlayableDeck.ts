import {Deck} from './Deck'
import {PlayableCard} from './PlayableCard'
import {AgingCard} from './AgingCard'
import {FightCard} from './FightCard'
import * as _ from 'lodash'

abstract class PlayableDeck extends Deck <PlayableCard> {

    discard( arrayOfCard: PlayableCard[] ){
        arrayOfCard.forEach( card => {
            this.arrayDiscard.push( card.restore() )
        });
    }

}

export { PlayableDeck }