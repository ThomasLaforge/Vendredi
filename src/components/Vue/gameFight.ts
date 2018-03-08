import { dangerCard } from './dangerCard'
import { pirateCard } from './pirateCard'
import { playableCard } from './playableCard'
import { twoStepPowers } from './twoStepPowers'
import { Tools } from '../modules/Tools'
import { PlayableCard } from '../modules/PlayableCard'
import { DangerCard } from '../modules/DangerCard'
import { PirateCard } from '../modules/PirateCard'
import { FightCard } from '../modules/FightCard'
import { AgingCard } from '../modules/AgingCard'
import { PlayableCardPowerType, AgingCardPower, FightCardPower } from '../modules/Vendredi'
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
                <md-button 
                    class="md-primary md-dense md-raised fight-danger-action" id="btn-pick-fight-card" 
                    @click.native="pickFightCard" 
                    v-if="( !fight.finished && !forcedToStop )"
                >
                    Piocher ( {{this.fight.freeCards > 0 ? this.fight.freeCards : this.fight.costOfCardsNotFree + ' PV'}} )
                </md-button>
                
                <md-button 
                    class="md-primary md-dense md-raised fight-danger-action" id="btn-stop-fight" 
                    @click.native="stopFight" 
                    v-if="(!fight.finished)"
                >
                    Stop
                </md-button>
                
                <md-button 
                    class="md-primary md-dense md-raised fight-danger-action" id="btn-delete-fight-cards" 
                    @click.native="deleteCards" 
                    v-if="fight.finished"
                >
                    Delete Card(s)
                </md-button>
                
                <md-button 
                    class="md-primary md-dense md-raised fight-danger-action" id="btn-dont-delete-fight-cards" 
                    @click.native="dontDelete" 
                    v-if="fight.finished"
                >
                    Keep all
                </md-button>
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
        :cards="twoStepCards" 
        :used-card="twoStepCard" 
        @keyup.esc="switchTwoStepView" 
        @switchShow="switchTwoStepView"
        @useTwoStepPower="handleUseTwoStepPower"
    />
</div>
`

const gameFight = {
    props : ['fight', 'nextThreeCards'],
    template : template,
    components : {
        dangerCard,
        pirateCard,
        playableCard,
        twoStepPowers,
    },
    data : function() : { cardsToDelete : Array<PlayableCard>, twoStepPowerSelectionOpen : boolean, twoStepCard : PlayableCard, twoStepCards : Array<PlayableCard> } {
        return {
            cardsToDelete : [],
            twoStepPowerSelectionOpen : false,
            twoStepCard : null,
            twoStepCards : []
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
        },
        forcedToStop : function(){ return this.fight.hasStopCard() },
    },
    created: function () {
        window.addEventListener('keyup', this.handleKeyboardEvent)
    },
    beforeDestroy: function () {
        window.removeEventListener('keyup', this.handleKeyboardEvent);
    },
    methods : {
        handleKeyboardEvent(e:KeyboardEvent){
            if(e.keyCode){
                if(e.keyCode === 13){
                    this.pickFightCard();
                }
                if(e.keyCode === 32){
                    this.stopFight();
                }
            }
        },
        pickFightCard(){
            this.$emit('draw')            
        },
        stopFight(){
            this.$emit('stop')
        },
        deleteCards(){
            if(this.cardsToDelete.length > 0) {
                this.$emit('fight-closed', this.cardsToDelete.slice())
            }
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
                    if(this.fight.arrayFightCard.indexOf(card) !== -1){
                        this.useCard(card)
                    }
                }
            }
        },
        addCardToDelete(card:PlayableCard){
            let cardExists = this.fight.getAllCards().indexOf(card) != -1;
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
                this.refreshTwoStepCards();            
                this.twoStepPowerSelectionOpen = true
            }
            else{
                this.$emit('use-power', card)
            }
        },
        switchTwoStepView(){
            this.twoStepPowerSelectionOpen = !this.twoStepPowerSelectionOpen
        },
        handleUseTwoStepPower(data:{}){
            console.log(data ? data : 'no data');
            this.$emit('use-two-step-power', data);
            this.twoStepPowerSelectionOpen = false
        },
        refreshTwoStepCards : function(){ 
            let cardToChose:Array<any> = [];
            if(this.twoStepCard) {
                if(this.twoStepCard.power === FightCardPower.SORT_THREE_CARDS){
                    cardToChose = this.nextThreeCards
                    console.log('cardToChose', cardToChose, this.nextThreeCards)
                }
                else{
                    cardToChose = this.fight.getAllCards()
                }
            }
            this.twoStepCards = cardToChose;
        }
    }
}

export { gameFight }