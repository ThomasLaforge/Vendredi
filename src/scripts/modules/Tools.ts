import {Card} from './Card';
import {FightCard} from './FightCard';
import {DangerCard} from './DangerCard';
import {PlayableCard} from './PlayableCard';
import {PlayableCardPowerType, FightCardPower, AgingCardPower, PirateMission} from './Vendredi';

class Tools {
    constructor(){}
    
    static getRandomIndexofArray(arr:Array<any>){
        return Math.floor(Math.random() * (0 + arr.length -1));
    }

    static getFightPowerFromString(powerName : string) : FightCardPower|null {
        switch (powerName) {
            case '+1PV': return FightCardPower.GET_ONE_PV;
            case '+2PV': return FightCardPower.GET_TWO_PV;
            case 'Copier x1': return FightCardPower.COPY_ONE;
            case 'Phase -1': return FightCardPower.PREVIOUS_PHASE;
            case 'Echanger x1': return FightCardPower.SWAP_ONE;
            case 'Echanger x2': return FightCardPower.SWAP_TWO;
            case 'Détruire': return FightCardPower.DESTROY;
            case '+1 Cartes': return FightCardPower.GET_ONE_CARD;
            case '+2 Cartes': return FightCardPower.GET_TWO_CARDS;
            case 'Doubler': return FightCardPower.DOUBLE;
            case 'Trier 3 cartes': return FightCardPower.SORT_THREE_CARDS;
            case 'Sous la pioche': return FightCardPower.UNDER_THE_DECK;        
            default: return null;
        }
    }

    static getFightPowerName(power : FightCardPower|null) : string {
        // console.log(power)
        switch (power) {
            case FightCardPower.GET_ONE_PV: return  '+1PV' ;
            case FightCardPower.GET_TWO_PV: return  '+2PV' ;
            case FightCardPower.COPY_ONE: return  'Copier x1' ;
            case FightCardPower.PREVIOUS_PHASE: return  'Phase -1'; 
            case FightCardPower.SWAP_ONE: return  'Echanger x1' ;
            case FightCardPower.SWAP_TWO: return  'Echanger x2' ;
            case FightCardPower.DESTROY: return  'Détruire' ;
            case FightCardPower.GET_ONE_CARD: return  '+1 Cartes' ;
            case FightCardPower.GET_TWO_CARDS: return  '+2 Cartes' ;
            case FightCardPower.DOUBLE: return  'Doubler' ;
            case FightCardPower.SORT_THREE_CARDS: return  'Trier 3 cartes' ;
            case FightCardPower.UNDER_THE_DECK: return  'Sous la pioche' ;        
            default: return '';
        }
    }

    static getAgingPowerFromString(powerName : string) : AgingCardPower|null {
        switch (powerName) {
            case '-1PV': return AgingCardPower.LOSE_ONE_PV;
            case '-2PV': return AgingCardPower.LOSE_TWO_PV;
            case 'La carte la plus forte = 0': return AgingCardPower.MAX_EQUALS_ZERO;
            case 'Stop': return AgingCardPower.STOP; 
            default: return null;
        }
    }

    static getAgingPowerName(powerName : AgingCardPower|null) : string {
        switch (powerName) {
            case AgingCardPower.LOSE_ONE_PV: return  '-1PV';
            case AgingCardPower.LOSE_TWO_PV: return  '-2PV';
            case AgingCardPower.MAX_EQUALS_ZERO: return  'La carte la plus forte = 0';
            case AgingCardPower.STOP: return  'Stop'; 
            default: return '';
        }
    }
    
    static getPirateMissionFromString(missionName : string) : PirateMission {
        switch (missionName) {
            case 'Chaque carte Combat dévoilée donne +1 point de combat': return PirateMission.EACH_CARD_GIVE_ONE_FIGHT_POINT;
            case 'Comptez uniquement la moitié des cartes Combat dévoilées (les cartes Vieillissement dévoilées doivent être comptées)': return PirateMission.ONLY_KEEP_HALF_CARDS;
            case 'Chaque carte Combat supplémentaire coute 2 points de santé': return PirateMission.EACH_PAYED_CARD_COST_TWO;
            case 'Ajoutez 2 points de danger par carte vieillissement ajoutée à votre pile Combat': return PirateMission.ADD_TWO_DANGER_POINT_BY_AGING_CARD_IN_FIGHT_ADDED_TO_FIGHT_DECK; 
            case 'Combattez toutes les cartes Danger restantes': return PirateMission.FIGHT_ALL_DANGER_CARDS; 
            default: return null;
        }
    }

    static getPirateMissionName(missionName : PirateMission) : string {
        switch (missionName) {
            case PirateMission.EACH_CARD_GIVE_ONE_FIGHT_POINT : return  'Chaque carte Combat dévoilée donne +1 point de combat' ;
            case PirateMission.ONLY_KEEP_HALF_CARDS : return  'Comptez uniquement la moitié des cartes Combat dévoilées (les cartes Vieillissement dévoilées doivent être comptées)';
            case PirateMission.EACH_PAYED_CARD_COST_TWO : return  'Chaque carte Combat supplémentaire coute 2 points de santé' ;
            case PirateMission.ADD_TWO_DANGER_POINT_BY_AGING_CARD_IN_FIGHT_ADDED_TO_FIGHT_DECK : return  'Ajoutez 2 points de danger par carte vieillissement ajoutée à votre pile Combat' ; 
            case PirateMission.FIGHT_ALL_DANGER_CARDS : return  'Combattez toutes les cartes Danger restantes' ; 
            default: return '';
        }
    }

    static getTotalCostToDelete(arrCardsToDelete: Array<PlayableCard>) : number {
        let sum = 0;

        arrCardsToDelete.forEach( (card : PlayableCard) => {
            sum += card.costToDelete;
        });
        
        return sum;
    }

    static getTypeOfPower(card:PlayableCard) : PlayableCardPowerType {
        let type: PlayableCardPowerType;
        let p:FightCardPower|AgingCardPower = card.power;

        if(card instanceof FightCard){
            if(
                p === FightCardPower.COPY_ONE || 
                p === FightCardPower.SWAP_ONE || 
                p === FightCardPower.SWAP_TWO || 
                p === FightCardPower.DESTROY || 
                p === FightCardPower.UNDER_THE_DECK || 
                p === FightCardPower.SORT_THREE_CARDS 
            ){
                type = PlayableCardPowerType.TWO_STEP
            }
            else if(
                p === FightCardPower.PREVIOUS_PHASE || 
                p === FightCardPower.DOUBLE 
            ){
                type = PlayableCardPowerType.AUTOMATIC
            }
            else if(
                p === FightCardPower.GET_ONE_PV || 
                p === FightCardPower.GET_TWO_PV || 
                p === FightCardPower.GET_ONE_CARD || 
                p === FightCardPower.GET_TWO_CARDS
            ){
                type = PlayableCardPowerType.ONE_SHOT
            }
            else{
                console.log('Type for this power card not referenced')
            }
        }
        else{
            if(
                p === AgingCardPower.MAX_EQUALS_ZERO
            ){
                type = PlayableCardPowerType.AUTOMATIC
            }
            else if(
                p === AgingCardPower.LOSE_ONE_PV ||   
                p === AgingCardPower.STOP ||   
                p === AgingCardPower.LOSE_TWO_PV   
            ){
                type = PlayableCardPowerType.ONE_SHOT
            }
            else{
                console.log('Type for this power card not referenced')
            }
        }

        return type;
    }

    // static getPowerName(power:FightCardPower|AgingCardPower): string {
    //     if (FightCardPower instanceof power) { console.log(power); return this.getFightPowerName(power)};
    //     if (typeof power === "AgingCardPower") { return this.getAgingPowerName(power)};
    // }
}

export {Tools}