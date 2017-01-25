import {FightCard}      from '../../modules/FightCard'
import {PlayableCard}      from '../../modules/PlayableCard'
import {FightCardPower} from '../../modules/Vendredi'
import {playableCard}   from '../playableCard'

var draggable = require('vuedraggable')

let template = `
<div>
    <draggable :list="cardList">
        <playable-card v-for="card in cardList" :card="card" />
    </draggable>
    <button @click="logList">Log the list</button>
</div>
`;

let sortThreeCards = {
  template : template,
  props:['cardList'],
  components : {
    draggable,
    playableCard
  }
};

export { sortThreeCards }