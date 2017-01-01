import { pirateCard } from './pirateCard'
import { discard } from './discard'

let template = `
<div class="game-info">
    <div id="pirates-list">
        <div class="pirates-list-elt" v-for="pirate in game.pirates">
            <pirate-card :pirate="pirate" />
        </div>
    </div>
    <div class="info-main">
        <div class="info-main-pv info-main-elt" id="pv">
            <div class="info-main-value">{{ game.player.PV >= -1 ? game.player.PV : -1 }}</div>
        </div>
        <div class="info-main-fight-cards info-main-elt">
            <div id="nbFightCards" class="info-main-value">{{ game.fightDeck.length() }}</div>
            <div class="info-main-subject">Fight cards</div>
            <button @click="switchDiscardPlayable">Discard</button>
        </div>
        <div class="info-main-danger-cards info-main-elt">
            <div id="nbDangerCards" class='info-main-value'>{{ game.dangerDeck.length() }}</div>
            <div class="info-main-subject">Danger cards</div>
            <button @click="switchDiscardDanger">Discard</button>            
        </div>
        <div class="info-main-aging-cards info-main-elt">
            <div id="nbAgingCards" class="info-main-value">{{ game.agingDeck.length() }}</div>
            <div class="info-main-subject">Aging cards</div>
        </div>
        <div class="info-main-level info-main-elt">
            <div id="level" class="info-main-value" :class="game.level < 3 ? 'level-value-' + (game.level + 1) : 'level-value-pirates'">{{ game.level < 3 ? game.level + 1 : 'pirates' }}</div>
            <div class="info-main-subject">Level</div>
        </div>
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
</div>
`

const gameInfo = {
    props : ['game'],
    template : template,
    data: () => {
        return {
            discardDangerOpen : false,
            discardPlayableOpen : false,
        }
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
        },
        switchDiscardDanger(){
            console.log('switch discard danger') 
            this.discardDangerOpen = !this.discardDangerOpen
            this.discardPlayableOpen = false
        },
    }
};

export { gameInfo }