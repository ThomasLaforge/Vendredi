// Jquery et bootstrap
// var bootstrap = require('bootstrap/dist/js/bootstrap');

// Model
import { Game 	}         from	'./modules/Game';
import { Player }         from	'./modules/Player';
import { PlayableCard }   from	'./modules/PlayableCard';
import { FightCard }   from	'./modules/FightCard';
import { FightCardPower }   from	'./modules/Vendredi';
let pseudo   = 'Thomas';
let myPlayer = new Player(pseudo);
let game     = new Game(myPlayer, 1);
let newFC = new FightCard("Stratégie", 2, FightCardPower.SWAP_ONE);
game.fightDeck.addCard(newFC);

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
            this.game.addPlayableCardToFight();
        },
        startFight(index:number){
            this.game.startFight(this.game.dangerChoiceCards[index]);
        },
        stopFight(){
            this.game.stopFight();
            console.log(this.game)
        },
        endFightLost(arrOfCardsToDelete:Array<PlayableCard>){
            this.game.endFightLost(arrOfCardsToDelete);
            console.log(this.game)
        },
        useMyPower(card:FightCard){
            console.log('game : usePower')
            this.game.usePower(card)
        }
    }
})