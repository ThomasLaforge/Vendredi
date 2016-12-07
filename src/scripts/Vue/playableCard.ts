let template = `
<div class="fight-card" @click="select" :class="selectedClass">
    <div class="fight-card-strength">{{card.strength}}</div>
    <div class="fight-card-power">{{card.power ? card.powerName : ''}}</div>
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