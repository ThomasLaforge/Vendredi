import { dangerCard } from './dangerCard'
import { pirateCard } from './pirateCard'
import { playableCard } from './playableCard'
import { twoStepPowers } from './twoStepPowers'
import { Tools } from '../modules/Tools'
import { PlayableCard } from '../modules/PlayableCard'
import { DangerCard } from '../modules/DangerCard'
import { PirateCard } from '../modules/PirateCard'
import { FightCard } from '../modules/FightCard'
import { PlayableCardPowerType } from '../modules/Vendredi'
import * as _ from 'lodash'

let template = `
<div class="game-fight" id="zone-fight">
    <div class="fight-danger-card-to-fight" id="danger-card-to-fight">
        <danger-card v-if="isDangerFight" :danger="fight.cardToFight" />
        <pirate-card v-if="isPirateFight" :pirate="fight.cardToFight" />
    </div>

    <div class="fight-player-interface">
        <div class="fight-danger-fight-cards">
            <playable-card v-for="(card, index) in fight.arrayFightCard" 
                :card="card" 
                :in-fight="!fight.finished" 
                :selectedToDelete="cardsToDelete.indexOf(card) != -1" 
                @select="playableCardClicked"
            />
        </div>

        <div class="fight-result-info-and-actions">
            <div class="fight-danger-infos">
                <span v-if="!fight.finished" id="fight-danger-temporary-result" :class="fight.getResult() >= 0 ? 'fight-danger-temporary-result-success' : 'fight-danger-temporary-result-negative'">
                    {{ fight.getResult() }}
                </span>
                <span v-if="fight.finished">
                    {{ nbCardsRemovable }}
                </span>
            </div>

            <div class="fight-danger-actions">
                <button 
                    class="fight-danger-action" id="btn-pick-fight-card" 
                    @click="pickFightCard" 
                    v-if="( !fight.finished && !fight.forcedToStop )"
                >
                    Piocher ( {{this.fight.freeCards > 0 ? 'encore ' + this.fight.freeCards : 'contre ' + this.fight.costOfCardsNotFree + ' PV'}} )
                </button>
                
                <button 
                    class="fight-danger-action" id="btn-stop-fight" 
                    @click="stopFight" 
                    v-if="!fight.finished"
                >
                    Stop
                </button>
                
                <button 
                    class="fight-danger-action" id="btn-delete-fight-cards" 
                    @click="deleteCards" 
                    :disabled="(fight.finished && cardsToDelete.length === 0)"
                >
                    Delete Card(s)
                </button>
                
                <button 
                    class="fight-danger-action" id="btn-dont-delete-fight-cards" 
                    @click="dontDelete" 
                    v-if="fight.finished"
                >
                    Keep all
                </button>
            </div>
        </div>

        <div class="fight-danger-fight-cards-used">
            <playable-card v-for="(card, index) in fight.arrayFightCardUsed" 
                :card="card" 
                :in-fight="!fight.finished" 
                :selectedToDelete="cardsToDelete.indexOf(card) != -1" 
                @select="playableCardClicked" 
            />
        </div>
    </div>

    <two-step-powers 
        :show="twoStepPowerSelectionOpen" 
        :cards="fight.getAllFightCards()" 
        :used-card="twoStepCard" 
        @keyup.esc="switchTwoStepView" 
        @switch-show="switchTwoStepView"
    />
</div>
`

const gameFight = {
    props : ['fight'],
    template : template,
    components : {
        dangerCard,
        pirateCard,
        playableCard,
        twoStepPowers,
    },
    data : function() : { cardsToDelete : Array<PlayableCard>, twoStepPowerSelectionOpen : boolean, twoStepCard : PlayableCard } {
        return {
            cardsToDelete : [],
            twoStepPowerSelectionOpen : false,
            twoStepCard : null
        }
    },
    computed : {
        isPirateFight : function(){ return this.fight.cardToFight instanceof PirateCard },
        isDangerFight : function(){ return this.fight.cardToFight instanceof DangerCard },
        nbCardsRemovable : function() { 
            let result: number = this.fight.getResult();
            let sum: number = 0;
            this.cardsToDelete.forEach( (c: PlayableCard) => { sum += c.costToDelete } ) 
            return Math.abs(result) - sum;
        }
    },
    methods : {
        pickFightCard(){
            this.$emit('draw')            
        },
        stopFight(){
            console.log("gameFight: stopFight")
            this.$emit('stop')
        },
        deleteCards(){
            this.$emit('fight-closed', this.cardsToDelete.slice())
        },
        dontDelete(){
            this.$emit('fight-closed', [])            
        },
        playableCardClicked(card:PlayableCard){
            if(this.fight.finished){
                this.addCardToDelete(card)
            }
            else{
                if(card.power){
                    this.useCard(card)
                }
            }
        },
        addCardToDelete(card:PlayableCard){
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
                    this.cardsToDelete.splice(index, 1);
                }
            }
        },
        useCard(card:FightCard){
            console.log('gameFight: use card',card, PlayableCardPowerType[Tools.getTypeOfPower(card)])
            if(Tools.getTypeOfPower(card) === PlayableCardPowerType.TWO_STEP){
                this.twoStepCard = card 
                this.twoStepPowerSelectionOpen = true
            }
            else{
                this.$emit('use-power', card)
            }
        },
        switchTwoStepView(){
            this.twoStepPowerSelectionOpen = !this.twoStepPowerSelectionOpen
        },
        closeTwoStepPowers(data:{}){
            console.log(data ? data : 'no data');
            this.twoStepPowerSelectionOpen = false
        }
    }
}

export { gameFight }