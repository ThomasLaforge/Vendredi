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

Vue.component('gameInfo', {
    props : ['game'],
    template : `
    <div class="game-info">
        <div class="info-main ">
            <div class='info-main-pv info-main-elt' id="pv ">
                <div class='info-main-value'>{{ PV }}</div>
                <!--<button @click="loseOnePV ">LosePV</button>-->
            </div>
            <div class='info-main-fight-cards info-main-elt'>
                <div id="nbFightCards " class='info-main-value'>{{ nbFightCardsInDeck }}</div>
                <div class='info-main-subject'>Fight cards</div>
            </div>
            <div class='info-main-danger-cards info-main-elt'>
                <div id="nbDangerCards " class='info-main-value'>{{ nbDangerCardsInDeck }}</div>
                <div class='info-main-subject'>Danger cards</div>
            </div>
            <div class='info-main-aging-cards info-main-elt'>
                <div id="nbAgingCards " class='info-main-value'>{{ nbAgingCardsInDeck }}</div>
                <div class='info-main-subject'>Aging cards</div>
            </div>
            <div class='info-main-level info-main-elt'>
                <div id="level " class='info-main-value'>{{ level }}</div>
                <div class='info-main-subject'>Level</div>
            </div>
        </div>
    </div>
    `,
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
    }
});

var app = new Vue({
    el: '#app',
    data: {
        game : game
    },
    methods: {
    }
})