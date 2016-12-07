import {Card} from './Card'
import {PirateCard} from './PirateCard'
import {DangerCard} from './DangerCard'

export enum AgingLevel {
    Uncomfortable = 1,
    Evil = 2
}

export enum PirateMission {
    EachCardGiveOneFightPoint,
    KeepOnlyHalfCards,
    EachPayedCardCostTwo,
    AddTwoDangerPointByAgingCardInFigthAddToFightDeck,
    FightAllDangerCards
}

export enum FightCardPower{
    CopyOne,
    GetOnePV,
    GetTwoPV,
    GetOneCard,
    GetTwoCard,
    PreviousPhase,
    SwapOne,
    SwapTwo,
    Destroy,
    Double,
    UnderTheDeck,
    SortThreeCards
}

export enum PlayableCardPowerType {
    ONE_SHOT,
    TWO_STEP,
    AUTOMATIC
}

export enum AgingCardPower {
    LoseOnePV,
    LoseTwoPV,
    Stop,
    MaxEqualsZero
}

export enum GameDifficulty {
    EASY,
    MEDIUM,
    HARD,
    NORMAL
}

export enum GameLevel {
    FirstRound,
    SecondRound,
    ThirdRound
}

export enum GameStep {
    Dangers,
    Pirates
}

export interface PlayerInterface {
    pseudo:string
    PV:number
    addPV(nbPV:number):void
    losePV(nbPV:number):void
    isDead():void
}

export interface CardInterface{
    name: string
    strength : number
    show():void
}

export interface PlayableCardInterface extends CardInterface {
    costToDelete : number,
    power        : FightCardPower|AgingCardPower|null
}

// export interface CardToFightInterface extends CardInterface {
//     power        : FightCardPower|AgingCardPower|null
// }

export interface PirateCardInterface {
    id		  :	  number
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
}

export interface DangerCardInterface {
    fightCard  : FightCardInterface
    name : string
    freeCards : number
}

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

export interface jsonDataPirate {
    id		  :	  number
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
