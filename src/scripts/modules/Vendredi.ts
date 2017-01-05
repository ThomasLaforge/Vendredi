import {Card} from './Card'
import {PirateCard} from './PirateCard'
import {DangerCard} from './DangerCard'

// Notice : in enum, initial index = 0. Could create some bug on typescript compilator like in switch/case. Start from 1 seems to fix it
export enum GameStateAction {
    UNDO,
    REDO,
    LAST_SAVE,
    LAST_GAME
}

export enum AgingLevel {
    UNCOMFORTABLE = 1,
    EVIL = 2
}

export enum PirateMission {
    EACH_CARD_GIVE_ONE_FIGHT_POINT,
    ONLY_KEEP_HALF_CARDS,
    EACH_PAYED_CARD_COST_TWO,
    ADD_TWO_DANGER_POINT_BY_AGING_CARD_IN_FIGHT_ADDED_TO_FIGHT_DECK,
    FIGHT_ALL_DANGER_CARDS
}

export enum FightCardPower{
    COPY_ONE = 1,
    GET_ONE_PV,
    GET_TWO_PV,
    GET_ONE_CARD,
    GET_TWO_CARDS,
    PREVIOUS_PHASE,
    SWAP_ONE,
    SWAP_TWO,
    DESTROY,
    DOUBLE,
    UNDER_THE_DECK,
    SORT_THREE_CARDS
}

export enum PlayableCardPowerType {
    ONE_SHOT,
    TWO_STEP,
    AUTOMATIC
}

export enum AgingCardPower {
    LOSE_ONE_PV,
    LOSE_TWO_PV,
    STOP,
    MAX_EQUALS_ZERO
}

export enum GameDifficulty {
    EASY,
    MEDIUM,
    HARD,
    NORMAL
}

export enum GameLevel {
    FIRST_ROUND,
    SECONDE_ROUND,
    THIRD_ROUND
}

export enum GameStep {
    DANGERS,
    PIRATES
}

export interface PlayerInterface {
    pseudo:string
    PV:number
    addPV(nbPV:number):void
    losePV(nbPV:number):void
    isDead():void
}

// Cards
export interface CardInterface{
    name: string
    strength : number
    show():void
}

export interface PlayableCardInterface extends CardInterface {
    costToDelete : number
    power        : FightCardPower|AgingCardPower|null
    powerUsed    : boolean
    id           : string
}

export interface PirateCardInterface {
    name      :   string
    strength  :   number
    mission   :   PirateMission|null
    freeCards :   number
}

export interface AgingCardInterface extends PlayableCardInterface{
    power    : AgingCardPower|null
    level    : AgingLevel
}

export interface FightCardInterface extends PlayableCardInterface {
	power   : FightCardPower|null
    toDestroyAtEndOfFight: boolean
}

export interface DangerCardInterface {
    fightCard  : FightCardInterface
    name : string
    freeCards : number
}

// Decks
export interface DeckInterface {
    
}

// Fights
export interface FightInterface {
    cardToFight: PirateCard|DangerCard
    arrayFightCard:Array<Card>
    finished: boolean
}

export interface PirateFightInterface extends FightInterface {
    cardToFight: PirateCard
}

export interface DangerFightInterface extends FightInterface {
    cardToFight: DangerCard
}

// Cards Data
export interface jsonDataPirate {
    name      :   string
    strength  :   number
    mission   :   string|null
    freeCards :   number
}

export interface jsonDataAging {
    name     : string,
    power    : string|null,
    strength : number,
    level    : number,
    number   : number
}

export interface jsonDataDanger {
    fight : {
        name      : string,
        strength  : number,
        power     : string|null
    },
    danger : {
        name      : string,
        freeCards : number
    },
    number : number
}

export interface jsonDataFight {
    name     : string,
    strength : number,
    power    : string|null,
    number   : number
}

// History : Automatic generation using vs code pluggin "json to type" to finalize
export interface playerHistoryJson extends PlayerInterface {}

export interface playableCardHistoryJson extends PlayableCardInterface {
    power:FightCardPower|AgingCardPower
    level?:AgingLevel
    toDestroyAtEndOfFight:boolean
}

export interface fightDeckHistoryJson {
   arrayDeck: Array<playableCardHistoryJson>;
   arrayDiscard: Array<playableCardHistoryJson>;
}

export interface fightCardHistoryJson extends playableCardHistoryJson{
}

export interface _dangerDeckType {
   arrayDeck: Array<arrayDeckItemType>;
   arrayDiscard: Array<arrayDiscardItemType>;
}

export interface _agingDeckType {
   arrayDeck: Array<arrayDeckItemType>;
   arrayDiscard: Array<arrayDiscardItemType>;
}

export interface _pirateDeckType {
   arrayDeck: Array<arrayDeckItemType>;
   arrayDiscard: Array<arrayDiscardItemType>;
}

export interface _piratesItemType {
   name: string;
   strength: number;
   id: number;
   mission: number;
   freeCards: number;
}

export interface _actualPirateType {
}

export interface _arrayOfRemovedCardsItemType {
}

export interface _fightType {
}

export interface _dangerChoiceCardsItemType {
   fightCard: fightCardType;
   name: string;
   freeCards: number;
}

export interface GameSaveStateState {
   _player: playerHistoryJson;
   _difficulty: number;
   _fightDeck: fightDeckHistoryJson;
   _dangerDeck: any;
   _agingDeck: any;
   _pirateDeck: any;
   _gameOver: boolean;
   _level: number;
   _arrayOfRemovedCards: Array<any>;
   _fight: any;
   _dangerChoiceCards: Array<any>;
   _nbPiratesToFight: number;
}
