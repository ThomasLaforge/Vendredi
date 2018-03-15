//     created: function () {
//         window.addEventListener('keyup', this.handleKeyboardEvent)
//     },
//     beforeDestroy: function () {
//         window.removeEventListener('keyup', this.handleKeyboardEvent);
//     },

import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {DangerCard as DangerCardModel} from '../modules/DangerCard'
import {PlayableCard as PlayableCardModel} from '../modules/PlayableCard'
import {FightCard as FightCardModel} from '../modules/FightCard'
import {PirateCard as PirateCardModel} from '../modules/PirateCard'
import {Fight} from '../modules/Fight'
import {Tools} from '../modules/Tools'
import {PlayableCardPowerType, FightCardPower} from '../modules/Vendredi'

import DangerCard from './DangerCard'
import PlayableCard from './PlayableCard'
import PirateCard from './PirateCard'
// import TwoStepPowers from './TwoStepPowers'

import Button from 'material-ui/Button';

interface GameFightProps extends DefaultProps {
    fight: Fight, 
    nextThreeCards: PlayableCardModel[], 
    stop: Function, 
    draw: Function,
    fightClosed: Function,
    usePower: Function,
    useTwoStepPower: Function
}

interface GameFightState {
    cardsToDelete : any[],
    twoStepPowerSelectionOpen : boolean,
    twoStepCard : any,
    twoStepCards : any[]
}

@inject(injector)
@observer
export default class GameFight extends React.Component<GameFightProps, GameFightState> {
    constructor(props: GameFightProps) {
        super(props);
        this.state = {
            cardsToDelete : [],
            twoStepPowerSelectionOpen : false,
            twoStepCard : null,
            twoStepCards : []
        };
    }

    get isPirateFight(){ return this.fight.cardToFight instanceof PirateCardModel }
    get isDangerFight(){ return this.fight.cardToFight instanceof DangerCardModel }
    get nbCardsRemovable() { 
        let result: number = this.fight.getResult();
        let sum: number = 0;
        this.state.cardsToDelete.forEach( (c: PlayableCardModel) => { sum += c.costToDelete } ) 
        return Math.abs(result) - sum;
    }
    get forcedToStop(){ return this.fight.hasStopCard() }
    get fight(){ return this.props.fight }
    // handleKeyboardEvent(e:KeyboardEvent){
    //     if(e.keyCode){
    //         if(e.keyCode === 13){
    //             this.pickFightCard();
    //         }
    //         if(e.keyCode === 32){
    //             this.stopFight();
    //         }
    //     }
    // },
    pickFightCard = () => {
        this.props.draw()           
    }

    stopFight = () => {
        this.props.stop()
    }

    deleteCards = () => {
        if(this.state.cardsToDelete.length > 0) {
            this.props.fightClosed(this.state.cardsToDelete.slice())
        }
    }

    dontDelete = () => {
        this.props.fightClosed([])            
    }

    playableCardClicked = (card: PlayableCardModel) => {
        if(this.fight.finished){
            this.addCardToDelete(card)
        }
        else{
            if(card.power){
                if(this.fight.arrayFightCard.indexOf(card) !== -1){
                    // To test
                    this.useCard(card as FightCardModel)
                }
            }
        }
    }

    addCardToDelete(card:PlayableCardModel){
        let cardExists = this.fight.getAllCards().indexOf(card) != -1;
        // Juste check if this card exists
        if(cardExists){
            let index = this.state.cardsToDelete.indexOf(card); 
            if(index == -1){
                let costToDeleteThisOne = card.costToDelete;
                let actualTotalCostToDelete = Tools.getTotalCostToDelete(this.state.cardsToDelete.slice());
                let canAddIt = actualTotalCostToDelete + costToDeleteThisOne <= Math.abs(this.fight.getResult());
                if(canAddIt){
                    this.setState({ cardsToDelete: this.state.cardsToDelete.concat(card)})
                }
            }
            else{
                this.setState({ cardsToDelete: this.state.cardsToDelete.filter( (_, i) => i !== index)})
            }
        }
    }

    useCard(card: FightCardModel){
        console.log('gameFight: use card',card, PlayableCardPowerType[Tools.getTypeOfPower(card)])
        if(Tools.getTypeOfPower(card) === PlayableCardPowerType.TWO_STEP){
            this.refreshTwoStepCards();            
            this.setState({
                twoStepCard: card,
                twoStepPowerSelectionOpen: true
            })
        }
        else{
            this.props.usePower(card)
        }
    }
    
    switchTwoStepView = () => {
        this.setState({
            twoStepPowerSelectionOpen: !this.state.twoStepPowerSelectionOpen
        })
    }
    handleUseTwoStepPower = (data:{}) => {
        console.log(data ? data : 'no data');
        this.props.useTwoStepPower(data);
        this.setState({
            twoStepPowerSelectionOpen: false
        })
    }
    refreshTwoStepCards(){ 
        let cardToChose:Array<any> = [];
        if(this.state.twoStepCard) {
            if(this.state.twoStepCard.power === FightCardPower.SORT_THREE_CARDS){
                cardToChose = this.props.nextThreeCards
                console.log('cardToChose', cardToChose, this.props.nextThreeCards)
            }
            else{
                cardToChose = this.fight.getAllCards()
            }
        }
        this.setState({
            twoStepCards: cardToChose
        })
    }

    render() {
        let fight = this.props.game.fight

        return (
        <div className="game-fight" id="zone-fight">
            <div className="fight-danger-card-to-fight" id="danger-card-to-fight">
                { this.isDangerFight && <DangerCard danger={fight.cardToFight} />}
                { this.isPirateFight && <PirateCard pirate={fight.cardToFight} />}
            </div>
        
            <div className="fight-player-interface">
                <div className="fight-danger-fight-cards">
                    { fight.arrayFightCard.map( (card, index) => (
                        <PlayableCard 
                            card={card} 
                            inFight={!fight.finished} 
                            selectedToDelete={this.state.cardsToDelete.indexOf(card) != -1} 
                            onSelect={() => this.playableCardClicked(card)}
                            key={index}
                        />
                    ))}
                </div>
        
                <div className="fight-result-info-and-actions">
                    <div className="fight-danger-infos">
                        { !fight.finished && 
                            <span id="fight-danger-temporary-result" className={fight.getResult() >= 0 ? 'fight-danger-temporary-result-success' : 'fight-danger-temporary-result-negative'}>
                                { fight.getResult() }
                            </span>
                        }
                        <span v-if="fight.finished">
                            { this.nbCardsRemovable }
                        </span>
                    </div>
        
                    <div className="fight-danger-actions">
                        {!fight.finished && !this.forcedToStop &&
                            <Button 
                                className="md-primary md-dense md-raised fight-danger-action" id="btn-pick-fight-card" 
                                onClick={this.pickFightCard} 
                            >
                                Piocher ( {fight.freeCards > 0 ? fight.freeCards : fight.costOfCardsNotFree + ' PV'} )
                            </Button>
                        }
                        
                        { !fight.finished &&
                            <Button 
                                className="md-primary md-dense md-raised fight-danger-action" id="btn-stop-fight" 
                                onClick={this.stopFight} 
                            >
                                Stop
                            </Button>
                        }
                        { fight.finished &&
                            <Button 
                                className="md-primary md-dense md-raised fight-danger-action" id="btn-delete-fight-cards" 
                                onClick={this.deleteCards} 
                            >
                                Delete Card(s)
                            </Button>
                        }
                        
                        { fight.finished && 
                            <Button 
                                className="md-primary md-dense md-raised fight-danger-action" id="btn-dont-delete-fight-cards" 
                                onClick={this.dontDelete} 
                            >
                                Keep all
                            </Button>
                        }
                    </div>
                </div>
        
                <div className="fight-danger-fight-cards-used">
                    { fight.arrayFightCardUsed.map((card, index) => (
                        <PlayableCard
                            card={card}
                            inFight={!fight.finished} 
                            selectedToDelete={this.state.cardsToDelete.indexOf(card) != -1} 
                            onSelect={() => this.playableCardClicked(card)}
                            key={index}
                        />
                    ))}
                </div>
            </div>
            
            {/* <TwoStepPowers 
                show="twoStepPowerSelectionOpen" 
                cards="twoStepCards" 
                used-card="twoStepCard" 
                keyup.esc="switchTwoStepView" 
                switchShow="switchTwoStepView"
                useTwoStepPower="handleUseTwoStepPower"
            /> */}

        </div>
        )
    }
}