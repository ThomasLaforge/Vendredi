// import { pirateCard } from './pirateCard'
// import { PirateCard } from '../modules/PirateCard'
// import { discard } from './discard'

// let template = `

// `

// const gameInfo = {
//     props : ['game'],
//     template : template,
//     data: function(){
//         return {
//             discardDangerOpen : false,
//             discardPlayableOpen : false,
//             discardGlobalOpen : false,
//         }
//     },
//     computed : {
//         pirateList : function(){ return this.game.getListOfPirateToFight() }
//     }
//     methods: {
//         switchDiscardPlayable(){
//             console.log('switch discard playable')
//             this.discardPlayableOpen = !this.discardPlayableOpen            
//             this.discardDangerOpen = false            
//             this.discardGlobalOpen = false            
//         },
//         switchDiscardDanger(){
//             console.log('switch discard danger') 
//             this.discardDangerOpen = !this.discardDangerOpen
//             this.discardPlayableOpen = false
//             this.discardGlobalOpen = false
//         },
//         switchDiscardGlobal(){
//             console.log('switch discard global')             
//             this.discardGlobalOpen = !this.discardGlobalOpen;
//             this.discardPlayableOpen = false
//             this.discardDangerOpen = false
//         }
//     }
// };
import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {DangerCard as DangerCardModel} from '../modules/DangerCard'

import DangerCard from './DangerCard'
import Button from 'material-ui/Button';

interface GameInfoProps extends DefaultProps {
    dangers: DangerCardModel[];
}

interface GameInfoState {
    currentSelected: number;
}

@inject(injector)
@observer
export default class GameInfo extends React.Component<GameInfoProps, GameInfoState> {
    constructor(props: GameInfoProps) {
        super(props);
        this.state = {
            currentSelected : 0            
        };
    }

    chose = () => {

    }

    render() {
        return <div className="game-info">
            {/* <div id="pirates-list">
                <div className="pirates-list-elt" v-for="pirate in this.props.game.getListOfPirateToFight()">
                    <pirate-card :pirate="pirate" />
                    <div v-if="(game.fight && game.fight.cardToFight === pirate)">En cours</div>
                </div>
            </div>
        
            <div className="info-main-content">
                <div className="info-main-fight-cards info-main-elt">
                    <div id="nbFightCards" className="info-main-value" @click="switchDiscardPlayable" title="Fight cards">{{ game.fightDeck.length() }}</div>
                </div>
                
                <div className="info-main-danger-cards info-main-elt">
                    <div id="nbDangerCards" className='info-main-value' @click="switchDiscardDanger" title="Danger cards">{{ game.dangerDeck.length() }}</div>
                </div>
                
                <div className="info-main-aging-cards info-main-elt">
                    <div id="nbAgingCards" title="Aging cards" className="info-main-value">{{ game.agingDeck.length() }}</div>
                </div>
                
                <Button className="md-raised md-primary info-main-elt" onClick={this.switchDiscardGlobal()}>
                    Discard
                </Button>
            </div> */}
            {/*         
            <discard 
                :cards="game.fightDeck.arrayDiscard" 
                :show="discardPlayableOpen" 
                :type="'playable'" 
                @switchShowDiscard="switchDiscardPlayable"
            />
            <discard 
                :cards="game.dangerDeck.arrayDiscard" 
                :show="discardDangerOpen" 
                :type="'danger'" 
                @switchShowDiscard="switchDiscardDanger"
            />
        
            <discard
                :cards="game.arrayOfRemovedCards"
                :show="discardGlobalOpen"
                :type="'playable'"
                @switchShowDiscard="switchDiscardGlobal"
            /> */}
        </div>
    }
}