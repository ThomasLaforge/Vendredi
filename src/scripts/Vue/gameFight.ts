import { dangerCard } from './dangerCard'
import { playableCard } from './playableCard' 

let template = `
<div class="game-fight-danger" id="zone-fight-danger">
    <div class="fight-danger-card-to-fight" id="danger-card-to-fight">
        <danger-card :danger="cardToFight"></danger-card>                    
    </div>
    <div class="fight-player-interface">
        <div class="fight-danger-fight-cards">
            <playable-card v-for="(card, index) in fightCardPlayed" :card="card"></playable-card>
        </div>

        <div class="fight-result-info-and-actions">
            <div class="fight-danger-infos">
                <span id="fight-danger-temporary-result" :class="fight.getResult() >= 0 ? 'fight-danger-temporary-result-success' : 'fight-danger-temporary-result-negative'">
                    {{fight.getResult()}}
                </span>
            </div>

            <div class="fight-danger-actions">
                <button class="fight-danger-action" id="btn-pick-fight-card" @click="pickFightCard" v-if="!finished">Piocher</button>
                <button class="fight-danger-action" id="btn-stop-fight" @click="stopFight" v-if="!finished">Stop</button>
                <button class="fight-danger-action" id="btn-delete-fight-cards" @click="deleteCards" v-if="finished">Delete Card(s)</button>
                <button class="fight-danger-action" id="btn-dont-delete-fight-cards" @click="dontDelete" v-if="finished">Keep them</button>
            </div>
        </div>

        <div class="fight-danger-fight-cards-used">
            <playable-card v-for="(card, index) in fightCardPlayedAndUsed" :card="card"></playable-card>
        </div>
    </div>
</div>
`

const gameFight = {
    props : ['fight'],
    template : template,
    components : {
        dangerCard,
        playableCard
    },
    data : function(){
        return {
            cardToFight : this.fight.cardToFight,
            fightCardPlayed : this.fight.arrayFightCard,
            fightCardPlayedAndUsed : this.fight.arrayFightCardUsed,
            finished : this.fight.finished
        }
    },
    methods : {
        pickFightCard(){
            console.log('draw')
            this.$emit('draw')            
        },
        stopFight(){
            console.log('stopFight')
            if(this.fight.isWon()){
                this.$emit('fightClosed')
            }
            else{
                this.$emit('stopFight')
            }
        },
        deleteCards(){
            console.log('deleteCards')
            this.$emit('fightClosed')
        },
        dontDelete(){
            console.log('dontDelete')
            this.$emit('fightClosed')            
        },
    }
}

export { gameFight }