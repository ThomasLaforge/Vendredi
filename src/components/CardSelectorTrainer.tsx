import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import Button from 'material-ui/Button';

import brain from 'brain.js'

interface CardSelectorTrainerProps extends DefaultProps {
}

interface CardSelectorTrainerState {
    pv: number,
    meanDeckValue: number,
    net: any,
    trainDataSet: any[]
}

@inject(injector)
@observer
class CardSelectorTrainer extends React.Component <CardSelectorTrainerProps, CardSelectorTrainerState> {

    constructor(props: CardSelectorTrainerProps){
        super(props)
        this.state = {
            pv: 20,
            meanDeckValue: 0.8,
            net: null,
            trainDataSet: []
        }
    }

    click = () => { console.log('click !')}

    train(){
        let net = brain.NeuralNetwork()
        net.train(this.state.trainDataSet)
    }

    render() {
        return ( 
            <div className="card-selector-trainer">
                <h1>Card Selector</h1>
                <Button variant="raised"
                    onClick={this.click}
                >
                    chose 1
                </Button>
                <Button variant="raised"
                    onClick={this.click}
                >
                    chose 2
                </Button>
                <Button variant="raised"
                    onClick={this.click}
                >
                    Train
                </Button>
            </div>
        );
    }
}

export default CardSelectorTrainer;
