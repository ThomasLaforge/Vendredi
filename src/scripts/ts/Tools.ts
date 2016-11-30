import {Card} from './Card';
import {FightCardPower, AgingCardPower, PirateMission} from './Vendredi';

class Tools {
    constructor(){}
    
    static getRandomIndexofArray(arr:Array<any>){
        return Math.floor(Math.random() * (0 + arr.length -1));
    }
    
    static shuffle(array : Array<Card>){
        if(array){
            var currentIndex = array.length, temporaryValue:Card, randomIndex:number ;
            
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                
                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
        }
    }

    static getFightPowerFromString(powerName : string) : FightCardPower|null {
        switch (powerName) {
            case '+1PV': return FightCardPower.GetOnePV;
            case '+2PV': return FightCardPower.GetTwoPV;
            case 'Copier x1': return FightCardPower.CopyOne;
            case 'Copier x2': return FightCardPower.CopyTwo;
            case 'Phase -1': return FightCardPower.PreviousPhase;
            case 'Echanger x1': return FightCardPower.SwapOne;
            case 'Echanger x2': return FightCardPower.SwapTwo;
            case 'Détruire': return FightCardPower.Destroy ;
            case '+1 Cartes': return FightCardPower.GetOneCard ;
            case '+2 Cartes': return FightCardPower.GetTwoCard ;
            case 'Doubler': return FightCardPower.Double ;
            case 'Trier 3 cartes': return FightCardPower.SortThreeCards ;
            case 'Sous la pioche': return FightCardPower.UnderTheDeck ;        
            default: return null;
        }
    }

    static getAgingPowerFromString(powerName : string) : AgingCardPower|null {
        switch (powerName) {
            case '-1PV': return AgingCardPower.LoseOnePV;
            case '-2PV': return AgingCardPower.LoseTwoPV;
            case 'La carte la plus forte = 0': return AgingCardPower.MaxEqualsZero;
            case 'Stop': return AgingCardPower.Stop; 
            default: return null;
        }
    }
    
    static getPirateMissionFromString(missionName : string) : PirateMission {
        switch (missionName) {
            case 'Chaque carte Combat dévoilée donne +1 point de combat': return PirateMission.EachCardGiveOneFightPoint;
            case 'Comptez uniquement la moitié des cartes Combat dévoilées (les cartes Vieillissement dévoilées doivent être comptées)': return PirateMission.KeepOnlyHalfCards;
            case 'Chaque carte Combat supplémentaire coute 2 points de santé': return PirateMission.EachPayedCardCostTwo;
            case 'Ajoutez 2 points de danger par carte vieillissement ajoutée à votre pile Combat': return PirateMission.AddTwoDangerPointByAgingCardInFigthAddToFightDeck; 
            case 'Combattez toutes les cartes Danger restantes': return PirateMission.FightAllDangerCards; 
            default: return null;
        }
    }
}

export {Tools}