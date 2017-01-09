import { Fight } from './Fight';
import { AgingDeck } from './AgingDeck';
import {PirateCard} from './PirateCard';
import {PlayableCard} from './PlayableCard';
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
    constructor( 
        cardToFight : PirateCard , 
        costOfCardsNotFree = 1,
        arrayFightCard : Array<PlayableCard> = [], 
        arrayFightCardUsed : Array<PlayableCard> = [], 
        finished : boolean = false,
        _freeCards: number = cardToFight.freeCards,
    ){
        super(cardToFight, arrayFightCard, arrayFightCardUsed, finished, costOfCardsNotFree);
    }

    getPlayerForce(){
        let playerForce = super.getPlayerForce();
        
        if( this.cardToFight.mission === PirateMission.EACH_CARD_GIVE_ONE_FIGHT_POINT ){
            // Comment j'interprete cette règle:
            // On rajoute un point par carte à la fin du combat
            // On pourrait se dire que c'est l'ensemble des cartes piochées pendant le combat
            // Dans ce cas, les cartes échangées (donc remis dans la pioche rapporterai un point)
            // Du coup, une carte peut rapporter deux points en étant piochée, échangée et rejouée plus tard.
            playerForce += this.getAllCards().length;
        }
        
        if( this.cardToFight.mission === PirateMission.ONLY_KEEP_HALF_CARDS ){
            // TODO : Refactor using super.getPlayerForce who is in playerForce var. And then sub cards that are on second half of played card
            // Keep in mind the fact that aging cards must stay
            let powersToApplyAnswer = this.getPowersToApplyOnPlayerForce();
            let nbCardToDouble = powersToApplyAnswer.nbCardToDouble;
            let offsetCauseMaxCardEqualsZero = powersToApplyAnswer.offsetMaxEqualsZero;
            let arrCardsToKeep = this.getAllCards().sort( (a, b) => {return b.strength - a.strength });

            // Comment j'interprete cette règle:
            // Supprime les premiers éléments qui sont égaux à 0.
            // Puis seulement après on applique la séparation en deux et on ne garde que les premières cartes.
            // Puis on double les plus grosses cartes restantes
            arrCardsToKeep.splice(0, offsetCauseMaxCardEqualsZero);
            let midOfArr = Math.round(arrCardsToKeep.length / 2);
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

        return playerForce;
    }

    getStrengthCardToFight(){
        if(this.cardToFight.strength === null){
            throw new Error('no strength for this pirate. No cards with this particularity');
        }

        return this.cardToFight.strength;
    }

}

export { PirateFight }
