import { Fight } from './Fight';
import {PirateCard} from './PirateCard';
import {DangerCard} from './DangerCard';
import {DangerDeck} from './DangerDeck';
import {PirateFightInterface, PirateMission, GameLevel } from './Vendredi';
/* 
Powers :
- Chaque carte piochée coûte deux points de vie au lieu d'un 
- Le PirateCard à autant de force que deux fois le nombre de cartes de Vieillissement que vous avez ajouté dans votre deck au cours de la partie. La force du pirate est déterminée au début du combat et ne change pas si vous rajoutez des cartes de Vieillissement pendant le combat 
- Affrontez le reste de l'île: prenez toutes les cartes Périls restant dans la défausse, faites la somme des cartes gratuites pour savoir combien vous pouvez piocher de cartes gratuitement, et la somme des chiffres rouges pour avoir la force de l'ennemi 
- Chacune des cartes piochées à +1 de force 
- Seule la moitié des cartes piochées est compté pour la combat

*/

class PirateFight extends Fight implements PirateFightInterface {
    constructor( card : PirateCard , public costOfCardsNotFree: number = 1, public remainingDangerDeck?: DangerDeck, numberOfAgingCardInFightDeck?: number){
        super(card);
    }

    getPlayerForce(){
        let playerForce = 0;
        
        if( this.cardToFight.mission === PirateMission.EACH_CARD_GIVE_ONE_FIGHT_POINT ){
            playerForce = super.getPlayerForce();
            // Comment j'interprete cette règle:
            // On rajoute un point par carte à la fin du combat
            // On pourrait se dire que c'est l'ensemble des cartes piochées pendant le combat
            // Dans ce cas, les cartes échangées (donc remis dans la pioche rapporterai un point)
            // Du coup, une carte peut rapporter deux points en étant piochée, échangée et rejouée plus tard.
            playerForce += this.getAllFightCards().length;
        }
        else if( this.cardToFight.mission === PirateMission.ONLY_KEEP_HALF_CARDS ){
            let powersToApplyAnswer = this.getPowersToApplyOnPlayerForce();
            let nbCardToDouble = powersToApplyAnswer.nbCardToDouble;
            let offsetCauseMaxCardEqualsZero = powersToApplyAnswer.offsetMaxEqualsZero;
            let arrCardsToKeep = this.getAllFightCards().sort( (a, b) => {return b.strength - a.strength });

            // Comment j'interprete cette règle:
            // Supprime les premiers éléments qui sont égaux à 0.
            // Puis seulement après on applique la séparation en deux et on ne garde que les premières cartes.
            // Puis on double les plus grosses cartes restantes
            arrCardsToKeep.splice(0, offsetCauseMaxCardEqualsZero);
            let midOfArr = Math.fround(arrCardsToKeep.length / 2);
            arrCardsToKeep.splice( midOfArr, arrCardsToKeep.length - midOfArr );
            arrCardsToKeep.forEach( playableCard => {
                playerForce += playableCard.strength;
            });

            if(nbCardToDouble > 0 && nbCardToDouble < arrCardsToKeep.length){
                for(let i = 0; i < nbCardToDouble;i++){
                    playerForce += arrCardsToKeep[i].strength;
                }
            }
        }
        else {
            playerForce = super.getPlayerForce();
        }

        return playerForce;
    }

    getStrengthCardToFight(){
        let nbAgingCardUsed = 0;
        let res = 0;
        if(this.cardToFight.strength != null){
            res = this.cardToFight.strength;
        }
        
        if(this.cardToFight.mission != null){
            switch (this.cardToFight.mission) {
                case PirateMission.FIGHT_ALL_DANGER_CARDS:
                    this.remainingDangerDeck.arrayDeck.forEach( (danger) => {res += danger.getStrength(GameLevel.THIRD_ROUND)});
                    // Fight all cards => 0. No instructions cause res already equal to 0
                case PirateMission.ADD_TWO_DANGER_POINT_BY_AGING_CARD_IN_FIGHT_ADDED_TO_FIGHT_DECK:
                    res += 2 * nbAgingCardUsed;
                    break;
            }
        }
        return res;
    }

}

export { PirateFight }
