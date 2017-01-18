import {FightCard}      from '../../modules/FightCard'
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
  mounted : function(){
    console.log('this.cardList', this.cardList)
  },
  components : {
    draggable,
    playableCard
  },
  methods : {
    logList(){
        this.cardList.forEach( card => {
          console.log(card.strength)
        })
    }
  }
};

export { sortThreeCards }