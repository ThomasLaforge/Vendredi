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
    CopyTwo,
    GetOnePV,
    GetTwoPV,
    LoseOnePV,
    LoseTwoPV,
    GetOneCard,
    GetTwoCard

}

export enum AgingCardPower{

}

export enum DangerCardPower{

}

export enum GameDifficulty{
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
    draw(nodeDom:string):void
    show():void
}

export interface PlayableCardInterface extends CardInterface {
    costToDelete:number
}

export interface PirateCardInterface {
    id		  :	  number
    mission   :   PirateMission|null
    freeCards :   number
}

export interface AgingCardInterface extends PlayableCardInterface{
    power    : AgingCardPower|null
    level    : AgingLevel
}

export interface FightCardInterface extends PlayableCardInterface{
	power   : FightCardPower|null
}

export interface DangerCardInterface {
    fightCard  : FightCardInterface
    name : string
    freeCards : number
}

export interface FightInterface {
    cardToFight: any
    arrayFightCard:Array<Card>
    finished: boolean
}

export interface PirateFightInterface {
    cardToFight: PirateCard
}