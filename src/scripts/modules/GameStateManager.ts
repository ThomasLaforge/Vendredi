import {GameSaveStateState, AgingCardPower, FightCardPower, GameStateAction, GameLevel, playableCardHistoryJson} from './Vendredi';
import * as config from '../modules/Configuration'
import {Game} from './Game';
import {Fight} from './Fight'
import {DangerFight} from './DangerFight'
import {PirateFight} from './PirateFight'
import {Player} from './Player';
import {PlayableCard} from './PlayableCard';
import {AgingCard} from './AgingCard';
import {PirateCard} from './PirateCard';
import {FightCard} from './FightCard';
import {DangerCard} from './DangerCard';
import {FightDeck} from './FightDeck';
import {DangerDeck} from './DangerDeck';
import {AgingDeck} from './AgingDeck';
import {PirateDeck} from './PirateDeck';
import * as _ from 'lodash';

class GameStateManager {

    constructor( private _game:Game, private currentStateId?:string ){}

    getAllSaveStates(){
        let res: Array<string> = []
        
        for(let i = 0; i < localStorage.length;i++){
            res.push(localStorage.key(i));
        }

        return res
    }

    // History

    /*
    *   Timeline:
    *
    *   Start       Event 1        Event2       Event 3       Last event/End
    *     |------------|-------------|-------------|-----------------|
    *
    *   History = [ Start , Event 1, Event 2, Event 3, End]
    *   
    *   Undo Redo case. 
    *       if undo redo without new event => No problemo
    *       if undo and add new event => this event become last element => remove event after in Timeline:
    *           Ex : Undo to event 1 and change action => Delete all after Event 1
    *   Start       Event 1      New Event       
    *     |------------|-------------|
    *
    */

    save() : string {
        let stateToSave : string;
        this._game.lastChangeDate = Date.now();
        stateToSave = JSON.stringify(_.clone(this._game));
        try {
            localStorage.setItem(config.SAVE_SLOT_DEFAULT_NAME, stateToSave);
        } catch(domException) {
            if (domException.name === 'QuotaExceededError' ||
                domException.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                // Fallback code comes here.
            }
        }
        return stateToSave;
    }

    load(gameSlotName? : string) : Game {
        let slotName = gameSlotName ? gameSlotName : config.SAVE_SLOT_DEFAULT_NAME;
        let gameSaveStateJson = localStorage.getItem(gameSlotName);
        // console.log('loading game state', gameSaveStateJson);
        if(gameSaveStateJson === null){
            return null
        }
        let state : GameSaveStateState = JSON.parse(gameSaveStateJson);
        console.log('state to load', state)
        let p = new Player(state._player.pseudo, state._player.PV)
        //decks
        let fightDeck:Array<PlayableCard> = [];
        state._fightDeck.arrayDeck.forEach( pcJson => { 
            let cardToAdd: PlayableCard;
            if(pcJson.level){
                cardToAdd = new AgingCard(pcJson.name, pcJson.strength, <AgingCardPower>pcJson.power, pcJson.level, pcJson.powerUsed, pcJson.toDestroyAtEndOfFight)
            }
            else{
                cardToAdd = new FightCard(pcJson.name, pcJson.strength, <FightCardPower>pcJson.power, pcJson.powerUsed, pcJson.toDestroyAtEndOfFight)                
            }
            fightDeck.push(cardToAdd)
        })
        let fightDiscard:Array<PlayableCard> = [];
        state._fightDeck.arrayDiscard.forEach( pcJson => {
            let cardToAdd: PlayableCard;
            if(pcJson.level){
                cardToAdd = new AgingCard(pcJson.name, pcJson.strength, <AgingCardPower>pcJson.power, pcJson.level, pcJson.powerUsed, pcJson.toDestroyAtEndOfFight)
            }
            else{
                cardToAdd = new FightCard(pcJson.name, pcJson.strength, <FightCardPower>pcJson.power, pcJson.powerUsed, pcJson.toDestroyAtEndOfFight)                
            }
            fightDiscard.push(cardToAdd)
        })

        let dangerDeck:Array<DangerCard> = [];
        state._dangerDeck.arrayDeck.forEach( dcJson => { 
            let fcJson = dcJson.fightCard;
            let fightCard = new FightCard(fcJson.name, fcJson.strength, fcJson.power, fcJson.powerUsed, fcJson.toDestroyAtEndOfFight)
            dangerDeck.push( new DangerCard(fightCard, dcJson.name, dcJson.freeCards) )
        })                
        let dangerDiscard:Array<DangerCard> = [];
        state._dangerDeck.arrayDiscard.forEach( dcJson => { 
            let fcJson = dcJson.fightCard;
            let fightCard = new FightCard(fcJson.name, fcJson.strength, fcJson.power, fcJson.powerUsed, fcJson.toDestroyAtEndOfFight)
            dangerDiscard.push( new DangerCard(fightCard, dcJson.name, dcJson.freeCards) )
        })

        let pirateDeck:Array<PirateCard> = [];
        state._pirateDeck.arrayDeck.forEach( pJson => {
            pirateDeck.push( new PirateCard(pJson.name, pJson.strength, pJson.mission, pJson.freeCards) )
        })
        let pirateDiscard:Array<PirateCard> = [];
        state._pirateDeck.arrayDiscard.forEach( pJson => {
            pirateDiscard.push( new PirateCard(pJson.name, pJson.strength, pJson.mission, pJson.freeCards) )
        })

        let agingDeck:Array<AgingCard> = [];
        state._agingDeck.arrayDeck.forEach( aJson => {
            agingDeck.push( new AgingCard(aJson.name, aJson.strength, aJson.power, aJson.level) )
        })
        let agingDiscard:Array<AgingCard> = [];
        state._agingDeck.arrayDiscard.forEach( aJson => {
            agingDiscard.push( new AgingCard(aJson.name, aJson.strength, aJson.power, aJson.level) )
        })
        
        // Fight
        let fight: Fight = null;        
        if(state._fight) {
            let cardToFight:DangerCard|PirateCard;
            if( state._fight.cardToFight.fightCard) {
                let dcJson = state._fight.cardToFight;
                let fcJson = dcJson.fightCard;
                let fightCard = new FightCard(fcJson.name, fcJson.strength, fcJson.power, fcJson.powerUsed, fcJson.toDestroyAtEndOfFight)
                cardToFight = new DangerCard(fightCard, dcJson.name, dcJson.freeCards);
            }
            else {
                let pJson = state._fight.cardToFight; 
                cardToFight = new PirateCard(pJson.name, pJson.strength, pJson.mission, pJson.freeCards)         
            }
            let arrayFightCard: Array<PlayableCard> = [];
            state._fight.arrayFightCard.forEach( (pcJson:playableCardHistoryJson) => {
                let cardToAdd: PlayableCard;
                if(pcJson.level){
                    cardToAdd = new AgingCard(pcJson.name, pcJson.strength, <AgingCardPower>pcJson.power, pcJson.level, pcJson.powerUsed, pcJson.toDestroyAtEndOfFight, { strength : pcJson.initialState.strength, power : pcJson.initialState.power})
                }
                else{
                    cardToAdd = new FightCard(pcJson.name, pcJson.strength, <FightCardPower>pcJson.power, pcJson.powerUsed, pcJson.toDestroyAtEndOfFight, { strength : pcJson.initialState.strength, power : pcJson.initialState.power})                
                }
                arrayFightCard.push(cardToAdd);
            })
            let arrayFightCardUsed: Array<PlayableCard> = [];
            state._fight.arrayFightCardUsed.forEach( (pcJson:playableCardHistoryJson) => {
                let cardToAdd: PlayableCard;
                if(pcJson.level){
                    cardToAdd = new AgingCard(pcJson.name, pcJson.strength, <AgingCardPower>pcJson.power, pcJson.level, pcJson.powerUsed, pcJson.toDestroyAtEndOfFight, { strength : pcJson.initialState.strength, power : pcJson.initialState.power})
                }
                else{
                    cardToAdd = new FightCard(pcJson.name, pcJson.strength, <FightCardPower>pcJson.power, pcJson.powerUsed, pcJson.toDestroyAtEndOfFight, { strength : pcJson.initialState.strength, power : pcJson.initialState.power})                
                }
                arrayFightCardUsed.push(cardToAdd);
            })
            let finished : boolean = state._fight.finished;
            let costOfCardsNotFree : number = state._fight.costOfCardsNotFree;
            let freeCards : number = state._fight.freeCards;
            let level:GameLevel = state._fight.level;
            if( cardToFight instanceof DangerCard ){
                fight = new DangerFight(cardToFight, level, arrayFightCard, arrayFightCardUsed, finished, freeCards); 
            }
            if( cardToFight instanceof PirateCard) {
                fight = new PirateFight(cardToFight, freeCards, costOfCardsNotFree, arrayFightCard, arrayFightCardUsed, finished);
            }
        }

        // Global discard
        let arrayOfRemovedCards:Array<PlayableCard> = [];
        state._arrayOfRemovedCards.forEach( pcJson => {
            let cardToAdd: PlayableCard;
            if(pcJson.level){
                cardToAdd = new AgingCard(pcJson.name, pcJson.strength, <AgingCardPower>pcJson.power, pcJson.level, pcJson.powerUsed, pcJson.toDestroyAtEndOfFight)
            }
            else{
                cardToAdd = new FightCard(pcJson.name, pcJson.strength, <FightCardPower>pcJson.power, pcJson.powerUsed, pcJson.toDestroyAtEndOfFight)                
            }
            arrayOfRemovedCards.push(cardToAdd);
        })

        //dangerChoiceCards 
        let dangerChoiceCards:Array<DangerCard> = null;
        if(state._dangerChoiceCards !== null){
            dangerChoiceCards = [];
            state._dangerChoiceCards.forEach( dcJson => {
                let fcJson = dcJson.fightCard;
                let fightCard = new FightCard(fcJson.name, fcJson.strength, fcJson.power, fcJson.powerUsed, fcJson.toDestroyAtEndOfFight)
                dangerChoiceCards.push( new DangerCard(fightCard, dcJson.name, dcJson.freeCards));
            })
        }

        let newGame = new Game(
                        p, 
                        state._difficulty, 
                        new FightDeck(fightDeck, fightDiscard), 
                        new DangerDeck(dangerDeck, dangerDiscard), 
                        new AgingDeck(state._difficulty, agingDeck, agingDiscard), 
                        new PirateDeck(pirateDeck, pirateDiscard),
                        state._gameOver,
                        state._level, 
                        arrayOfRemovedCards, 
                        fight, 
                        dangerChoiceCards, 
                        state._nbPiratesToFight,
                        state._startDate,
                        state._lastChangeDate
                    );

        this.game = newGame
        
    }

    getStateFromAction( action: GameStateAction){
        switch (action) {
            case GameStateAction.REDO:
                return localStorage.getItem('save');
            case GameStateAction.UNDO:
                return localStorage.getItem('save');
        }
    }

    getStateFromKey( key:string){
        
    }

    get game(){
        return this._game;
    }
    set game(newgame){
        this._game = newgame
    }
}

export { GameStateManager }