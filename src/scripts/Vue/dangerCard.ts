import { GameLevel } from '../modules/Vendredi'

let template = `
    <div class="card-slot card-danger" :class="selected === true ? 'danger-card-selected' : '' " @click="select">
        <!-- danger definition -->
        <div class="danger-card-definition">
            <div class="card-danger-name">{{danger.name}}</div>
            <div class="card-danger-details">
                <div class="card-danger-freecards">{{danger.freeCards}}</div>
                <div class="card-danger-strength">
                    <div class="card-danger-strength-lvl card-danger-strength-3">{{danger.getStrength(thirdLevel)}}</div>
                    <div class="card-danger-strength-lvl card-danger-strength-2">{{danger.getStrength(secondeLevel)}}</div>
                    <div class="card-danger-strength-lvl card-danger-strength-1">{{danger.getStrength(firstLevel)}}</div>
                </div>
            </div>
        </div>

        <div class="bambou-separation"></div>
        <!-- fight definition -->
        <div class="card-danger-fight-definition">
            <div class="card-danger-fight-main-info">
                <div class="card-danger-fight-strength">{{danger.fightCard.strength}}</div>
                <div class="card-danger-fight-name">{{danger.fightCard.name}}</div>
                <div class="card-danger-fight-destroycost">{{danger.fightCard.costToDelete}}</div>
            </div>
            <div class="card-danger-fight-power">{{danger.fightCard.power ? danger.powerName() : '...'}}</div>
        </div>
    </div>
`;

const dangerCard = {
    template: template,
    props : {
        danger : {
            type : Object
        },
        selected : {
            type : Boolean,
            default : () => { return false }
        }
    },
    data : () => {
        return {
            firstLevel : GameLevel.FirstRound,
            secondeLevel : GameLevel.SecondRound,
            thirdLevel : GameLevel.ThirdRound,
        }
    },
    methods: {
        select(){
            this.$emit('select', this.index);
        }
    }
}

export { dangerCard }