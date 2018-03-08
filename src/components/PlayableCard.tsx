import { PlayableCardModel } from '../modules/FightCard'

import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {PlayableCard as PlayableCardModel} from '../modules/PlayableCard'

interface PlayableCardProps extends DefaultProps {
    card: PlayableCardModel
    inFight: boolean, 
    selectedToDelete: boolean, 
    selectedToTwoStepPowers: boolean,
    onSelect: Function
}

interface PlayableCardState {
    used : boolean    
}

@inject(injector)
@observer
export default class PlayableCard extends React.Component<PlayableCardProps, PlayableCardState> {
    constructor(props: PlayableCardProps) {
        super(props);
        this.state = {
            used : true
        };
    }

    selectedClass(){
        let renderClass = '';
        renderClass += this.card instanceof FightCard ? 'fight-card ' : 'aging-card ';
        if(this.selectedToDelete){
            renderClass += 'end-fight-card-to-delete ';
        }
        if(this.selectedToTwoStepPowers){
            renderClass += 'two-step-powers-card-selected ';
        }
        return renderClass; //selectedToDelete ? 'end-fight-card-to-delete' : ''" :class="used ? 'fight-danger-fight-used' : ''"
    }

    render() {
        let Playable = this.props.Playable
        
        return (
            <div onClick={this.props.onSelect} className={this.selectedClass()}>
                <div className="fight-card-strength">{card.strength}</div>
                <div className="fight-card-power">{card.power || card.power === 0 ? card.powerName : ''}</div>
            </div>
        );
    }
}