// Jquery et bootstrap
// var bootstrap = require('bootstrap/dist/js/bootstrap');

// Model
import { Game 	}         from	'./modules/Game';
import { Player }         from	'./modules/Player';
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
        }
    },
    components:{
        gameInfo,
        gameDangerChoice,
        gameFight,
        gameOver
    },
    methods: {
        addCardToFight(){
            this.game.addCardToFight();
        },
        startFight(index){
            this.game.startFight(this.game.dangerChoiceCards[index]);
        },
        stopFight(){
            this.game.stopFight();
            console.log(this.game)
        },
        endFightLost(arrOfCardsToDelete){
            this.game.endFightLost(arrOfCardsToDelete);
            console.log(this.game)
        },
        useMyPower(card){
            console.log('game : usePower')
            this.game.usePower(card)
        }
    }
})