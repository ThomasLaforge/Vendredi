import { dangerCard } from './dangerCard'
import { playableCard } from './playableCard'
import { Tools } from '../modules/Tools'
import * as _ from 'lodash'

let template = `
<div class="game-fight-danger" id="zone-fight-danger">
    <div class="fight-danger-card-to-fight" id="danger-card-to-fight">
        <danger-card :danger="fight.cardToFight"></danger-card>                    
    </div>
    <div class="fight-player-interface">
        <div class="fight-danger-fight-cards">
            <playable-card v-for="(card, index) in fight.arrayFightCard" :card="card" :in-fight="!fight.finished" @usePower="useCard" :selectedToDelete="cardsToDelete.indexOf(card) != -1" @cardToDelete="addCardToDelete"></playable-card>
        </div>

        <div class="fight-result-info-and-actions">
            <div class="fight-danger-infos">
                <span id="fight-danger-temporary-result" :class="fight.getResult() >= 0 ? 'fight-danger-temporary-result-success' : 'fight-danger-temporary-result-negative'">
                    {{fight.getResult()}}
                </span>
            </div>

            <div class="fight-danger-actions">
                <button class="fight-danger-action" id="btn-pick-fight-card" @click="pickFightCard" v-if="!fight.finished">Piocher{{fight.getNumberOfCards() >= fight.cardToFight.freeCards ? ' + 1': ''}}</button>
                <button class="fight-danger-action" id="btn-stop-fight" @click="stopFight" v-if="!fight.finished">Stop</button>
                <button class="fight-danger-action" id="btn-delete-fight-cards" @click="deleteCards" v-if="fight.finished">Delete Card(s)</button>
                <button class="fight-danger-action" id="btn-dont-delete-fight-cards" @click="dontDelete" v-if="fight.finished">Keep them</button>
            </div>
        </div>

        <div class="fight-danger-fight-cards-used">
            <playable-card v-for="(card, index) in fight.arrayFightCardUsed" :card="card" :in-fight="!fight.finished"></playable-card>
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
            cardsToDelete : []
        }
    },
    methods : {
        pickFightCard(){
            console.log('draw')
            this.$emit('draw')            
        },
        stopFight(){
            console.log('stopFight')
            this.$emit('stop')
        },
        deleteCards(){
            console.log('deleteCards')
            this.$emit('fight-closed', this.cardsToDelete.slice())
        },
        dontDelete(){
            console.log('dontDelete')
            this.$emit('fight-closed', [])            
        },
        addCardToDelete(card){
            let cardExists = this.fight.getAllFightCards().indexOf(card) != -1;
            // Juste check if this card exists
            if(cardExists){
                let index = this.cardsToDelete.indexOf(card); 
                if(index == -1){
                    let costToDeleteThisOne = card.costToDelete;
                    let actualTotalCostToDelete = Tools.getTotalCostToDelete(this.cardsToDelete.slice());
                    let canAddIt = actualTotalCostToDelete + costToDeleteThisOne <= Math.abs(this.fight.getResult());
                    if(canAddIt){
                        this.cardsToDelete.push(card);
                    }
                }
                else{
                    this.cardsToDelete.splice(index,1);
                }
            }
        },
        useCard(card){
            console.log('fight : useCard', card)
            this.$emit('use-power', card)
        }
    }
}

export { gameFight }