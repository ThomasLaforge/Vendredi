import { playableCard } from './playableCard'

let template = `
<div>
    <div>La carte utilisées</div>
    <playable-card :card="usedCard" />
    <div>Les cartes</div>
    <playable-card v-for="card in cards" :card="card" />
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
        },
        cancel : function(){
            console.log('annulation...')
        },
        assignCard : function(card){
            console.log('twoStepPowers : assign card', card)
            this.cardsAssigned.push(card);
        }
    }
}

export { twoStepPowers }