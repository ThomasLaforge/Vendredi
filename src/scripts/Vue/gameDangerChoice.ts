import { dangerCard } from './dangerCard'

let template = `
<div class="game-danger-choice" id="zone-danger-choice">
    <div class="danger-choice-card-slots" id="danger-choice-card-slots">
        <danger-card v-for="(danger, index) in dangerChoice"
            :danger="danger" 
            :selected="index === currentSelected ? true : false" 
            @select="changeSelectedIndex(index)" 
        />
    </div>

    <div class="danger-choice-actions">
        <md-button class="md-raised md-primary" id="btn-action-chose-danger" @click.native="chose">
            Choisir !
        </md-button>
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
        handleKeyboardEvent(e:KeyboardEvent){
            if(e.keyCode){
                if(e.keyCode === 13){
                    this.chose()
                }
                if(e.keyCode === 37){
                    this.changeSelectedIndex(0)
                }
                if(e.keyCode === 39){
                    this.changeSelectedIndex(1)
                }
            }
        },
        changeSelectedIndex(index:number){
            this.currentSelected = index;
        },
        chose(){
            this.$emit('chose', this.currentSelected);
        }
    },
    created: function () {
        window.addEventListener('keyup', this.handleKeyboardEvent)
    },
    beforeDestroy: function () {
        window.removeEventListener('keyup', this.handleKeyboardEvent);
    }
};

export { gameDangerChoice }