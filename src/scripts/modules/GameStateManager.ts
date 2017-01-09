import {GameSaveStateState, AgingCardPower, FightCardPower, GameStateAction} from './Vendredi';
import {Game} from './Game';
import {Fight} from './Fight'
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
import * as CircularJSON from 'circular-json';

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
        stateToSave = CircularJSON.stringify(_.clone(this._game));
        console.log('saving game state', stateToSave);
        try {
            localStorage.setItem('save', stateToSave);
        } catch(domException) {
            if (domException.name === 'QuotaExceededError' ||
                domException.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                // Fallback code comes here.
            }
        }
        return stateToSave;
    }

    load(gameSaveStateJson : string) : Game {
        gameSaveStateJson = localStorage.getItem('save');
        console.log('loading game state', gameSaveStateJson);

        let state : GameSaveStateState = CircularJSON.parse(gameSaveStateJson);
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
            fightDeck.push(cardToAdd)
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
            dangerDeck.push( new DangerCard(fightCard, dcJson.name, dcJson.freeCards) )
        })                      
        let pirateDeck:Array<PirateCard> = [];
        state._pirateDeck.arrayDeck.forEach( pJson => {
            pirateDeck.push( new PirateCard(pJson.name, pJson.strength, pJson.mission, pJson.freeCards) )
        })
        let agingDeck:Array<AgingCard> = [];
        state._agingDeck.arrayDeck.forEach( aJson => {
            agingDeck.push( new AgingCard(aJson.name, aJson.strength, aJson.power, aJson.level) )
        })
        let fight:Fight;
        cardToFight
        costOfCardsNotFree
        arrayFightCard
        finished
        _freeCards
        level

        let arrayOfRemovedCards:Array<PlayableCard> = [];
        let dangerChoiceCards:Array<DangerCard> = [];

        let newGame = new Game(p, state._difficulty, 
                        new FightDeck(fightDeck, fightDiscard), 
                        new DangerDeck(dangerDeck, dangerDiscard), 
                        new AgingDeck(state._difficulty, agingDeck, []), 
                        new PirateDeck(pirateDeck, []),
                        state._gameOver, state._level, arrayOfRemovedCards, fight, dangerChoiceCards, state._nbPiratesToFight
                    );

        return newGame
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