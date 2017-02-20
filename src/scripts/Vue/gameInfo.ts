import { pirateCard } from './pirateCard'
import { PirateCard } from '../modules/PirateCard'
import { discard } from './discard'

let template = `
<md-layout md-gutter class="game-info">
    <!-- <div id="pirates-list">
        <div class="pirates-list-elt" v-for="pirate in pirateList">
            <pirate-card :pirate="pirate" />
            <div v-if="(game.fight && game.fight.cardToFight === pirate)">En cours</div>
        </div>
    </div> -->

    <div class="info-main-content">
    
        <div class="info-main-fight-cards info-main-elt">
            <div id="nbFightCards" class="info-main-value" @click="switchDiscardPlayable" title="Fight cards">{{ game.fightDeck.length() }}</div>
        </div>
        
        <div class="info-main-danger-cards info-main-elt">
            <div id="nbDangerCards" class='info-main-value' @click="switchDiscardDanger" title="Danger cards">{{ game.dangerDeck.length() }}</div>
        </div>
        
        <div class="info-main-aging-cards info-main-elt">
            <div id="nbAgingCards" title="Aging cards" class="info-main-value">{{ game.agingDeck.length() }}</div>
        </div>
        
        <md-button class="md-raised md-primary info-main-elt" @click.native="switchDiscardGlobal">Discard</md-button>
    </div>

    <discard 
        :cards="game.fightDeck.arrayDiscard" 
        :show="discardPlayableOpen" 
        :type="'playable'" 
        @switchShowDiscard="switchDiscardPlayable"
    />
    <discard 
        :cards="game.dangerDeck.arrayDiscard" 
        :show="discardDangerOpen" 
        :type="'danger'" 
        @switchShowDiscard="switchDiscardDanger"
    />

    <discard
        :cards="game.arrayOfRemovedCards"
        :show="discardGlobalOpen"
        :type="'playable'"
        @switchShowDiscard="switchDiscardGlobal"
    />
</md-layout>
`

const gameInfo = {
    props : ['game'],
    template : template,
    data: function(){
        return {
            discardDangerOpen : false,
            discardPlayableOpen : false,
            discardGlobalOpen : false,
        }
    },
    computed : {
        pirateList : function(){ return this.game.getListOfPirateToFight() }
    },
    components : {
        pirateCard,
        discard
    },
    methods: {
        switchDiscardPlayable(){
            console.log('switch discard playable')
            this.discardPlayableOpen = !this.discardPlayableOpen            
            this.discardDangerOpen = false            
            this.discardGlobalOpen = false            
        },
        switchDiscardDanger(){
            console.log('switch discard danger') 
            this.discardDangerOpen = !this.discardDangerOpen
            this.discardPlayableOpen = false
            this.discardGlobalOpen = false
        },
        switchDiscardGlobal(){
            console.log('switch discard global')             
            this.discardGlobalOpen = !this.discardGlobalOpen;
            this.discardPlayableOpen = false
            this.discardDangerOpen = false
        }
    }
};

export { gameInfo }