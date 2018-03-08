import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {PirateCard as PirateCardModel} from '../modules/PirateCard'

interface PirateCardProps extends DefaultProps {
    pirate: PirateCardModel;
}

@inject(injector)
@observer
export default class PirateCard extends React.Component<PirateCardProps> {
    constructor(props: PirateCardProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        let pirate = this.props.pirate

        return (
            <div class="pirate-card">
                <div class="pirate-card-info-zone">
                    <div class="pirate-card-nbFreeCards">{pirate.freeCards ? pirate.freeCards : '*'}</div>
                    <div class="pirate-card-name">{pirate.name}</div>
                    <div class="pirate-card-strength">{pirate.strength ? pirate.strength : '*'}</div>
                </div>
                <div class="pirate-card-mission">{pirate.mission || pirate.mission === 0 ? pirate.missionName() : '...'}</div>
            </div>
        );
    }
}