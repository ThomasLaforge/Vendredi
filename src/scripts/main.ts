// Jquery et bootstrap
// var bootstrap = require('bootstrap/dist/js/bootstrap');

// ES6 modules Style
import { Game 	}         from	'./modules/Game';
import { Player }         from	'./modules/Player';
import { UserInterface }  from	'./modules/UserInterface';
import { DangerFight }  from	'./modules/DangerFight';

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
    props : ['danger', 'selected'],
    methods: {
        select(){
            this.$emit('select', this.index);
        }
    }
}

let pirateCard = {
    template: '#pirate-card',
    props : ['pirate']
}

let playableCard = {
    template : '#playable-card',
    props : ['card']
}

let gameInfo = {
    props : ['game'],
    template : '#zone-info',
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
            currentSelected : 0
        }
    },
    methods:{
        changeSelectedIndex(index){
            this.currentSelected = index;
        },
        chose(){
            this.$emit('chose', this.currentSelected);
        }
    }
};

let gameFight = {
    props : ['fight'],
    template : '#game-fight',
    components : {
        dangerCard
    },
    data : function(){
        console.log(this.fight);
        return {
            cardToFight : this.fight.cardToFight,
            result : this.fight.result(),
            fightCardPlayed : this.fight.arrayFightCard
        }
    }
}

var app = new Vue({
    el: '#app',
    data: () => {
        return {
            game : game,
            dangerChoice : game.dangerChoiceCards
        }
    },
    components:{
        gameInfo,
        gameDangerChoice,
        gameFight
    },
    methods: {
        startFight(index){
            game.startFight(game.dangerChoiceCards[index]);
        }
    }
})