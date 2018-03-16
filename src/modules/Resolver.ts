import { Game } from "./Game";
import * as _ from 'lodash'
/**
 * Resolver of Vendredi Game
 */

/**
 * Recherche dans l'arbre du jeu les solutions possibles
 */

 export class Resolver {

    private results: any[]

    constructor(){}

    /**
     * 
     * @param step = step is Draw one of two cards and resolve it
     */
    getDecisionTree(gameCopy: Game, steps = 1){
        if(steps === 0){
            return { arbre: 0}
        }

        let newGameCopy = _.cloneDeep(gameCopy)
        
        // recursif
        return this.getDecisionTree(newGameCopy, steps - 1)
    }

    getStepDecisionTree(gameCopy: Game){
        
    }

 }