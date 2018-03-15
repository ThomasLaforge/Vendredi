import * as React from 'react';

import Modal from 'material-ui/Modal'

import DangerCard from './DangerCard'
import PlayableCard from './PlayableCard'

import {DangerCard as DangerCardModel} from '../modules/DangerCard'
import {PlayableCard as PlayableCardModel} from '../modules/PlayableCard'


export enum DiscardType {
    Playable,
    Danger
}

interface DiscardProps {
    switchShowDiscard: Function;
    cards: any;
    show: boolean;
    type: DiscardType;
}

export default class Discard extends React.Component<DiscardProps> {
    constructor(props: DiscardProps) {
        super(props);
        this.state = {
        };
    }

    close = () => {
        this.setState({cardAssigned: []});
        this.props.switchShowDiscard();
    }

    render() {

        return (
            <div>
                <Modal
                    open={this.props.show}
                    onClose={this.close}
                >
                    <div>
                        <h2>Liste des cartes dans la défausse</h2>
                        {this.props.cards.map( (c, i) => 
                            this.props.type === DiscardType.Danger ? <DangerCard danger={c} /> : <PlayableCard card={c} />
                        )}
                    </div>
                </Modal>
            </div>
        )
    }
}