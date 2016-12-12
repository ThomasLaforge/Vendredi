import { playableCard } from './playableCard'

let template = `
<div>
    <div>La carte utilisées</div>
    <playable-card :card="usedCard" />
    <div>Les cartes</div>
    <playable-card v-for="card in cards" :card="card" @selected="assignCard" />
    <div>Les actions/validation</div>
    <button @click="validate">Valider</button>
    <button @click="cancel">Annuler</button>
</div>
`

const twoStepPowers = {
    template : template,
    props : ['cards', 'usedCard'],
    components : {
        playableCard,
    },
    data : function(){
        return {
            cardsAssigned : []
        }
    },
    methods : {
        validate : function(){
            console.log('validation...')
            this.$emit('close-two-step-powers', 'nothing, for the moment')
        },
        cancel : function(){
            console.log('annulation...')
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