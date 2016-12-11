import { FightCard } from '../modules/FightCard'

let template = `
<div @click="select" :class="selectedClass">
    <div class="fight-card-strength">{{card.strength}}</div>
    <div class="fight-card-power">{{card.power || card.power === 0 ? card.powerName : ''}}</div>
</div>
`

const playableCard = {
    template : template,
    props : ['card', 'inFight', 'selectedToDelete'],
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
            return renderClass; //selectedToDelete ? 'end-fight-card-to-delete' : ''" :class="used ? 'fight-danger-fight-used' : ''"
        }
    },
    methods : {
        select : function(){
            if(!this.inFight){
                this.$emit('cardToDelete', this.card)
            }
            else{
                if(this.card.power){
                    this.$emit('usePower', this.card)
                }
            }
        }
    }
}

export { playableCard }