import { playableCard } from './playableCard'
import { sortThreeCards } from './components/sortThreeCards'
import { modal } from './components/modal'
import { FightCardPower } from '../modules/Vendredi'
import { PlayableCard } from '../modules/PlayableCard'

let template = `
<div>
    <modal 
        :show.sync="show" 
        :on-close="close" 
    >
        <div>La carte utilisée</div>
        <playable-card 
            v-if="usedCard" 
            :card="usedCard" 
        />
        
        <div>Les cartes</div>

        <div v-if="isSortThreeCards">
            <sort-three-cards :cardList="cards"></sort-three-cards>
        </div>

        <div v-if="!isSortThreeCards">
            <playable-card v-for="card in cards" 
                v-if="card != usedCard" 
                :card="card"
                :selectedToTwoStepPowers="assignedCards.indexOf(card) !== -1"
                @select="assignCard(card)"
            />
        </div>

        <div>Les actions/validation</div>
        <button @click="validate">Valider</button>
        <button v-if="!isSortThreeCards" @click="cancel">Annuler</button>
    </modal>
</div>
`

const twoStepPowers = {
    template : template,
    props : ['cards', 'usedCard', 'show'],
    components : {
        playableCard,
        modal,
        sortThreeCards
    },
    data : function(): { assignedCards:Array<PlayableCard>} {
        return {
            assignedCards : []
        }
    },
    computed : {
        isSortThreeCards : function(){ return this.usedCard && this.usedCard.power === FightCardPower.SORT_THREE_CARDS }
    },
    methods : {
        close : function(){
            // Can't close modal if power of used card is sort three cards. 
            // Anti cheat: loop see three next cards and close, etc...
            if(!this.isSortThreeCards){
                this.assignedCards = [];
                this.$emit('switchShow');
            }
        },
        validate : function(){
            console.log('validation...')
            let data = {
                usedCard : this.usedCard,
                assignedCards : this.assignedCards
            };
            this.close();
            this.$emit('useTwoStepPower', data)
        },
        cancel : function(){
            console.log('annulation...')
            this.close(); 
            // this.$emit('close-two-step-powers')            
        },
        assignCard : function(card:PlayableCard){
            console.log('twoStepPowers : assign card', card)
            let indexOfThisCard = this.assignedCards.indexOf(card)
            let nbCardAssignable = this.usedCard.getNumberOfCardAssignable()
            if( indexOfThisCard === -1){
                if(nbCardAssignable === 1){
                    this.assignedCards = []
                }
                if(nbCardAssignable - this.assignedCards.length > 0){
                    this.assignedCards.push(card);
                }
            }
            else {
                this.assignedCards.splice(indexOfThisCard, 1);
            }
        }
    }
}

export { twoStepPowers }