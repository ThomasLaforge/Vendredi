import * as React from 'react';

import { GameLevel } from '../modules/Vendredi'
import {DangerCard as DangerCardModel} from '../modules/DangerCard'

interface DangerCardProps {
    danger: DangerCardModel;
    selected?: boolean;
    select?: Function;
}

export default class DangerCard extends React.Component<DangerCardProps> {
    constructor(props: DangerCardProps) {
        super(props);
        this.state = {
        };
    }

    onSelect = () => {
        this.props.select()
    }

    render() {
        let danger = this.props.danger

        return <div className={'card-slot card-danger' + this.props.selected ? ' danger-card-selected' : ''} onClick={() => this.onSelect()}>
                <div className="danger-card-definition">
                    <div className="card-danger-name">{danger.name}</div>
                    <div className="card-danger-details">
                        <div className="card-danger-freecards">{danger.freeCards}</div>
                        <div className="card-danger-strength">
                            <div className="card-danger-strength-lvl card-danger-strength-3">{danger.getStrength(GameLevel.THIRD_ROUND)}</div>
                            <div className="card-danger-strength-lvl card-danger-strength-2">{danger.getStrength(GameLevel.SECONDE_ROUND)}</div>
                            <div className="card-danger-strength-lvl card-danger-strength-1">{danger.getStrength(GameLevel.FIRST_ROUND)}</div>
                        </div>
                    </div>
                </div>

                <div className="bambou-separation"></div>

                <div className="card-danger-fight-definition">
                    <div className="card-danger-fight-main-info">
                        <div className="card-danger-fight-strength">{danger.fightCard.strength}</div>
                        <div className="card-danger-fight-name">{danger.fightCard.name}</div>
                        <div className="card-danger-fight-destroycost">{danger.fightCard.costToDelete}</div>
                    </div>
                    <div className="card-danger-fight-power">{danger.fightCard.power || danger.fightCard.power === 0 ? danger.powerName : '...'}</div>
                </div>
            </div>
    }
}