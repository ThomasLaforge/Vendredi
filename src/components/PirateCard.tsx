import * as React from 'react';

import {PirateCard as PirateCardModel} from '../modules/PirateCard'

interface PirateCardProps {
    pirate: PirateCardModel;
}

export default class PirateCard extends React.Component<PirateCardProps> {
    constructor(props: PirateCardProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        let pirate = this.props.pirate

        return (
            <div className="pirate-card">
                <div className="pirate-card-info-zone">
                    <div className="pirate-card-nbFreeCards">{pirate.freeCards ? pirate.freeCards : '*'}</div>
                    <div className="pirate-card-name">{pirate.name}</div>
                    <div className="pirate-card-strength">{pirate.strength ? pirate.strength : '*'}</div>
                </div>
                <div className="pirate-card-mission">{pirate.mission || pirate.mission === 0 ? pirate.missionName() : '...'}</div>
            </div>
        );
    }
}