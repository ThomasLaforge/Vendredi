// Jquery et bootstrap
// var bootstrap = require('bootstrap/dist/js/bootstrap');

// ES6 modules Style
import { Game 	}         from	'./modules/Game';
import { Player }         from	'./modules/Player';
import { UserInterface }  from	'./modules/UserInterface';

let pseudo   = 'Thomas';
let myPlayer = new Player(pseudo);
let game     = new Game(myPlayer, 1);
// let UI       = new UserInterface(game);

// Watchers

// watch(game, () => { 
//   if ( game.isGameOver() ){
//       console.log('The game is over !');
//       UI.showGameOver();
//       $('body').unbind();
//   }
//   else {
//       UI.updateMainInfos();
//   }
// });

// watch(game, "_fight", () => {
//   if(game.fight){
//     UI.updateFightZone();
//   }
// });

// Interface
// $('a[data-toggle="popover"]').popover({
//     animated: 'fade',
//     placement: 'bottom',
//     html: true
// });

let dangerCard = {
    template: '#danger-card',
    props : ['danger', 'class']
}

let pirateCard = {
    template: '#pirate-card',
    props : ['pirate']
}

let gameInfo = {
    props : ['game'],
    template : '#zone-info',
    methods : {
        loseOnePV : function() {
            this.game.player.losePV(1)
        }
    },
    computed: {
        nbFightCardsInDeck: () => {
            return game.fightDeck.length()
        },
        nbDangerCardsInDeck: () => {
            return game.dangerDeck.length()
        },
        nbAgingCardsInDeck: () => {
            return game.agingDeck.length()
        },
        level: () => {
            return game.level
        },
        PV : () => {
            return game.player.PV
        }
    },
    components : {
        pirateCard
    }
};

let gameDangerChoice = {
    props : ['dangerChoice'],
    template : '#game-danger-choice',
    components:{
        dangerCard
    },
    data : function() {
        return {
            selectedDanger : 0
        }
    }
};

let gameFight = {
    props : ['game'],
    template : '#game-fight',
}

var app = new Vue({
    el: '#app',
    data: {
        game : game,
        dangerChoice : game.dangerChoiceCards
    },
    components:{
        gameInfo,
        gameDangerChoice,
        gameFight
    },
    methods: {
    }
})