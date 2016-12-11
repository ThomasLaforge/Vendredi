import { pirateCard } from './pirateCard'

let template = `
<div class="game-info">
    <div id="pirates-list">
        <div class="pirates-list-elt" v-for="pirate in game.pirates">
            <pirate-card :pirate="pirate" />
        </div>
    </div>
    <div class="info-main">
        <div class="info-main-pv info-main-elt" id="pv">
            <div class="info-main-value">{{ game.player.PV }}</div>
        </div>
        <div class="info-main-fight-cards info-main-elt">
            <div id="nbFightCards" class="info-main-value">{{ game.fightDeck.length() }}</div>
            <div class="info-main-subject">Fight cards</div>
        </div>
        <div class="info-main-danger-cards info-main-elt">
            <div id="nbDangerCards" class='info-main-value'>{{ game.dangerDeck.length() }}</div>
            <div class="info-main-subject">Danger cards</div>
        </div>
        <div class="info-main-aging-cards info-main-elt">
            <div id="nbAgingCards" class="info-main-value">{{ game.agingDeck.length() }}</div>
            <div class="info-main-subject">Aging cards</div>
        </div>
        <div class="info-main-level info-main-elt">
            <div id="level" class="info-main-value" :class="game.level < -1 ? 'level-value-' + (game.level + 1) : 'level-value-pirates'">{{ game.level + 1 }}</div>
            <div class="info-main-subject">Level</div>
        </div>
    </div>
</div>
`

const gameInfo = {
    props : ['game'],
    template : template,
    components : {
        pirateCard
    }
};

export { gameInfo }