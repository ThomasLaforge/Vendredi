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
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Game as GameModel} from '../modules/Game'

import GameInfo from './GameInfo'
import GameOver from './GameOver'
import GameDangerChoice from './GameDangerChoice'
// import GameFight from './GameFight'

interface GameProps extends DefaultProps {
}

@inject(injector)
@observer
class Game extends React.Component <GameProps> {

    constructor(props: GameProps){
        super(props)
        this.state = {
        }
    }

    startFight = () => {}
    stopFight = () => {}
    addCardToFight = () => {}
    endFightLost = () => {}
    useMyPower = () => {}
    useTwoStepPower = () => {}

    render() {
        let game = this.props.game
        return (
            <div className="game">
                {/* <md-toolbar> 
                    <div class="md-toolbar-container">
                <md- class="md-icon-button">
                    <md-icon>menu</md-icon>
                </md-button>

                <h1 class="md-title" style="flex:1">Vendredi</h1>

                <!--<div id="nbFightCards" class="info-main-value" title="Fight cards">{{ game.fightDeck.length() }}</div> */}

                <div id="nbDangerCards" className='info-main-value' title="Danger cards">{ game.dangerDeck.length() }}</div>
                
                <div id="nbAgingCards" title="Aging cards" className="info-main-value">{ game.agingDeck.length() }</div>
                {/* --> */}
                {/* <!--<md-icon class="md-size-2x">delete</md-icon>                --> */}

                {/* <md-button class="md-icon-button" @click.native="showPirates">
                    <md-icon class="md-size-2x" :class="game.level < 3 ? 'level-value-' + (game.level + 1) : 'level-value-pirates'">flag</md-icon>
                </md-button> */}

                <div className="pv">
                    {/* <md-icon className="md-size-2x md-accent">favorite</md-icon> */}
                    <div className="pv-value">{game.robinson.PV}</div>
                </div>

                <GameInfo />
                {/* <GameOver playerName={game.robinson.pseudo} /> */}
                {/*<div v-if="game.isWon()">C'est gagné !</div>*/}
                
                {/*<GameDangerChoice v-if="( !game.fight && !game.isGameOver() && !game.isWon() )" :danger-choice="game.dangerChoiceCards" @chose="startFight" />*/}
                {/* <GameDangerChoice dangerChoice={game.dangerChoiceCards} chose={this.startFight} /> */}

                {/*<GameFight v-if="(game.fight && !game.isGameOver() && !game.isWon() )" :fight="game.fight" :next-three-cards="game.getThreeFisrtFightCards()" @stop="stopFight" @draw="addCardToFight" @fight-closed="endFightLost" @use-power="useMyPower" @use-two-step-power="useTwoStepPower" />*/}
                {/* <GameFight 
                    fight={game.fight} 
                    nextThreeCards={game.getThreeFisrtFightCards()} 
                    stop={this.stopFight} 
                    draw={this.addCardToFight}
                    fightClosed={this.endFightLost} 
                    usePower={this.useMyPower}
                    useTwoStepPower={this.useTwoStepPower} 
                /> */}
        {/*</md-layout>
        <!--<md-layout md-flex="100">            
            <game-save-manager @save="save" @load="load"></game-save-manager>
        </md-layout>-->

        <modal :show.sync="piratesOpen" :on-close="closePirates">
            <h2>Pirates</h2>
            <div id="pirates-list">
                <div class="pirates-list-elt" v-for="pirate in pirateList">
                    <pirate-card :pirate="pirate" />
                    <div v-if="(game.fight && game.fight.cardToFight === pirate)">En cours</div>
                </div>
            </div>
        </modal>
        */}
            </div>
        );
    }
}

export default Game;