import * as React from 'react';

import {PlayableCard as PlayableCardModel} from '../modules/PlayableCard'
import {FightCard as FightCardModel} from '../modules/FightCard'

interface PlayableCardProps {
    card: PlayableCardModel
    inFight: boolean, 
    selectedToDelete: boolean, 
    selectedToTwoStepPowers: boolean,
    onSelect: Function
}

interface PlayableCardState {
    used : boolean    
}

export default class PlayableCard extends React.Component<PlayableCardProps, PlayableCardState> {
    constructor(props: PlayableCardProps) {
        super(props);
        this.state = {
            used : true
        };
    }

    selectedClass(){
        let renderClass = '';
        renderClass += this.props.card instanceof FightCardModel ? 'fight-card ' : 'aging-card ';
        if(this.props.selectedToDelete){
            renderClass += 'end-fight-card-to-delete ';
        }
        if(this.props.selectedToTwoStepPowers){
            renderClass += 'two-step-powers-card-selected ';
        }
        return renderClass; //selectedToDelete ? 'end-fight-card-to-delete' : ''" :class="used ? 'fight-danger-fight-used' : ''"
    }

    render() {
        let card = this.props.card
        
        return (
            <div onClick={this.props.onSelect()} className={this.selectedClass()}>
                <div className="fight-card-strength">{card.strength}</div>
                <div className="fight-card-power">{card.power || card.power === 0 ? card.powerName : ''}</div>
            </div>
        );
    }
}