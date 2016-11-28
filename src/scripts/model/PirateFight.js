import { Fight } from './Fight';

/* 
Powers :
- Chaque carte piochée coûte deux points de vie au lieu d'un 
- Le PirateCard à autant de force que deux fois le nombre de cartes de Vieillissement que vous avez ajouté dans votre deck au cours de la partie. La force du pirate est déterminée au début du combat et ne change pas si vous rajoutez des cartes de Vieillissement pendant le combat 
- Affrontez le reste de l'île: prenez toutes les cartes Périls restant dans la défausse, faites la somme des cartes gratuites pour savoir combien vous pouvez piocher de cartes gratuitement, et la somme des chiffres rouges pour avoir la force de l'ennemi 
- Chacune des cartes piochées à +1 de force 
- Seule la moitié des cartes piochées est compté pour la combat

*/

class PirateFight extends Fight {
    constructor( card ){
        super(card);
    }

    getPlayerForce(){
        let playerForce = 0;
        
        if( this.cardToFight.id == 6 ){

        }
        else if( this.cardToFight.id == 9 ){
            
        }
        else {
            playerForce = super();
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
            switch (this.cardToFight.id) {
                case 0:
                    res = -1;
                    // Fight all cards => 0. No instructions cause res already equal to 0
                case 1:
                    res = 2 * nbAgingCardUsed;
                    break;
                case 4:

                    break;
                default:
                    break;
            }
        }
        return res;
    }

}

export { PirateFight }
