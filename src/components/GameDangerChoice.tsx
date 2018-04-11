import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {DangerCard as DangerCardModel} from '../modules/DangerCard'

import DangerCard from './DangerCard'
import Button from 'material-ui/Button';

interface GameDangerChoiceProps extends DefaultProps {
    dangers: DangerCardModel[];
    chose: Function;
}

interface GameDangerChoiceState {
    currentSelected: number;
}

@inject(injector)
@observer
export default class GameDangerChoice extends React.Component<GameDangerChoiceProps, GameDangerChoiceState> {
    constructor(props: GameDangerChoiceProps) {
        super(props);
        this.state = {
            currentSelected : 0            
        };
    }

    changeSelectedIndex(index){
        if(index !== this.state.currentSelected){
            this.setState({ currentSelected: index }, () => console.log('new index', this.state.currentSelected))
        }
    }

    chose = () => {
        let selectedCard = this.props.dangers[this.state.currentSelected]
        // console.log('chose card', selectedCard)
        this.props.chose(selectedCard)
    }

    //         handleKeyboardEvent(e:KeyboardEvent){
//             if(e.keyCode){
//                 if(e.keyCode === 13){
//                     this.chose()
//                 }
//                 if(e.keyCode === 37){
//                     this.changeSelectedIndex(0)
//                 }
//                 if(e.keyCode === 39){
//                     this.changeSelectedIndex(1)
//                 }
//             }
//         },
//         changeSelectedIndex(index:number){
//             this.currentSelected = index;
//         },
//         chose(){
//             this.$emit('chose', this.currentSelected);
//         }
//     },
//     created: function () {
//         window.addEventListener('keyup', this.handleKeyboardEvent)
//     },
//     beforeDestroy: function () {
//         window.removeEventListener('keyup', this.handleKeyboardEvent);
//     }

    renderDangers(){
        return this.props.dangers.map( (d, i) => 
            <DangerCard
                danger={d}
                selected={i === this.state.currentSelected} 
                select={() => this.changeSelectedIndex(i)}
                key={i}
            />
        )
    }

    render() {
        return <div className="game-danger-choice" id="zone-danger-choice">
            <div className="danger-choice-card-slots" id="danger-choice-card-slots">
                {this.renderDangers()}
            </div>

            <div className="danger-choice-actions">
                <Button className="md-raised md-primary" id="btn-action-chose-danger"
                    variant="raised"
                    onClick={this.chose}
                >
                    Choisir !
                </Button>
            </div>
        </div>
    }
}