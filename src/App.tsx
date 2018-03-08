// // Libraries
//     // let bootstrap = require('bootstrap/dist/js/bootstrap');
//     import * as _ from 'lodash'

// // Model
//     import { Game 	}           from './modules/Game';
//     import { PlayableCard }     from './modules/PlayableCard';
//     import { FightCard }        from './modules/FightCard';
//     import { FightCardPower }   from './modules/Vendredi';
//     import { GameSaveManager }  from './modules/GameSaveManager';
//     let newGame  = new Game();
//     let gsm      = new GameSaveManager(newGame)

// // Game Config
//     // newGame.level = 2
    
// // Vue
//     import { dangerCard }       from './Vue/dangerCard';
//     import { pirateCard }       from './Vue/pirateCard';
//     import { playableCard }     from './Vue/playableCard';
//     import { gameInfo }         from './Vue/gameInfo';
//     import { gameDangerChoice } from './Vue/gameDangerChoice';
//     import { gameFight }        from './Vue/gameFight';
//     import { gameOver }         from './Vue/gameOver';
//     import { gameSaveManager } from './Vue/gameSaveManager';
//     import { sortThreeCards } from './Vue/components/sortThreeCards';
//     import { modal } from './Vue/components/modal';

// // Main
// Vue.use(VueMaterial)

// Vue.material.registerTheme('default', {
//   primary: 'blue',
// //   warn: 'red',
// //   background: 'black'
// })
// // Vue.material.setCurrentTheme('about')

// let app = new Vue({
//     el: '#app',
//     data: () => {
//         return {
//             gamesavemanager : gsm,
//             initialgame : gsm.game,
//             testingHistory : true,
//             piratesOpen: false
//         }
//     },
//     computed: {
//         gsm : function() { return this.gamesavemanager }, 
//         game : function() { return this.gsm.game },
//         pirateList : function(){ return this.game.getListOfPirateToFight() }
//     },
//     components:{
//         gameInfo,
//         gameDangerChoice,
//         gameFight,
//         gameOver,
//         gameSaveManager,
//         pirateCard,
//         modal
//     },
//     methods: {
//         addCardToFight(){
//             this.game.addPlayableCardToFight();
//         },
//         startFight(index:number){
//             this.game.startFight(this.game.dangerChoiceCards[index]);
//         },
//         stopFight(){
//             this.game.stopFight();
//         },
//         endFightLost(arrOfCardsToDelete:Array<PlayableCard>){
//             this.game.endFightLost(arrOfCardsToDelete);
//         },
//         useMyPower(card:FightCard){
//             this.game.usePower(card)
//         },
//         useTwoStepPower(data:{ usedCard:FightCard, assignedCards: Array<PlayableCard>}){
//             this.game.usePower(data.usedCard, data.assignedCards)
//         },
//         save(){
//             this.gsm.save();
//         },
//         load(slotName:null|string){
//             this.gsm.load(slotName)
//         },
//         showPirates(){
//             this.piratesOpen = true
//         },
//         closePirates(){
//             this.piratesOpen = false
//         }
//     }
// })







import * as React from 'react';
import {observer, Provider } from 'mobx-react';

import DevTools from 'mobx-react-devtools';

import Game from './components/Game';
import CardCollection from './components/CardCollection';
import Logger from './components/Logger';
import { Game as GameModel } from './modules/Game'
import { Store } from './modules/Store'
import './styles/App.scss';

@observer
class App extends React.Component<{}, { store: Store} > {

  constructor(props: any){
    super(props);
    this.state = {
      store: new Store()
    }
  }

  render() {
    return (
      <Provider store={this.state.store} >
          <div className="App">
            <Game />
            {/* <Logger logger={this.state.store.gameStore.UI_Logger} /> */}
            {/* <CardCollection /> */}
            {/* <DevTools /> */}
          </div>
      </Provider>
    );
  }
}

export default App;
