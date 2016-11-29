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

export interface PirateInterface {
    id		  :	  number,
    name      :   string,
    strength  :   number|null,
    mission   :   PirateMission|null,
    freeCards :   number
}

export interface AgingCardInterface {
    name     : string,
    power    : AgingCardPower|null,
    strength : 4,
    level    : AgingLevel,
    number   : number
}

export interface FightCardInterface {
	name    : string,
	strength: number,
	power   : FightCardPower|null,
    number? : number
}

export interface DangerCardInterface {
    fight  : FightCardInterface,
    danger : {
        name      : string
        freeCards : number
    },
    number: number
}