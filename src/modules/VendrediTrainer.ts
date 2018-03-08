import { Game } from './Game'
import brain from 'brain.js'

class VendrediTrainer {

    getFitnessScore(game: Game){
        let score = 0

        // Add pv
        score += game.robinson.PV
        // Add deck score
        // - turn played
        // - mean of deck
        // - median of deck
        // - actual deck drawable
        // - standard deviation of Deck
        // - draw capability or replacement (mean of possible cards to draw)
        // NB: give score to each cards from value + power equivalence
        score += game.getDeckScore()
        // Game score
        // - level
        // - nbAgingCards

        return score
    }

    generateAction(){
        // turn :
        //  - Phase 1 : select a card (two choices) => deep learning = on fait confiance à Thomas :)
        //  - Phase 2 : resolve card
        //         - draw cards (auto)
        //         - draw another card?
        //         - use powers (algo)
        //         - delete cards (algo) => autoDeleteCards() => delete big cards first, then cards with 0 and no powers, then cards with smallest powers
    }

    choseCard(){
    }

}



export interface ChoseCardTrainData {
}

export interface ChoseCardTrainDataSet extends Array<ChoseCardTrainData> {}

class ChoseCardTrainer {

    private net: any;

    constructor(trainDataSet: ChoseCardTrainDataSet){
        console.log('starting training', trainDataSet)
        this.net = brain.NeuralNetwork()
        this.net.train(trainDataSet)
    }

    getFunction(){
        return this.net.toFunction()

        // console.log('this.net.toFunction()')
    }

}