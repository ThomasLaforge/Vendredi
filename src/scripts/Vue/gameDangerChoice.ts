import { dangerCard } from './dangerCard'

let template = `
<div class="game-danger-choice" id="zone-danger-choice">
    <div class="danger-choice-card-slots" id="danger-choice-card-slots">
        <danger-card v-for="(danger, index) in dangerChoice" :danger="danger" :selected="index === currentSelected ? true : false" @select="changeSelectedIndex(index)"></danger-card>
    </div>

    <div class="danger-choice-actions">
        <button id="btn-action-chose-danger" @click="chose">Choisir !</button>
    </div>
</div>
`

const gameDangerChoice = {
    props : ['dangerChoice'],
    template : template,
    components:{
        dangerCard
    },
    data : function() {
        return {
            currentSelected : 0
        }
    },
    methods:{
        changeSelectedIndex(index){
            console.log('choice : card is selected')
            this.currentSelected = index;
        },
        chose(){
            this.$emit('chose', this.currentSelected);
        }
    }
};

export { gameDangerChoice }