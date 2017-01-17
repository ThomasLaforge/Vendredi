import {FightCard}      from '../../modules/FightCard'
import {FightCardPower} from '../../modules/Vendredi'
import {playableCard}   from '../playableCard'

var draggable = require('vuedraggable')

let template = `
    <draggable :list="list">
        <playable-card v-for="card in list" :card="card" />
    </draggable>
    <button @click="logList">Log the list</button>
`;

let sortThreeCards = {
  template : template,
  props:['list'],
  components : {
    draggable,
    playableCard
  },
  methods : {
    logList(){
        console.log(this.list)
    }
  }
};

export { sortThreeCards }