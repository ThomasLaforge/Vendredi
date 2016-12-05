// Jquery et bootstrap
// var bootstrap = require('bootstrap/dist/js/bootstrap');

// Model
import { Game 	}         from	'./modules/Game';
import { Player }         from	'./modules/Player';
import { UserInterface }  from	'./modules/UserInterface';
import { DangerFight }  from	'./modules/DangerFight';

let pseudo   = 'Thomas';
let myPlayer = new Player(pseudo);
let game     = new Game(myPlayer, 1);

// Vue
import { dangerCard } from './Vue/dangerCard';
import { pirateCard } from './Vue/pirateCard';
import { playableCard } from './Vue/playableCard';
import { gameInfo } from './Vue/gameInfo';
import { gameDangerChoice } from './Vue/gameDangerChoice';
import { gameFight } from './Vue/gameFight';
import { gameOver } from './Vue/gameOver';

let app = new Vue({
    el: '#app',
    data: () => {
        return {
            game : game,
            dangerChoice : game.dangerChoiceCards,
            fight : game.fight
        }
    },
    components:{
        gameInfo,
        gameDangerChoice,
        gameFight,
        gameOver
    },
    methods: {
        startFight(index){
            game.startFight(this.dangerChoice[index]);
        },
        reset(){
            console.log('reset fight and draw cards or pirate')
            game.drawDangerCard();
        },
        addCardToFight(){
            game.addCardToFight();
        }
    }
})