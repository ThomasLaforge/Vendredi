import { playableCard } from './playableCard'
import { PlayableCard } from '../modules/PlayableCard'
import { modal } from './components/modal'

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
        <playable-card v-for="card in cards" 
            v-if="card != usedCard" 
            :card="card"
            :selectedToTwoStepPowers="assignedCards.indexOf(card) !== -1"
            @select="assignCard(card)"
        />

        <div>Les actions/validation</div>
        <button @click="validate">Valider</button>
        <button @click="cancel">Annuler</button>
    </modal>
</div>
`

const twoStepPowers = {
    template : template,
    props : ['cards', 'usedCard', 'show'],
    components : {
        playableCard,
        modal
    },
    data : function(): { assignedCards:Array<PlayableCard>} {
        return {
            assignedCards : []
        }
    },
    methods : {
        close : function(){
            this.assignedCards = [];
            this.$emit('switchShow');
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