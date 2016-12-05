import { pirateCard } from './pirateCard'

let template = `
<div class="game-info">
    <div class="info-main">
        <div class="info-main-pv info-main-elt" id="pv">
            <div class="info-main-value">{{ PV }}</div>
        </div>
    </div>
</div>
`

const gameInfo = {
    props : ['game', 'pv'],
    template : template,
    computed: {
        PV : () => {
            console.log(thi)
            return this.$props.pv
        }
    },
    components : {
        pirateCard
    }
};

export { gameInfo }