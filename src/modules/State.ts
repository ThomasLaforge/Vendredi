import { Game } from './Game'
import { GameSaveState /*, RobinsonJson */ } from './Vendredi'

class State /*implements GameSaveState*/ {
    constructor(gameStateJson:any){}

    buildGame(){
        let newGame : Game;
        return newGame;
    }
}

export {State}