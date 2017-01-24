// Libraries
    // let bootstrap = require('bootstrap/dist/js/bootstrap');
    import * as _ from 'lodash'

// Model
    import { Game 	}           from './modules/Game';
    import { PlayableCard }     from './modules/PlayableCard';
    import { FightCard }        from './modules/FightCard';
    import { FightCardPower }   from './modules/Vendredi';
    import { GameSaveManager } from './modules/GameSaveManager';
    let newGame  = new Game();
    let gsm      = new GameSaveManager(newGame)

// Game Config
    newGame.level = 2
// Vue
    import { dangerCard }       from './Vue/dangerCard';
    import { pirateCard }       from './Vue/pirateCard';
    import { playableCard }     from './Vue/playableCard';
    import { gameInfo }         from './Vue/gameInfo';
    import { gameDangerChoice } from './Vue/gameDangerChoice';
    import { gameFight }        from './Vue/gameFight';
    import { gameOver }         from './Vue/gameOver';
    import { gameSaveManager } from './Vue/gameSaveManager';
    import { sortThreeCards } from './Vue/components/sortThreeCards';
// Main

let app = new Vue({
    el: '#app',
    data: () => {
        return {
            gamesavemanager : gsm,
            initialgame : gsm.game,
            testingHistory : true,
        }
    },
    computed: {
        gsm : function() { return this.gamesavemanager }, 
        game : function() { return this.gsm.game }, 
    },
    components:{
        gameInfo,
        gameDangerChoice,
        gameFight,
        gameOver,
        gameSaveManager
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
        },
        endFightLost(arrOfCardsToDelete:Array<PlayableCard>){
            this.game.endFightLost(arrOfCardsToDelete);
        },
        useMyPower(card:FightCard){
            this.game.usePower(card)
        },
        useTwoStepPower(data:{ usedCard:FightCard, assignedCards: Array<PlayableCard>}){
            this.game.usePower(data.usedCard, data.assignedCards)
        },
        save(){
            this.gsm.save();
        },
        load(slotName:null|string){
            this.gsm.load(slotName)
        }
    }
})

