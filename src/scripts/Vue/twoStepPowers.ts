import { playableCard } from './playableCard'
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
            @selected="assignCard" 
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
    data : function(){
        return {
            cardsAssigned : []
        }
    },
    methods : {
        close : function(){
            console.log('close on two step powers')
            this.$emit('switch-show');
        },
        validate : function(){
            console.log('validation...')
            this.close();
            this.$emit('close-two-step-powers', 'nothing, for the moment')
        },
        cancel : function(){
            console.log('annulation...')
            this.close();            
            this.$emit('close-two-step-powers')            
        },
        assignCard : function(card){
            console.log('twoStepPowers : assign card', card)
            let indexOfThisCard = this.cardsAssigned.indexOf(card)
            if( indexOfThisCard === -1 ){
                this.cardsAssigned.push(card);
            }
            else {
                this.cardsAssigned.splice(indexOfThisCard, 1);
            }
        }
    }
}

export { twoStepPowers }