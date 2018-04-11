import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {DangerCard as DangerCardModel} from '../modules/DangerCard'
import {DiscardType} from './Discard'

import DangerCard from './DangerCard'
import PirateCard from './PirateCard'
import Discard from './Discard'

import Button from 'material-ui/Button';

interface GameInfoProps extends DefaultProps {
}

interface GameInfoState {
    currentSelected: number;
    discardGlobalOpen: boolean;
    discardDangerOpen: boolean;
    discardPlayableOpen: boolean;
}

@inject(injector)
@observer
export default class GameInfo extends React.Component<GameInfoProps, GameInfoState> {
    constructor(props: GameInfoProps) {
        super(props);
        this.state = {
            currentSelected : 0,
            discardGlobalOpen : false,
            discardDangerOpen: false,
            discardPlayableOpen: false
        };
    }

    get pirateList(){
        return this.props.game.getListOfPirateToFight()
    }

    chose = (index) => {
        this.setState({
            currentSelected: index === this.state.currentSelected ? null : index
        })
    }

    switchDiscardPlayable = () => {
        console.log('switch discard playable')
        this.setState({
            discardPlayableOpen: !this.state.discardPlayableOpen,           
            discardDangerOpen: false,
            discardGlobalOpen: false            
        })
    }

    switchDiscardDanger = () => {
        console.log('switch discard danger') 
        this.setState({        
            discardDangerOpen: !this.state.discardDangerOpen,
            discardPlayableOpen: false,
            discardGlobalOpen: false
        })
    }

    switchDiscardGlobal = () => {
        console.log('switch discard global')             
        this.setState({        
            discardGlobalOpen: !this.state.discardGlobalOpen,
            discardPlayableOpen: false,
            discardDangerOpen: false
        })
    }

    render() {
        const game = this.props.game
        return <div className="game-info">
            <div id="pirates-list">
                {this.pirateList.map( (pirate, k) =>
                    <div className="pirates-list-elt" key={k}>
                        <PirateCard pirate={pirate} />
                        {(game.fight && game.fight.cardToFight === pirate) && <div>En cours</div>}
                    </div>
                )}
            </div>
        
            <div className="info-main-content">
                <div className="info-main-fight-cards info-main-elt">
                    <div id="nbFightCards" className="info-main-value" 
                        title="Fight cards"
                        onClick={this.switchDiscardPlayable} 
                    >
                        { game.fightDeck.length }
                    </div>
                </div>
                
                <div className="info-main-danger-cards info-main-elt">
                    <div id="nbDangerCards" className='info-main-value' 
                        title="Danger cards"
                        onClick={this.switchDiscardDanger} 
                    >
                        {game.dangerDeck.length}
                    </div>
                </div>
                
                <div className="info-main-aging-cards info-main-elt">
                    <div id="nbAgingCards" title="Aging cards" className="info-main-value">{ game.agingDeck.length }</div>
                </div>
                
                <Button className="md-raised md-primary info-main-elt" 
                    variant="raised"
                    onClick={this.switchDiscardGlobal}
                >
                    Discard
                </Button>
            </div>
                    
            <Discard 
                cards={game.fightDeck.arrayDiscard} 
                show={this.state.discardPlayableOpen} 
                type={DiscardType.Playable} 
                switchShowDiscard={this.switchDiscardPlayable}
            />
            <Discard 
                cards={game.dangerDeck.arrayDiscard}
                show={this.state.discardDangerOpen} 
                type={DiscardType.Danger} 
                switchShowDiscard={this.switchDiscardDanger}
            />
        
            <Discard
                cards={game.arrayOfRemovedCards}
                show={this.state.discardGlobalOpen}
                type={DiscardType.Playable} 
                switchShowDiscard={this.switchDiscardGlobal}
            />
        </div>
    }
}