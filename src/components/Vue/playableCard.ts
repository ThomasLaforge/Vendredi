import { FightCard } from '../modules/FightCard'

let template = `
<div @click="select" :class="selectedClass">
    <div class="fight-card-strength">{{card.strength}}</div>
    <div class="fight-card-power">{{card.power || card.power === 0 ? card.powerName : ''}}</div>
</div>
`

const playableCard = {
    template : template,
    props : ['card', 'inFight', 'selectedToDelete', 'selectedToTwoStepPowers'],
    data : function(){
        return {
            used : true
        }
    },
    computed : {
        selectedClass : function(){
            let renderClass = '';
            renderClass += this.card instanceof FightCard ? 'fight-card ' : 'aging-card ';
            if(this.selectedToDelete){
                renderClass += 'end-fight-card-to-delete ';
            }
            if(this.selectedToTwoStepPowers){
                renderClass += 'two-step-powers-card-selected ';
            }
            return renderClass; //selectedToDelete ? 'end-fight-card-to-delete' : ''" :class="used ? 'fight-danger-fight-used' : ''"
        }
    },
    methods : {
        select : function(){
            this.$emit('select', this.card)
        }
    }
}

export { playableCard }